import React from 'react';
import AuthProvider from './AuthContext';

export default function AppProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
