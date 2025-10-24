import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>@ 2025 MovieApp. All rights reserved kodehodeandreas.</p>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/favorites">Favorites</a>
          <a href="/about">About</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
