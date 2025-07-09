import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section logo-section">
          <img src={assets.logo} alt="My Kai Manam Logo" className="footer-logo" />
          <p>Authentic homemade podis, pickles & mixes prepared with love and care.</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/mykaimanam?igsh=djIzOHh3a3lrbGgz&utm_source=qr" target="_blank" rel="noopener noreferrer">
              <img src={assets.instagram_icon} alt="Instagram" />
            </a>
            <a href="https://wa.me/919790921516" target="_blank" rel="noopener noreferrer">
              <img src={assets.whatsapp_icon} alt="WhatsApp" />
            </a>
            {/* <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook} alt="Facebook" />
            </a> */}
          </div>
        </div>

        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>📞 +91-9790921516</p>
          <p>✉️ mykaimanam@gmail.com</p>
          <p>📍 Chennai, India</p>
        </div>
      </div>

      <hr />
      <p className="footer-copy">Copyright © 2025 My Kai Manam. All rights reserved.</p>
    </div>
  );
};

export default Footer;
