import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Alert,
  Paper,
  Button
} from '@mui/material';
import { Favorite, FavoriteBorder, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import BusinessCard from '../components/BusinessCard/BusinessCard';
import { businessCardsData } from '../data/businessCards';

const FavoritesPage = () => {
  const { isAuthenticated } = useAuth();
  const { favorites } = useFavorites();
  const [favoriteCards, setFavoriteCards] = useState([]);

  useEffect(() => {
    if (isAuthenticated && favorites.length > 0) {
      // טעינת כרטיסים מועדפים
      const cards = businessCardsData.filter(card => favorites.includes(card.id));
      
      // טעינת כרטיסים נוספים מ-localStorage
      const savedCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const savedFavoriteCards = savedCards.filter(card => favorites.includes(card.id));
      
      setFavoriteCards([...cards, ...savedFavoriteCards]);
    } else {
      setFavoriteCards([]);
    }
  }, [favorites, isAuthenticated]);

  // בדיקה אם המשתמש מחובר
  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="info">
          <Typography variant="h6" gutterBottom>
            נדרשת התחברות
          </Typography>
          <Typography variant="body1" paragraph>
            כדי לצפות במועדפים שלכם, אנא התחברו למערכת.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{ mt: 1 }}
          >
            התחבר למערכת
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* כותרת העמוד */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            color: 'secondary.main'
          }}
        >
          <Favorite sx={{ fontSize: 'inherit' }} />
          הכרטיסים המועדפים שלי
        </Typography>
        <Typography variant="body1" color="text.secondary">
          כאן תוכלו למצוא את כל כרטיסי הביקור שסימנתם כמועדפים
        </Typography>
      </Box>

      {/* סטטיסטיקות מועדפים */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)',
          border: '1px solid',
          borderColor: 'secondary.light'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Favorite sx={{ fontSize: 40, color: 'secondary.main' }} />
              <Box>
                <Typography variant="h4" fontWeight="bold" color="secondary.main">
                  {favoriteCards.length}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  עסקים מועדפים
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" color="text.secondary">
              שמרו עסקים נוספים כמועדפים כדי לגשת אליהם בקלות בעתיד. 
              לחצו על הלב בכרטיס הביקור כדי להוסיף למועדפים.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* רשת הכרטיסים המועדפים */}
      {favoriteCards.length > 0 ? (
        <Grid container spacing={4}>
          {favoriteCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <BusinessCard card={card} showActions={true} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <FavoriteBorder sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            עדיין אין לכם עסקים מועדפים
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            עיינו בכרטיסי הביקור הזמינים ושמרו את העסקים המעניינים אתכם כמועדפים
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            component={Link}
            to="/"
          >
            עיינו בכרטיסי ביקור
          </Button>
        </Box>
      )}

      {/* הסבר על שימוש במועדפים */}
      {favoriteCards.length > 0 && (
        <Paper elevation={1} sx={{ p: 3, mt: 4, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>
            💡 טיפים לשימוש במועדפים:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • לחצו על הלב בכרטיס ביקור כדי להוסיף או להסיר ממועדפים<br />
            • המועדפים שלכם נשמרים באופן אוטומטי<br />
            • תוכלו לגשת למועדפים בכל עת דרך תפריט הניווט<br />
            • השתמשו במועדפים כדי לעקוב אחרי עסקים שמעניינים אתכם
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default FavoritesPage;
