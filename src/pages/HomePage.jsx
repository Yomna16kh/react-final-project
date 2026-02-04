import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Alert
} from '@mui/material';
import { Add, Business } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BusinessCard from '../components/BusinessCard/BusinessCard';
import { businessCardsData, searchBusinessCards } from '../data/businessCards';

const HomePage = ({ searchTerm }) => {
  const { isAuthenticated, isBusiness } = useAuth();
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    // טעינת כרטיסים
    setCards(businessCardsData);
    setFilteredCards(businessCardsData);
  }, []);

  useEffect(() => {
    // סינון כרטיסים לפי חיפוש
    const filtered = searchBusinessCards(searchTerm);
    setFilteredCards(filtered);
  }, [searchTerm, cards]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* כותרת ראשית */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          מערכת כרטיסי ביקור דיגיטליים
        </Typography>
        
        <Typography variant="h5" color="text.secondary" paragraph>
          פלטפורמה מקצועית לניהול וקידום עסקים
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          גלו עסקים מקומיים איכותיים, צרו קשר ישיר ושמרו על המועדפים עליכם. 
          עבור בעלי עסקים - צרו כרטיס ביקור דיגיטלי מקצועי והגיעו ללקוחות חדשים.
        </Typography>

        {!isAuthenticated && (
          <Alert severity="info" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="body2">
              <strong>התחברו כדי להנות מכל התכונות:</strong><br />
              • שמירת כרטיסים מועדפים<br />
              • יצירת כרטיסי ביקור (למשתמשים עסקיים)<br />
              • ניהול הכרטיסים שלכם
            </Typography>
          </Alert>
        )}

        {isBusiness && (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Add />}
              component={Link}
              to="/create-card"
            >
              צור כרטיס ביקור חדש
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<Business />}
              component={Link}
              to="/my-cards"
            >
              הכרטיסים שלי
            </Button>
          </Box>
        )}
      </Box>

      {/* סטטיסטיקות */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
            }}
          >
            <Typography variant="h3" color="primary" fontWeight="bold">
              {filteredCards.length}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              עסקים רשומים
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)'
            }}
          >
            <Typography variant="h3" color="secondary" fontWeight="bold">
              12+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              קטגוריות עסקים
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)'
            }}
          >
            <Typography variant="h3" color="success.main" fontWeight="bold">
              100%
            </Typography>
            <Typography variant="h6" color="text.secondary">
              זמינות דיגיטלית
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* כותרת כרטיסים */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          כרטיסי ביקור
        </Typography>
        {searchTerm && (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            תוצאות חיפוש עבור: "{searchTerm}" ({filteredCards.length} תוצאות)
          </Typography>
        )}
      </Box>

      {/* רשת כרטיסים */}
      {filteredCards.length > 0 ? (
        <Grid container spacing={4}>
          {filteredCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <BusinessCard card={card} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {searchTerm ? 'לא נמצאו תוצאות חיפוש' : 'אין כרטיסים להצגה'}
          </Typography>
          {searchTerm && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              נסו לחפש במילות מפתח אחרות
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
