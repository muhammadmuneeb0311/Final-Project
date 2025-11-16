import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../store";
import axios from "axios";
import ResultBoard from "../ResultBoard";



const EvaluatorDashboard = () => {
  const { token } = useAuth();
  const [assignedSubmissions, setAssignedSubmissions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 detect when coming back from score page

  // ✅ Setup axios with token
  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: "http://localhost:5000/api",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      }),
    [token]
  );

  // ✅ Fetch assigned submissions
  const fetchAssignedSubmissions = async () => {
    try {
      const res = await axiosInstance.get("/evaluators/assigned");
      setAssignedSubmissions(res.data || []);
    } catch (err) {
      console.error("Error fetching assigned submissions:", err);
    }
  };

  // ✅ Refresh data on mount or after navigating back from score page
  useEffect(() => {
    fetchAssignedSubmissions();
  }, [axiosInstance, location.pathname]);

  // ✅ Handle Evaluate
  const handleEvaluate = (teamId) => {
    navigate(`/score-submission/${teamId}`);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
<aside className="bg-dark text-white vh-100 p-3" style={{ width: "220px", overflowY: "auto" }}>
  <h5 className="text-uppercase">📂 Menu</h5>
  <ul className="nav flex-column mb-4">
    <li className="nav-item">
      <Link className="nav-link text-white" to="/dashboard">📊 Dashboard Overview</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" to="/assigned-teams">👥 Assigned Teams</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" to="/evaluate">📝 Evaluate Submissions</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" to="/progress">📈 Progress Report</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-white" to="/chat">💬 Chat/Support</Link>
    </li>
    <li className="nav-item">
  <Link className="nav-link text-white" to="/admin/results">🏆 Result Board</Link>
</li>

  </ul>



</aside>


      {/* Main Content */}
  <main className="flex-grow-1 p-4">
  <h2>Evaluator Dashboard</h2>

  {/* Assigned Submissions */}
  {assignedSubmissions.length === 0 ? (
    <p>No submissions assigned yet.</p>
  ) : (
    assignedSubmissions.map((assignment) => {
      const status = assignment.submissionId?.status;
      const isEvaluated = status === "evaluated";
      const hasSubmitted = assignment.hasSubmitted === true;

      return (
        <div key={assignment._id} className="card mb-3 p-3 shadow-sm">
          <h5>Team: {assignment.submissionId?.teamId?.teamName || "N/A"}</h5>
          <p><strong>Topic:</strong> {assignment.submissionId?.topic || "N/A"}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge text-uppercase ${
                status === "submitted"
                  ? "bg-info text-dark"
                  : status === "under_evaluation"
                  ? "bg-warning text-dark"
                  : isEvaluated
                  ? "bg-success"
                  : "bg-secondary"
              }`}
            >
              {status?.replace(/_/g, " ") || "N/A"}
            </span>
          </p>
          <p><strong>Assigned Date:</strong> {new Date(assignment.assignedDate).toLocaleString()}</p>
          <p>
            <strong>Video Link:</strong>{" "}
            {assignment.submissionId?.videoLink ? (
              <a
                href={assignment.submissionId.videoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Video
              </a>
            ) : (
              "N/A"
            )}
          </p>
          <button
            className={`btn ${isEvaluated || hasSubmitted ? "btn-success" : "btn-primary"}`}
            disabled={isEvaluated || hasSubmitted}
            onClick={() => handleEvaluate(assignment.submissionId?.teamId?._id)}
          >
            {isEvaluated ? "Evaluated ✅" : hasSubmitted ? "Submitted ✅" : "Evaluate"}
          </button>
        </div>
      );
    })
  )}

</main>

    </div>
  );
};

export default EvaluatorDashboard;
