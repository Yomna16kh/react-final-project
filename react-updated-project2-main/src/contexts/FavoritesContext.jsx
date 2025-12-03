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

  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  const addToFavorites = (cardId) => {
    if (!user) return;
    
    const newFavorites = [...favorites, cardId];
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (cardId) => {
    if (!user) return;
    
    const newFavorites = favorites.filter(id => id !== cardId);
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
  };

  const toggleFavorite = (cardId) => {
    if (favorites.includes(cardId)) {
      removeFromFavorites(cardId);
    } else {
      addToFavorites(cardId);
    }
  };

  const isFavorite = (cardId) => {
    return favorites.includes(cardId);
  };

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
