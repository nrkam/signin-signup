import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png'; // ваш логотип

const Sidebar: React.FC = () => {
  return (
    <div className="pic">
      <div className="header">
        <img className="logo_icon" src={logo} alt="logo" />
        <span className="header_name">signup/signin</span>
      </div>
      <div className="motiv_quote">
        <p>Get Started</p>
        <p>with Us</p>
      </div>
      <footer className="footer">
        <div className="copyright_text">© Nurullina Kamila, 2026</div>
      </footer>
    </div>
  );
};

export default Sidebar;