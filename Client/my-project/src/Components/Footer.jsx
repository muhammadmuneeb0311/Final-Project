const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center p-3 mt-auto">
      <div>
        <strong>🚀 Automated Content Submission Evaluation</strong> | v1.0.0
      </div>
      <div>© {new Date().getFullYear()} Virtual University</div>
      <div>Contact: <a href="mailto:adnanasif@vu.edu.pk" className="text-white">adnanasif@vu.edu.pk</a></div>
      <div>
        <a href="/privacy-policy" className="text-white mx-2">Privacy Policy</a> |
        <a href="/help" className="text-white mx-2">Help</a>
      </div>
    </footer>
  );
};

export default Footer;
