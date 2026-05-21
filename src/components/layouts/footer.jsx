import React from "react";
import "./footer.scss";
import { Link } from "react-router";

const Footer = ({ client = false }) => {
  return (
    <div className={`footer ${client ? "client-footer" : ""}`}>
      {client ? null : (
        <div className="links-wrapper">
          <Link>Terms</Link>
          <Link>Privacy</Link>
        </div>
      )}
      <p>© 2026 Handoffly . All rights reserved </p>
    </div>
  );
};

export default Footer;
