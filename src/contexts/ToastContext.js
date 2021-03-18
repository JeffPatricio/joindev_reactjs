import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ToastContext = createContext();

function ToastProvider({ children }) {
  function showToast(message, type = 'default') {
    toast(message, {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type,
    });
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error('useToast must be used within an ToastProvider');
  return context;
}

export default ToastProvider;
