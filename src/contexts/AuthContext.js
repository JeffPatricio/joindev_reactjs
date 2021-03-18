import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import Routes from '../routes';
import axios from 'axios';
import { apiUrl, xRequestToken } from '../config';
import { storageServices } from '../services/storage';

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common['x-request-access'] = xRequestToken;

const AuthContext = createContext();

function AuthProvider() {
  const [authUser, setAuthUser] = useState({ authenticated: false });

  useEffect(() => {
    configToken();
  }, []);

  function signIn(authData) {
    storageServices.setAuthData(authData);
    setAuthUser({ ...authData, authenticated: true });
    axios.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;
  }

  function signOut() {
    setAuthUser({ authenticated: false });
    storageServices.cleanStorage();
    axios.defaults.headers.common['Authorization'] = `Bearer `;
  }

  const configToken = useCallback(async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        signIn,
        signOut,
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
