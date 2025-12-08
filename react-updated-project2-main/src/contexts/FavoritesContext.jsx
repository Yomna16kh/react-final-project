import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // טוען מועדפים מה-localStorage לפי המשתמש המחובר
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`favorites_${user.id}`);
      setFavorites(saved ? JSON.parse(saved) : []);
    } else {
      setFavorites([]); // אם התנתק – מרוקן
    }
  }, [user]);

  const saveFavorites = (updated) => {
    setFavorites(updated);
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(updated));
    }
  };

  const addToFavorites = (cardId) => {
    if (!user) return;
    if (favorites.includes(cardId)) return; // לא מוסיף פעמיים

    const updated = [...favorites, cardId];
    saveFavorites(updated);
  };

  const removeFromFavorites = (cardId) => {
    if (!user) return;

    const updated = favorites.filter((id) => id !== cardId);
    saveFavorites(updated);
  };

  const toggleFavorite = (cardId) => {
    if (!user) return;

    const updated = favorites.includes(cardId)
      ? favorites.filter((id) => id !== cardId)
      : [...favorites, cardId];

    saveFavorites(updated);
  };

  const isFavorite = (cardId) => favorites.includes(cardId);

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}; 