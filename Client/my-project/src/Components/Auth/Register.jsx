import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/api/auth/register"; // backend register endpoint

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "team", // ✅ default role = team
    qualification: "",
    experience: "",
    teamName: "",
    members: [{ name: "", email: "" }],
  });

  // ✅ handle input change for common fields
  const handleInput = (e) => {
    let { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ handle member change
  const handleMemberChange = (index, field, value) => {
    const newMembers = [...user.members];
    newMembers[index][field] = value;
    setUser((prev) => ({
      ...prev,
      members: newMembers,
    }));
  };

  // ✅ add new member
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

 const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage(""); // Clear old errors

  let payload = { ...user };

  // Clean payload based on role
  if (user.role !== "team") {
    delete payload.members;
    delete payload.teamName;
  }
  if (user.role !== "evaluator") {
    delete payload.qualification;
    delete payload.experience;
  }

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Registration successful:", data);
      navigate("/login");
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Registration failed");
    }
  } catch (error) {
    setErrorMessage("Something went wrong. Please try again.");
  }
};


  return (
    <div className="container mt-5">
      <h3 className="mb-4">Register</h3>
      <form onSubmit={handleSubmit}>
        {/* Common Fields */}
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Full Name"
          onChange={handleInput}
          autoComplete="name"
          required
        />
        <input
          className="form-control mb-2"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleInput}
          autoComplete="email"
          required
        />
        <input
          className="form-control mb-2"
          name="phone"
          type="tel"
          placeholder="Phone Number"
          onChange={handleInput}
          autoComplete="tel"
          required
        />
        <input
          className="form-control mb-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInput}
          autoComplete="new-password"
          required
        />

        {/* Role Selection */}
        <select
          className="form-control mb-3"
          name="role"
          value={user.role}
          onChange={handleInput}
        >
          <option value="team">Team</option> {/* ✅ fixed */}
          <option value="evaluator">Evaluator</option>
          
        </select>

        {/* Conditional Fields */}
        {user.role === "team" && (
          <>
            <input
              className="form-control mb-2"
              name="teamName"
              placeholder="Team Name"
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

        {user.role === "evaluator" && (
          <>
            <input
              className="form-control mb-2"
              name="qualification"
              placeholder="Qualification"
              value={user.qualification}
              onChange={handleInput}
              required
            />
            <textarea
              className="form-control mb-2"
              name="experience"
              rows="2"
              placeholder="Experience Details"
              value={user.experience}
              onChange={handleInput}
              required
            />
          </>
        )}

        {/* Submit */}
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;  // ✅ required export
