import { useAuth } from "./store";
import { Link } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const { token, removeToken } = useAuth();
  const decoded = token ? jwtDecode(token) : {};
  const role = decoded.role || "Guest";
  const userName = decoded.name || "User";

  const [search, setSearch] = useState("");

  const handleLogout = () => {
    removeToken();
  };

  // Role-based styling configuration
  const roleConfig = {
    admin: {
      badge: "bg-danger",
      icon: "bi bi-shield-check",
      gradient: "bg-gradient-danger"
    },
    evaluator: {
      badge: "bg-success", 
      icon: "bi bi-person-check",
      gradient: "bg-gradient-success"
    },
    team: {
      badge: "bg-warning",
      icon: "bi bi-person-badge",
      gradient: "bg-gradient-warning"
    },
    teammember: {
      badge: "bg-info",
      icon: "bi bi-person",
      gradient: "bg-gradient-info"
    },
    Guest: {
      badge: "bg-secondary",
      icon: "bi bi-person",
      gradient: "bg-gradient-secondary"
    }
  };

  const currentRole = roleConfig[role] || roleConfig.Guest;

  return (
    <>
      {/* Bootstrap Icons CDN */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" 
        rel="stylesheet" 
      />

      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient-primary shadow-sm py-2">
        <div className="container-fluid">
          
          {/* Brand Logo */}
          <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
            <div className="bg-white rounded-circle p-2 me-2 shadow">
              <i className="bi bi-trophy-fill text-primary fs-5"></i>
            </div>
            <span className="brand-text">
              Content<span className="fw-light">Eval</span>
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler border-0"
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
            
            {/* Search Bar - Only show when logged in */}
            {token && (
              <form className="d-flex align-items-center ms-3 me-auto" role="search">
                <div className="input-group input-group-sm" style={{ width: "280px" }}>
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search text-muted"></i>
                  </span>
                  <input
                    className="form-control border-start-0"
                    type="search"
                    placeholder="Search teams, submissions, evaluators..."
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </form>
            )}

            {/* Navigation Links - Only show when logged in */}
        {/* Navigation Links - Only show when logged in */}
{token && (
  <ul className="navbar-nav me-3">
    <li className="nav-item">
      <Link to="/dashboard" className="nav-link d-flex align-items-center">
        <i className="bi bi-speedometer2 me-1"></i>
        <span>Dashboard</span>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/leaderboard" className="nav-link d-flex align-items-center">
        <i className="bi bi-trophy me-1"></i>
        <span>Leaderboard</span>
      </Link>
    </li>
    
    {/* Support link only for admin, team, team member */}
    {["admin", "team", "teammember"].includes(role) && (
      <li className="nav-item">
        <Link to="/support" className="nav-link d-flex align-items-center">
          <i className="bi bi-chat-dots me-1"></i>
          <span>Support</span>
        </Link>
      </li>
    )}
  </ul>
)}


            {/* Auth Section */}
            <ul className="navbar-nav ms-auto">
              {!token ? (
                // Guest State
                <div className="d-flex align-items-center gap-2">
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-outline-light btn-sm">
                      <i className="bi bi-person-plus me-1"></i>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="btn btn-light text-primary btn-sm fw-semibold">
                      <i className="bi bi-box-arrow-in-right me-1"></i>
                      Login
                    </Link>
                  </li>
                </div>
              ) : (
                // Logged-in User State
                <div className="d-flex align-items-center gap-3">
                  
                  {/* User Info Badge */}
                  <div className="d-none d-md-flex align-items-center bg-white bg-opacity-10 rounded-pill px-3 py-1">
                    <i className={`${currentRole.icon} me-2 text-white`}></i>
                    <span className="text-white fw-semibold small me-2">{userName}</span>
                    <span className={`badge ${currentRole.badge} rounded-pill`}>
                      {role}
                    </span>
                  </div>

                  {/* Notifications */}
                  <div className="dropdown">
                    <button 
                      className="btn btn-link text-white position-relative p-1" 
                      type="button" 
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-bell fs-5"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        3
                      </span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end shadow">
                      <li><h6 className="dropdown-header">Notifications</h6></li>
                      <li><a className="dropdown-item small" href="#">New evaluation received</a></li>
                      <li><a className="dropdown-item small" href="#">Team submission updated</a></li>
                      <li><a className="dropdown-item small" href="#">Deadline reminder</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item small text-center" href="#">View all</a></li>
                    </ul>
                  </div>

                  {/* User Profile Dropdown */}
                  <div className="dropdown">
                    <button
                      className="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-0"
                      style={{ width: '40px', height: '40px' }}
                      id="profileDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-fill text-primary"></i>
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end shadow border-0"
                      aria-labelledby="profileDropdown"
                    >
                      <li>
                        <div className="dropdown-header">
                          <div className="d-flex align-items-center">
                            <div className={`rounded-circle d-flex align-items-center justify-content-center me-2 ${currentRole.gradient}`}
                                 style={{ width: '32px', height: '32px' }}>
                              <i className="bi bi-person text-white"></i>
                            </div>
                            <div>
                              <div className="fw-bold">{userName}</div>
                              <small className="text-muted">{role}</small>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <Link className="dropdown-item d-flex align-items-center" to="/profile">
                          <i className="bi bi-person-gear me-2"></i>
                          Profile Settings
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item d-flex align-items-center" to="/change-password">
                          <i className="bi bi-shield-lock me-2"></i>
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item d-flex align-items-center" to="/settings">
                          <i className="bi bi-gear me-2"></i>
                          Preferences
                        </Link>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button
                          className="dropdown-item d-flex align-items-center text-danger"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        }
        .bg-gradient-danger {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
        }
        .bg-gradient-success {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%) !important;
        }
        .bg-gradient-warning {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%) !important;
        }
        .bg-gradient-info {
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%) !important;
        }
        .bg-gradient-secondary {
          background: linear-gradient(135deg, #b8c6db 0%, #f5f7fa 100%) !important;
        }
        .brand-text {
          background: linear-gradient(45deg, #fff, #e3f2fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .navbar-nav .nav-link {
          transition: all 0.2s ease-in-out;
          border-radius: 0.375rem;
          margin: 0 0.25rem;
        }
        .navbar-nav .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .dropdown-menu {
          border: 1px solid rgba(0,0,0,0.1);
          min-width: 250px;
        }
      `}</style>
    </>
  );
};

export default Header;