import { useAuth } from "./Auth/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const { token, removeToken } = useAuth();
  const decoded = token ? jwtDecode(token) : {};
  const role = decoded.role || "Guest";

  const [search, setSearch] = useState("");

  const handleLogout = () => {
    removeToken();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
  
      {/* Mobile Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Content */}
      <div className="collapse navbar-collapse" id="navbarContent">
        {/* Search Bar */}
        <form className="d-flex ms-auto me-3" role="search">
          <input
            className="form-control"
            type="search"
            placeholder="Search teams, evaluators..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "250px" }}
          />
        </form>

        {/* Notifications */}
        <ul className="navbar-nav me-3">
          <li className="nav-item dropdown">
            <button
              className="btn btn-dark nav-link dropdown-toggle"
              id="notifDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-bell"></i>
              <span className="badge bg-danger ms-1">3</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notifDropdown">
              <li><span className="dropdown-item">🔔 New submission from Team Alpha</span></li>
              <li><span className="dropdown-item">✅ Evaluator John approved</span></li>
              <li><span className="dropdown-item">📢 Deadline reminder</span></li>
            </ul>
          </li>
        </ul>

        {/* Messages */}
        <ul className="navbar-nav me-3">
          <li className="nav-item dropdown">
            <button
              className="btn btn-dark nav-link dropdown-toggle"
              id="msgDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-envelope"></i>
              <span className="badge bg-success ms-1">5</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="msgDropdown">
              <li><span className="dropdown-item">💬 Message from Team Bravo</span></li>
              <li><span className="dropdown-item">💬 Support inquiry pending</span></li>
              <li><span className="dropdown-item">💬 Message from Admin</span></li>
            </ul>
          </li>
        </ul>

        {/* Profile Dropdown */}
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <button
              className="btn btn-dark nav-link dropdown-toggle"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              👤 {role}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><Link className="dropdown-item" to="/profile">Profile Settings</Link></li>
              <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
