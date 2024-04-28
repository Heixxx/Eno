import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
        setIsAuthenticated(true);
    }
}, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const contextValue = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
