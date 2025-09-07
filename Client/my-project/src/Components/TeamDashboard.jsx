// src/Components/TeamDashboard.jsx
import { Link } from "react-router-dom";
import DashboardCard from "./DashboardCard";

const TeamDashboard = ({ data }) => {
  return (
    <div className="container-fluid mt-3">
      <h2>Team Dashboard</h2>

      {/* Summary Cards */}
      <div className="row">
        <DashboardCard
          title="Submission Uploaded"
          value="1"
          icon="fa-upload"
          color="info"
          link="/upload"
        />
        <DashboardCard
          title="Score Achieved"
          value="85%"
          icon="fa-star"
          color="success"
          link="/scores"
        />
        <DashboardCard
          title="Leaderboard Rank"
          value="#5"
          icon="fa-trophy"
          color="warning"
          link="/leaderboard"
        />
      </div>

      {/* 🔥 Submission Preview */}
      <div className="card mt-4">
        <div className="card-header bg-info text-white">📂 Your Submissions</div>
        <div className="card-body">
          <p><strong>Last Submission:</strong> Team Pitch Video.mp4</p>
          <p><strong>Status:</strong> ✅ Submitted & Under Review</p>
          <Link to="/upload" className="btn btn-sm btn-primary">View / Upload Again</Link>
        </div>
      </div>

      {/* 🔥 Scores Preview */}
      <div className="card mt-4">
        <div className="card-header bg-success text-white">⭐ Your Scores</div>
        <div className="card-body">
          <p><strong>Total Score:</strong> 85%</p>
          <p><strong>Evaluator Feedback:</strong> "Great work! Improve clarity in final section."</p>
          <Link to="/scores" className="btn btn-sm btn-success">View Detailed Scores</Link>
        </div>
      </div>

      {/* 🔥 Leaderboard Preview */}
      <div className="card mt-4">
        <div className="card-header bg-warning">🏆 Leaderboard</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.leaderboard.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.team}</td>
                  <td>{row.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/leaderboard" className="btn btn-sm btn-warning">View Full Leaderboard</Link>
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
