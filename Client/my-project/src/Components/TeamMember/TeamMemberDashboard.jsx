import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store";
import axios from "axios";

const TeamMemberDashboard = () => {
  const { token, teamId: contextTeamId } = useAuth();
  const [teamName, setTeamName] = useState("");

  const decodedTeamId = useMemo(() => contextTeamId || localStorage.getItem("teamId") || "", [contextTeamId]);

  const axiosInstance = useMemo(() => 
    axios.create({
      baseURL: "http://localhost:5000/api",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    }), [token]
  );

  useEffect(() => {
    const fetchTeamName = async () => {
      if (!token || !decodedTeamId) return;
      try {
        const res = await axiosInstance.get(`/teams/by-member/${decodedTeamId}`);
        setTeamName(res.data.name || "Unknown Team");
      } catch {
        setTeamName("N/A");
      }
    };
    fetchTeamName();
  }, [token, decodedTeamId, axiosInstance]);

  return (
    <div className="d-flex">
      {/* Team Member Sidebar */}
      <aside className="bg-dark text-white vh-100 p-3" style={{ width: "220px" }}>
        <h5 className="text-uppercase">📂 Menu</h5>
        <ul className="nav flex-column">
          <li className="nav-item"><Link className="nav-link text-white" to="/member/dashboard">📊 Dashboard Overview</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/member/team-info">👥 Team Information</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/upload">📂 Make Submission </Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/member/evaluation">🧮 Evaluation & Feedback</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/member/progress">📈 Progress Tracker</Link></li>
      
          <li className="nav-item"><Link className="nav-link text-white" to="/support">💬 Chat / Support</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/member/announcements">🔔 Announcements</Link></li>
          <li className="nav-item"><Link className="nav-link text-white" to="/admin/results">📜 Results</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <h2 className="mb-4">Team Member Dashboard</h2>
        <div className="card mb-4">
          <div className="card-header bg-primary text-white fw-bold">My Team Information</div>
          <div className="card-body">
            <p><strong>Team Name:</strong> {teamName || "Loading..."}</p>
            <p><strong>Team ID:</strong> {decodedTeamId || "N/A"}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamMemberDashboard;
