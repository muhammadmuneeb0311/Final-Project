import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/api/auth/register";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "team",
    qualification: "",
    experience: "",
    specialization: "",
    teamName: "",
    members: [{ name: "", email: "" }],
  });

  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle member input change
  const handleMemberChange = (index, field, value) => {
    const newMembers = [...user.members];
    newMembers[index][field] = value;
    setUser((prev) => ({
      ...prev,
      members: newMembers,
    }));
  };

  // Add a new team member
  const addMember = () => {
    if (user.members.length < 5) {
      setUser((prev) => ({
        ...prev,
        members: [...prev.members, { name: "", email: "" }],
      }));
    } else {
      alert("Maximum 5 members allowed!");
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setFormErrors({});

    if (!user.email || !user.password) {
      setErrorMessage("Email and password are required");
      return;
    }

    // ✅ Build payload based on role (explicitly include only needed fields)
    let payload = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      role: user.role,
    };

    // Add team-specific fields
    if (user.role === "team") {
      payload.teamName = user.teamName;
      payload.members = user.members;
    }

    // Add evaluator-specific fields
    if (user.role === "evaluator") {
      payload.qualification = user.qualification;
      payload.specialization = user.specialization;
      payload.experience = user.experience;
    }

    console.log("📤 Sending payload:", payload);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch { }

      if (!response.ok) {
        if (data.errors) {
          if (Array.isArray(data.errors)) {
            if (typeof data.errors[0] === "string") {
              setErrorMessage(data.errors[0]);
            } else {
              const fieldErrors = {};
              data.errors.forEach((err) => {
                if (err.path && err.path.length > 0) {
                  fieldErrors[err.path[0]] = err.message;
                }
              });
              setFormErrors(fieldErrors);
            }
          }
        } else {
          // ✅ Prefer backend 'msg' key first (for custom messages)
          const backendMsg =
            data.msg ||
            data.message ||
            "❌ Registration failed. Please check your input.";

          // ✅ Display more user-friendly styled error message
          setErrorMessage(backendMsg);
        }

        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("❌ Registration error:", error);
      setErrorMessage("Server not responding. Try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Register</h3>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        {/* Role */}
        <select
          className="form-control mb-3"
          name="role"
          value={user.role}
          onChange={handleInput}
        >
          <option value="team">Team</option>
          <option value="evaluator">Evaluator</option>
        </select>

        {/* Name */}
        <input
          className={`form-control mb-1 ${formErrors.name ? "is-invalid" : ""}`}
          name="name"
          placeholder={
            user.role === "team" ? "Team Leader Name" : "Full Name"
          }
          value={user.name}
          onChange={handleInput}
          autoComplete="name"
          required
        />

        {/* Email */}
        <input
          className={`form-control mb-1 ${formErrors.email ? "is-invalid" : ""}`}
          name="email"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInput}
          autoComplete="email"
          required
        />

        {/* Phone */}
        <input
          className={`form-control mb-1 ${formErrors.phone ? "is-invalid" : ""}`}
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={user.phone}
          onChange={handleInput}
          autoComplete="tel"
          required
        />

        {/* Password */}
        <input
          className={`form-control mb-1 ${formErrors.password ? "is-invalid" : ""}`}
          name="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInput}
          autoComplete="new-password"
          required
        />

        {/* Team fields */}
        {user.role === "team" && (
          <>
            <input
              className={`form-control mb-1 ${formErrors.teamName ? "is-invalid" : ""}`}
              name="teamName"
              placeholder="Team Name"
              value={user.teamName}
              onChange={handleInput}
              required
            />
            <label className="form-label fw-bold">Team Members</label>
            {user.members.map((member, index) => (
              <div key={index} className="row mb-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Team Member ${index + 1} Name`}
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, "name", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder={`Team Member ${index + 1} Email`}
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, "email", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-primary mb-3"
              onClick={addMember}
              disabled={user.members.length >= 5}
            >
              + Add Member
            </button>
          </>
        )}

        {/* Evaluator fields */}
        {user.role === "evaluator" && (
          <>
            <input
              className={`form-control mb-1 ${formErrors.qualification ? "is-invalid" : ""}`}
              name="qualification"
              placeholder="Qualification"
              value={user.qualification}
              onChange={handleInput}
              required
            />
            <input
              className={`form-control mb-1 ${formErrors.specialization ? "is-invalid" : ""}`}
              name="specialization"
              placeholder="Specialization"
              value={user.specialization}
              onChange={handleInput}
              required
            />
            <textarea
              className={`form-control mb-1 ${formErrors.experience ? "is-invalid" : ""}`}
              name="experience"
              rows="2"
              placeholder="Experience Details"
              value={user.experience}
              onChange={handleInput}
              required
            />
          </>
        )}

        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;