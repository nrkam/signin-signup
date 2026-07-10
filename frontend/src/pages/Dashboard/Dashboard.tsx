import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/authSlice';

const Dashboard: React.FC = () => {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  return (
    <div style={{ padding: '100px', color: '#fff', background: '#0d0d0d', borderRadius: '12px'}}>
      <h1>Welcome, {user?.firstName} {user?.lastName}!</h1>
      <p>Email: {user?.email}</p>
      <button onClick={() => dispatch(logout())} style={{ marginTop: 20, padding: '10px 20px', borderRadius: '12px', border: 'none' , background: '#377b70', boxShadow: '0 10px 20px rgba(99, 255, 213, 0.3)'}}>Logout</button>
    </div>
  );
};

export default Dashboard;