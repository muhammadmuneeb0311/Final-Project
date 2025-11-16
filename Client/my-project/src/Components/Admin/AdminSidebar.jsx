// src/Components/Admin/Sidebar.jsx
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  // Sidebar menu items array for easier maintenance
  const items = [
    { to: "/dashboard", label: "📊 Dashboard Overview" },
    { to: "/teams", label: "� Teams Management" },
    { to: "/evaluators", label: "🧑‍🏫 Evaluator Management" },
    { to: "/submissions", label: "📂 Submissions" },
    { to: "/admin/evaluation-management", label: "📝 Evaluation Management" },
    { to: "/leaderboard", label: "🏆 Leaderboard" },
    { to: "/admin/results", label: "📜 Results" }, 
    { to: "/config", label: "⚙️ System Configuration" },
    { to: "/support", label: "💬 Chat/Support" },
    { to: "/analytics", label: "📈 Analytics & Reports" },
    { to: "/users", label: "🔑 User Management" },
    { to: "/admin/competition-settings", label: "🏆 Competition Settings" },
  ];

  return (
    <>
      {/* Mobile: offcanvas trigger */}
      <button
        className="btn btn-outline-secondary d-md-none mb-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#adminSidebarOffcanvas"
        aria-controls="adminSidebarOffcanvas"
      >
        ☰ Menu
      </button>

      {/* Desktop sidebar */}
      <aside className="admin-sidebar d-none d-md-block">
        <div className="sidebar-inner p-3">
          <h5 className="text-uppercase sidebar-title">� Menu</h5>
          <ul className="nav flex-column mt-3">
            {items.map((it) => (
              <li className="nav-item" key={it.to}>
                <Link className="nav-link" to={it.to}>
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Offcanvas for small screens */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="adminSidebarOffcanvas"
        aria-labelledby="adminSidebarOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="adminSidebarOffcanvasLabel">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {items.map((it) => (
              <li className="nav-item" key={it.to}>
                <Link className="nav-link" to={it.to} data-bs-dismiss="offcanvas">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
