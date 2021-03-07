import React, { createContext, useState, useContext } from 'react';
import Routes from '../routes';

const AuthContext = createContext();

function AuthProvider() {
  const [authUser] = useState({ authenticated: false });

  return (
    <AuthContext.Provider
      value={{
        authUser,
      }}
    >
      <Routes authUser={authUser} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export default AuthProvider;
