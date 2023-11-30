import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Common.css';
import logo from '../../assets/images/logo-colorful.png'; // Adjust the path if necessary

const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Gambler.Tools Logo" />
        </Link>
      </div>
      <button className="nav-toggle" onClick={() => setIsNavVisible(!isNavVisible)}>
        ☰
      </button>
      <nav className={isNavVisible ? 'visible' : ''}>
        <ul>
        <li><Link to="/">Home</Link></li>
          <li><Link to="/sports">Sports</Link></li>
          <li><Link to="/poker">Poker</Link></li>
          <li><Link to="/racing">Racing</Link></li>
          <li><Link to="/casino">Casino</Link></li>
        </ul>
      </nav>
    </header >
  );
};

export default Header;
