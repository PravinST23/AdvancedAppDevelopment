import React from "react";
import "/src/assets/css/footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-section-title">For Businesses</h3>
          <ul className="footer-links">
            <li><a href="#">Feature Overview</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Case Studies</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-section-title">Resources</h3>
          <ul className="footer-links">
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-section-title">Partners</h3>
          <ul className="footer-links">
            <li><a href="#">Become a Partner</a></li>
            <li><a href="#">Affiliate Program</a></li>
            <li><a href="#">Partner Resources</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-section-title">Contact Us</h3>
          <ul className="footer-links">
            <li>Email: contact@example.com</li>
            <li>Phone: +1234567890</li>
            <li>Address: 123 Main Street, City, Country</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 BEC Enquiry Management System. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;