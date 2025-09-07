import { useState, useMemo } from "react";
import { useAuth } from "../Auth/store";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // ✅ Correct import
import axios from "axios";

const UploadSubmission = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  // Decode token once
  const decoded = useMemo(() => (token ? jwtDecode(token) : {}), [token]);
  const userId = decoded.id; // team user
  const teamId = userId; // for team, teamId = userId

  const [form, setForm] = useState({
    videoLink: "",
    topic: "",
    description: "",
    learningOutcomes: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:5000/api",
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(form.videoLink)) {
      setMessage("❌ Please enter a valid video link");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const payload = {
        title: form.topic,
        videoUrl: form.videoLink,
        description: form.description,
        learningOutcome: form.learningOutcomes,
        userId,
        teamId, // same as userId
      };

      await axiosInstance.post("/submissions/submit", payload);
      setMessage("✅ Submission uploaded successfully!");
      setForm({ videoLink: "", topic: "", description: "", learningOutcomes: "" });

      setTimeout(() => navigate("/my-submissions"), 1500);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Error: ${err.response?.data?.message || "Network error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Upload Video</h3>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        <input
          className="form-control mb-2"
          name="videoLink"
          placeholder="Video Link (YouTube/Other)"
          value={form.videoLink}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="topic"
          placeholder="Topic"
          value={form.topic}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-control mb-2"
          name="learningOutcomes"
          placeholder="Learning Outcomes"
          value={form.learningOutcomes}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {(form.videoLink.includes("youtube.com") || form.videoLink.includes("youtu.be")) && (
  <div className="mt-4 text-center">
    <h5>Video Preview</h5>
    <iframe
      width="100%"
      height="315"
      src={
        form.videoLink.includes("watch?v=")
          ? form.videoLink.replace("watch?v=", "embed/")
          : form.videoLink.includes("youtu.be/")
          ? form.videoLink.replace("youtu.be/", "www.youtube.com/embed/")
          : form.videoLink
      }
      title="Video Preview"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  </div>
)}

    </div>
  );
};

export default UploadSubmission;
