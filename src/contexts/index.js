import React from 'react';
import AuthProvider from './AuthContext';
import ToastProvider from './ToastContext';

export default function AppProvider({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>;
    </ToastProvider>
  );
}
