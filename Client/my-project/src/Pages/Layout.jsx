// src/components/Layout.jsx
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Layout = ({ role, children }) => {
  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <div style={{ flexShrink: 0 }}>
        <Header role={role} />
      </div>

      {/* Main Section */}
      <main
        className="flex-grow-1 "
        style={{ backgroundColor: "#f4f6f9", overflowY: "auto" }}
      >
        {children}
      </main>

      {/* Footer */}
      <div style={{ flexShrink: 0 }}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
