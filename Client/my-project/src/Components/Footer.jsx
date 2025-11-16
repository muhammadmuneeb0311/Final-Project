const Footer = () => {
  return (
    <footer className="text-center p-3 mt-auto" style={{background: 'linear-gradient(90deg, rgba(13,110,253,0.05), rgba(111,66,193,0.03))'}}>
      <div className="app-container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-muted-small">
            <strong>🚀 Automated Content Submission Evaluation</strong> | v1.0.0
          </div>
          <div className="text-muted-small">© {new Date().getFullYear()} Virtual University</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
