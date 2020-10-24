import React from 'react';
import GlobalStyles from './styles/global';
import AppProvider from './hooks';

export default function App() {
  return (
    <AppProvider>
      <GlobalStyles />
    </AppProvider>
  );
}