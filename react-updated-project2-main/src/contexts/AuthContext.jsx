import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // בדיקה אם יש משתמש מחובר ב-localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // פה בפרויקט אמיתי נפענח את ה-JWT
        // לצורך הדוגמה, נשתמש בנתונים מקומיים
        const userData = localStorage.getItem('userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // סימולציה של קריאה לשרת
      // בפרויקט אמיתי זה יהיה axios call לAPI
      const mockUsers = [
        {
          id: 1,
          email: 'admin@business.com',
          password: 'Admin123!',
          firstName: 'אדמין',
          lastName: 'ראשי',
          phone: '052-1234567',
          userType: 'admin'
        },
        {
          id: 2,
          email: 'business@example.com',
          password: 'Business123!',
          firstName: 'דני',
          lastName: 'עסקן',
          phone: '052-7654321',
          userType: 'business'
        },
        {
          id: 3,
          email: 'user@example.com',
          password: 'User123!',
          firstName: 'יוסי',
          lastName: 'כהן',
          phone: '052-9876543',
          userType: 'regular'
        }
      ];

      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('שם משתמש או סיסמה שגויים');
      }

      // יצירת JWT מדומה
      const token = `mock-jwt-token-${foundUser.id}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify({
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        phone: foundUser.phone,
        userType: foundUser.userType
      }));
      
      setUser({
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        phone: foundUser.phone,
        userType: foundUser.userType
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // סימולציה של רישום
      // בפרויקט אמיתי זה יהיה axios call לAPI
      const newUser = {
        id: Date.now(),
        ...userData,
        userType: userData.isBusiness ? 'business' : 'regular'
      };

      const token = `mock-jwt-token-${newUser.id}`;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      setUser(newUser);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

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
    isRegular: user?.userType === 'regular'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
