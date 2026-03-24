import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../service/api'; // החיבור לשרת

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // טעינת משתמש אם יש token
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) setUser(JSON.parse(userData));
    setLoading(false);
  }, []);

  // 🔐 LOGIN אמיתי מהשרת
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  // 📝 REGISTER אמיתי
  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Register failed',
      };
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.userType === 'admin',
    isBusiness: user?.userType === 'business' || user?.userType === 'admin',
    isRegular: user?.userType === 'regular',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};