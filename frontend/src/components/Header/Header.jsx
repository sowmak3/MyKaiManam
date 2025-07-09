import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/products'); // 👈 This redirects to the products page
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Welcome to My Kai Manam!</h2>
        <p>Experience the taste of tradition, freshly made with love</p>
        <button onClick={handleExplore}>Explore our Menu</button>
      </div>
    </div>
  );
};

export default Header;
