import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    getTotalCartItems,
    token,
    setToken,
    setShowLoginPopup,   // ✅ use context, not a prop
  } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  const currentPath = location.pathname;

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <li className={currentPath === '/' ? 'active' : ''}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className={currentPath === '/products' ? 'active' : ''}>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        </li>
        <li className={currentPath === '/about' ? 'active' : ''}>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About us</Link>
        </li>
        <li className={currentPath === '/contact' ? 'active' : ''}>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.newcarticon} alt="cart" /></Link>
          {getTotalCartItems() > 0 && <div className="dot" />}
        </div>

        {!token ? (
          <button onClick={() => setShowLoginPopup(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.newprofileicon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.newbagicon} alt="" /><p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.newlogouticon} alt="" /><p>Logout</p>
              </li>
            </ul>
          </div>
        )}

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
    </div>
  );
};

export default Navbar;
