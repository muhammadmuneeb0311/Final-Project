import React, { useState, useEffect } from "react";
import { useAuth } from "./store";



const ResultBoard = () => {
  const { token, userRole } = useAuth(); // <-- get user role
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const fetchResults = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/admin/result/published", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setResults(data.results);
        else setResults([]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching results:", err);
        setResults([]);
        setLoading(false);
      });
  };

  const publishResults = () => {
    setPublishing(true);
    fetch("http://localhost:5000/api/admin/result/publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Results published:", data);
        fetchResults();
        setPublishing(false);
      })
      .catch((err) => {
        console.error("Error publishing results:", err);
        setPublishing(false);
      });
  };

  useEffect(() => { fetchResults(); }, [token]);

  if (loading) return <div>Loading results...</div>;

  return (
    <div className="container mt-4">
      <h2>Published Results</h2>

      {/* Only show button if admin */}
      {userRole === "admin" && (
        <button
          className="btn btn-primary mb-3"
          onClick={publishResults}
          disabled={publishing}
        >
          {publishing ? "Publishing..." : "Publish Results"}
        </button>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Average Score</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results
              .sort((a, b) => b.averageScore - a.averageScore)
              .map((result, index) => (
                <tr key={result._id || index}>
                  <td>{index + 1}</td>
                  <td>{result.teamId?.teamName || "N/A"}</td>
                  <td>{result.averageScore.toFixed(2)}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="3">No results available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultBoard;