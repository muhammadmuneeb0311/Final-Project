import { Link } from "react-router-dom";

const DashboardCard = ({ title, value, icon, color, link }) => {
  return (
    <div className="col-lg-3 col-6 mb-3">
      <div className={`small-box bg-${color}`}>
        <div className="inner">
          <h3>{value}</h3>
          <p>{title}</p>
        </div>
        <div className="icon">
          <i className={`fas ${icon}`} style={{ fontSize: "40px", opacity: 0.7 }}></i>
        </div>
        <Link to={link} className="small-box-footer">
          More info <i className="fas fa-arrow-circle-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default DashboardCard;
