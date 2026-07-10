import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="body_container">
      <Sidebar />
      <div className="regist">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;