import { Link } from "react-router-dom";
import { useAuth } from "../Components/Auth/store";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const { token } = useAuth();
  const decoded = token ? jwtDecode(token) : {};
  const role = decoded.role || "guest"; // role from token

  return (
    <aside className="main-sidebar bg-dark text-white vh-100">
      <div className="sidebar p-3">
        <h5 className="text-uppercase">📂 Menu</h5>
        <ul className="nav flex-column">

          {/* 🔹 Admin Sidebar */}
          {role === "admin" && (
            <>
              <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">📊 Dashboard Overview</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/teams">👥 Teams Management</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/evaluators">🧑‍🏫 Evaluator Management</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/submissions">📂 Submissions</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/evaluation">📝 Evaluation Management</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/leaderboard">🏆 Leaderboard</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/results">📜 Results</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/config">⚙️ System Configuration</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/chat">💬 Chat/Support</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/analytics">📈 Analytics & Reports</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/users">🔑 User Management</Link></li>
            </>
          )}

          {/* 🔹 Evaluator Sidebar */}
          {role === "evaluator" && (
            <>
              <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">📊 Dashboard Overview</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/assigned-teams">👥 Assigned Teams</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/evaluate">📝 Evaluate Submissions</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/progress">📈 Progress Report</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/chat">💬 Chat/Support</Link></li>
            </>
          )}

          {/* 🔹 Team Sidebar */}
          {role === "team" && (
            <>
              <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">📊 Dashboard Overview</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/upload">📂 Upload Submission</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/scores">⭐ My Scores</Link></li>
              {/* 🔄 Changed from /TeamDashboard → /dashboard */}
              <li className="nav-item"><Link className="nav-link text-white" to="/TeamDashboard">🏆 Leaderboard</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/chat">💬 Chat/Support</Link></li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
