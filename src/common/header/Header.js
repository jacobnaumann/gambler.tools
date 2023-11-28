import React from 'react';
import { Link } from 'react-router-dom';
import '../Common.css';
import logo from '../../assets/images/logo-colorful.png'; // Adjust the path if necessary

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        {/* Updated the path to the logo */}
        <Link to="/">
          <img src={logo} alt="Gambler.Tools Logo" />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/sports">Sports</Link>
        <Link to="/poker">Poker</Link>
        <Link to="/racing">Racing</Link>
        <Link to="/casino">Casino</Link>
        <Link to="/misc">Misc</Link>
      </nav>
    </header>
  );
};

export default Header;
