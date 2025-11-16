import { useAuth } from "./store";
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
    <nav className="navbar navbar-expand-lg navbar-custom px-3">
      {/* Brand */}
      <Link className="navbar-brand fw-bold brand-gradient" to="/">
        <i className="bi bi-lightning-fill me-2" aria-hidden></i> MyApp
      </Link>

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
            className="form-control form-control-sm"
            type="search"
            placeholder="Search teams, evaluators..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "220px" }}
          />
        </form>

        {/* Auth Buttons */}
        <ul className="navbar-nav ms-auto">
          {!token ? (
            <>
              <li className="nav-item me-2">
                <Link to="/register" className="btn btn-outline-secondary btn-sm">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="btn btn-accent btn-sm">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-secondary nav-link dropdown-toggle"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                👤 {role}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="profileDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/change-password">
                    Change Password
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
