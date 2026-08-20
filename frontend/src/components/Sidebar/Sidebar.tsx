import React from 'react';
import logo from '@/assets/logo.png'; // ваш логотип
import bg from '@/assets/pic.jpg';

const Sidebar: React.FC = () => {
  return (
    <div className="pic" style={{backgroundImage: 'url(${bg})', backgroundSize: 'cover'}}>
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