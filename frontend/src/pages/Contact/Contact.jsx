import React from 'react';
import './Contact.css';
import { assets } from '../../assets/assets';

const Contact = () => {
  return (
    <div className="contact-page">
      <h2 className="contact-heading">
        <span className="line" /> Contact Us <span className="line" />
      </h2>

      <div className="contact-content">
        <img className="contact-logo" src={assets.logo} alt="My Kai Manam Logo" />

        <div className="contact-info">
          <p><strong>📞 Phone:</strong> +91-9790921516</p>
          <p><strong>📧 Email:</strong> mykaimanam@gmail.com</p>
          <p><strong>📍 Address:</strong> Chennai, India</p>
        </div>

        <div className="contact-socials">
          <a href="https://www.instagram.com/mykaimanam?igsh=djIzOHh3a3lrbGgz&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <img src={assets.instagram_icon} alt="Instagram" />
          </a>
          {/* <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
            <img src={assets.facebook} alt="Facebook" />
          </a> */}
          <a href="https://wa.me/919790921516" target="_blank" rel="noopener noreferrer">
            <img src={assets.whatsapp_icon} alt="WhatsApp" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
