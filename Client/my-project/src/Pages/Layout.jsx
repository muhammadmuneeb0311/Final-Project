// src/components/Layout.jsx
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';

const Layout = ({ role, children }) => {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <div style={{ flexShrink: 0 }}>
        <Header role={role} />
      </div>

      {/* Main Section */}
      <div className="d-flex flex-grow-1" style={{ minHeight: 0 }}>
        {/* Sidebar */}
        <div
          style={{
            width: "250px",
            backgroundColor: "#343a40",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          <Sidebar role={role} />
        </div>

        {/* ✅ Dynamic Content */}
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
