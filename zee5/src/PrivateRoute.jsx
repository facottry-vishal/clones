import React from 'react';
import { Route, Navigate} from 'react-router-dom';
import Auth from './auth'; // Import your authentication module

const PrivateRoute = ({ children }) => {
  const isAuthenticated = Auth.isAuthenticated(); 
  return isAuthenticated ? (
   <div>{children}</div>
  ) : (
    <Navigate to="/login" replace />
  );
  
};

export default PrivateRoute;


