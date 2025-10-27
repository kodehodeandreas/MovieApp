import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";
import { Home, Star, Info } from "lucide-react"; // små ikoner fra lucide-react

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>@ 2025 MovieApp. All rights reserved kodehodeandreas.</p>
        <div className="footer-links">
          <Link to="/" className="footer-link">
            <Home size={16} style={{ marginRight: "0.25rem" }} />
            Home
          </Link>
          <Link to="/favorites" className="footer-link">
            <Star size={16} style={{ marginRight: "0.25rem" }} />
            Favorites
          </Link>
          <Link to="/about" className="footer-link">
            <Info size={16} style={{ marginRight: "0.25rem" }} />
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
