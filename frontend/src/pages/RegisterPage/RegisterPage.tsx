import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import RegisterForm from './RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="body_container">
      <Sidebar />
      <div className="regist">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;