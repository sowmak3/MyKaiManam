import React from "react";
import "./AboutUs.css";
import logo from "../../assets/logo.png"; // ✅ Using correct logo path

const AboutUs = () => {
  return (
    <section className="mk-about">
      {/* HERO */}
      <div className="mk-hero">
        <div className="mk-hero__inner">
          {/* Removed top logo */}
          <h1 className="mk-hero__title">MyKaiManam</h1>
          <p className="mk-hero__subtitle">
            Handmade pickles, podis & mixes — from our kitchen in Chennai.
          </p>
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="mk-wrapper">
        <div className="mk-card mk-grid">
          {/* Left: Logo + Tags */}
          <div className="mk-imgCol">
            <div className="mk-imgCol__frame">
              <img src={logo} alt="MyKaiManam Logo" />
            </div>
            <ul className="mk-badges">
              <li>📍 Chennai, India</li>
            </ul>
          </div>

          {/* Right: Content */}
          <div className="mk-contentCol">
            <h2 className="mk-h2">About Us</h2>
            <p className="mk-text">
              Welcome to <strong>MyKaiManam</strong>! We’re a homegrown brand
              from <strong>Chennai</strong> bringing you authentic, handmade
              pickles, podis, and mixes prepared with love, care, and traditional
              recipes passed down through generations.
            </p>
            <p className="mk-text">
              Every jar is made using <em>fresh ingredients</em>, <em>zero
              preservatives</em>, and time-honoured recipes — just like our
              family has always done it. From our kitchen to your plate, we
              promise the <strong>taste of home</strong> in every bite. ❤️
            </p>

            {/* CTA Row — Only Contact Us */}
            <div className="mk-ctaRow">
              <a href="mailto:mykaimanam@gmail.com" className="mk-btn">
                Contact Us →
              </a>
            </div>

            <div className="mk-divider" />

            {/* Our Story & Promise */}
            <div className="mk-twoCol">
              <div>
                <h3 className="mk-h3">Our Story</h3>
                <p className="mk-text">
                  What started as family recipes for friends & neighbours grew
                  into MyKaiManam. Today, we proudly prepare larger quantities
                  while keeping the same quality and authentic taste intact.
                </p>
              </div>
              <div>
                <h3 className="mk-h3">Our Promise</h3>
                <ul className="mk-list">
                  <li>Clean ingredients • No artificial colours or flavours</li>
                  <li>Hygienic home-kitchen preparation</li>
                  <li>Delicious, homestyle taste in every jar</li>
                </ul>
              </div>
            </div>

            <p className="mk-note">
              Thank you for supporting our business — your love keeps us going! 🫶
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
