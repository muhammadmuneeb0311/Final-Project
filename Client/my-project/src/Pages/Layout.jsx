// src/components/Layout.jsx
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RoleBasedSidebar from '../Components/RoleBasedSidebar';

const Layout = ({ role, children }) => {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <div style={{ flexShrink: 0 }}>
        <Header role={role} />
      </div>

      {/* Main Section with Sidebar */}
      <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
        {/* Sidebar */}
        <RoleBasedSidebar role={role} />

        {/* Main content */}
        <main
          className="flex-grow-1 p-4"
          style={{ backgroundColor: "#f4f6f9", overflowY: "auto" }}
        >
          {children}
        </main>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0 }}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
