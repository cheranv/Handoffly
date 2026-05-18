import { Link } from "react-router";
import "./errorpage.scss";

export default function ErrorPage({ icon: Icon, title, content, top }) {
  return (
    <div className="error-page">
      {Icon && <Icon />}
      <div className="error-page-card" style={{ top: top }}>
        <div className="error-page-card-inner">
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
        <Link to="/">Back to homepage</Link>
      </div>
    </div>
  );
}
