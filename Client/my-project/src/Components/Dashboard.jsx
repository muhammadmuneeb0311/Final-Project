import { jwtDecode } from "jwt-decode";
import { useAuth } from "../Components/Auth/store";
import DashboardCard from "../Components/DashboardCard";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const { token } = useAuth();
  const decoded = token ? jwtDecode(token) : {};
  const role = decoded.role || "guest";

  // ===== States =====
  const [data, setData] = useState({
    totalTeams: 0,
    totalSubmissions: 0,
    evaluationsCompleted: 0,
    pendingApprovals: 0,
  });
  const [pendingUsers, setPendingUsers] = useState([]);
  const [latestSubmissions, setLatestSubmissions] = useState([]);
  const [teamData, setTeamData] = useState({
    totalVideos: 0,
    submissions: [],
    score: "85%",
    rank: "#5",
  });

  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  // ===== Admin dashboard data =====
  useEffect(() => {
    if (role === "admin") {
      const fetchAdminData = async () => {
        try {
          const status = await axiosInstance.get("/admin/dashboard/status");
          setData(status.data);

          const pending = await axiosInstance.get("/admin/pending");
          setPendingUsers(pending.data);

          const latest = await axiosInstance.get("/submissions/latest");
          setLatestSubmissions(latest.data);
        } catch (err) {
          console.error("Admin fetch error:", err.response?.data || err.message);
        }
      };
      fetchAdminData();
    }
  }, [role, axiosInstance]);

  // ===== Team dashboard data =====
  useEffect(() => {
    if (role === "team" && decoded?.id) {
      const fetchTeamData = async () => {
        try {
          const res = await axiosInstance.get(`/submissions/my-submissions/${decoded.id}`);
          setTeamData(res.data);
        } catch (err) {
          console.error("Team fetch error:", err.response?.data || err.message);
        }
      };
      fetchTeamData();
    }
  }, [role, decoded?.id, axiosInstance]);

  // ===== Approve user =====
  const approveUser = async (id) => {
    try {
      const res = await axiosInstance.put(`/admin/approve/${id}`);
      alert(res.data.msg);

      setPendingUsers((prev) => prev.filter((u) => u._id !== id));

      const status = await axiosInstance.get("/admin/dashboard/status");
      setData(status.data);
    } catch (err) {
      console.error("Approve error:", err.response?.data || err.message);
    }
  };

if (role === "admin") {
  return (
    <div className="container-fluid mt-3">
      <h2>Admin Dashboard</h2>

      {/* ===== Admin Cards ===== */}
      <div className="row mb-4">
        <DashboardCard
          title="Total Teams"
          value={data.totalTeams}
          icon="fa-users"
          color="info"
          link="/teams"
        />
        <DashboardCard
          title="Total Submissions"
          value={data.totalSubmissions}
          icon="fa-file-upload"
          color="success"
          link="/submissions"
        />
        <DashboardCard
          title="Evaluations Completed"
          value={data.evaluationsCompleted}
          icon="fa-check"
          color="primary"
          link="/analytics"
        />
        <DashboardCard
          title="Pending Approvals"
          value={data.pendingApprovals}
          icon="fa-hourglass-half"
          color="danger"
          link="/approvals"
        />
      </div>

      {/* ===== Pending Users Table ===== */}
      <div className="card mb-4">
        <div className="card-header bg-warning">🕒 Pending User Approvals</div>
        <div className="card-body">
          {pendingUsers.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingUsers.map((user, idx) => (
                  <tr key={user._id}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        style={{ marginLeft: "5px" }}
                        onClick={() => approveUser(user._id)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No pending users.</p>
          )}
        </div>
      </div>

      {/* ===== Latest Submissions Table ===== */}
      <div className="card mb-4">
        <div className="card-header bg-info">📹 Latest Team Submissions</div>
        <div className="card-body">
          {latestSubmissions.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Video Title</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {latestSubmissions.map((sub, idx) => (
                  <tr key={sub._id}>
                    <td>{idx + 1}</td>
                    <td>{sub.teamName}</td>
                    <td>{sub.title}</td>
                    <td>{sub.userName} ({sub.userEmail})</td>
                    <td>
                      <a
                        href={sub.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        Watch
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-muted">No submissions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}


  if (role === "evaluator") {
    return (
      <div className="container-fluid mt-3">
        <h2>Evaluator Dashboard</h2>
        {/* Evaluator cards */}
        <div className="row">
          <DashboardCard title="Assigned Teams" value="10" icon="fa-users-cog" color="info" link="/assigned-teams" />
          <DashboardCard title="Evaluations Completed" value="7" icon="fa-check" color="success" link="/evaluate" />
          <DashboardCard title="Pending Evaluations" value="3" icon="fa-hourglass-half" color="warning" link="/progress" />
        </div>
      </div>
    );
  }

  if (role === "team") {
    return (
      <div className="container-fluid mt-3">
        <h2>Team Dashboard</h2>
        <div className="row">
          <DashboardCard title="Videos Uploaded" value={teamData.totalVideos} icon="fa-upload" color="info" link="/upload" />
          <DashboardCard title="Score Achieved" value={teamData.score} icon="fa-star" color="success" link="/scores" />
          <DashboardCard title="Leaderboard Rank" value={teamData.rank} icon="fa-trophy" color="warning" link="/teamDashboard" />
        </div>
        <div className="card mt-4">
          <div className="card-header bg-info">📹 My Uploaded Videos</div>
          <div className="card-body">
            {teamData.submissions.length > 0 ? (
              <ul>
                {teamData.submissions.map((sub) => (
                  <li key={sub._id}>
                    {sub.title} — <a href={sub.videoUrl} target="_blank" rel="noreferrer">Watch</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No videos uploaded yet.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <h2>Welcome to the Evaluation System</h2>
      <p>Please log in to view your dashboard.</p>
    </div>
  );
};

export default Dashboard;
