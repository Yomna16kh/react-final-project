import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  Chip,
  Button,
  Alert,
  Divider
} from '@mui/material';
import {
  Phone,
  Email,
  Language,
  LocationOn,
  Favorite,
  FavoriteBorder,
  ArrowBack,
  Edit,
  Business
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { businessCardsData } from '../data/businessCards';

const CardDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCard = () => {
      try {
        // חיפוש בכרטיסים הקיימים
        let foundCard = businessCardsData.find(c => c.id === parseInt(id));
        
        // אם לא נמצא, חיפוש ב-localStorage
        if (!foundCard) {
          const savedCards = JSON.parse(localStorage.getItem('userCards') || '[]');
          foundCard = savedCards.find(c => c.id === parseInt(id));
        }

        setCard(foundCard);
        setLoading(false);
      } catch (error) {
        console.error('Error loading card:', error);
        setLoading(false);
      }
    };

    loadCard();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>טוען...</Typography>
      </Container>
    );
  }

  if (!card) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          כרטיס הביקור לא נמצא
        </Alert>
      </Container>
    );
  }

  const isOwner = user && card.userId === user.id;
  const canEdit = isOwner || (user?.userType === 'admin');

  const handleFavoriteClick = () => {
    if (isAuthenticated) {
      toggleFavorite(card.id);
    }
  };

  const handleEditClick = () => {
    navigate(`/edit-card/${card.id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* כפתור חזרה */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        חזרה
      </Button>

      <Grid container spacing={4}>
        {/* תמונה ופעולות */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ overflow: 'hidden' }}>
            <Box
              component="img"
              src={card.image}
              alt={card.alt}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover'
              }}
            />
            
            {/* פעולות */}
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                {isAuthenticated && (
                  <IconButton
                    color="secondary"
                    onClick={handleFavoriteClick}
                    size="large"
                  >
                    {isFavorite(card.id) ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                )}
              </Box>
              
              <Box>
                {canEdit && (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={handleEditClick}
                  >
                    ערוך כרטיס
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* פרטי העסק */}
        <Grid item xs={12} md={7}>
          <Box>
            {/* כותרת ותת כותרת */}
            <Typography variant="h3" component="h1" gutterBottom>
              {card.title}
            </Typography>
            
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {card.subtitle}
            </Typography>

            {/* תיאור */}
            <Typography variant="body1" paragraph sx={{ mt: 3, lineHeight: 1.7 }}>
              {card.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* פרטי קשר */}
            <Typography variant="h5" gutterBottom>
              פרטי קשר
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Phone color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      טלפון
                    </Typography>
                    <Typography variant="body1">
                      <a href={`tel:${card.phone}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {card.phone}
                      </a>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Email color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      אימייל
                    </Typography>
                    <Typography variant="body1">
                      <a href={`mailto:${card.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {card.email}
                      </a>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              {card.web && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Language color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        אתר אינטרנט
                      </Typography>
                      <Typography variant="body1">
                        <a 
                          href={`https://${card.web}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          {card.web}
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* כתובת */}
            <Typography variant="h5" gutterBottom>
              כתובת
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
              <LocationOn color="primary" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body1">
                  {card.address.street} {card.address.houseNumber}
                </Typography>
                <Typography variant="body1">
                  {card.address.city}, {card.address.state}
                </Typography>
                <Typography variant="body1">
                  {card.address.country} {card.address.zip}
                </Typography>
              </Box>
            </Box>

            {/* תגיות */}
            <Box sx={{ mt: 3 }}>
              <Chip
                icon={<Business />}
                label={card.address.city}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip
                label={card.address.state}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
              {card.bizNumber && (
                <Chip
                  label={`מספר עסק: ${card.bizNumber}`}
                  variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                />
              )}
            </Box>

            {/* כפתורי פעולה */}
            <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Phone />}
                href={`tel:${card.phone}`}
                size="large"
              >
                התקשר עכשיו
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Email />}
                href={`mailto:${card.email}`}
                size="large"
              >
                שלח אימייל
              </Button>
              
              {card.web && (
                <Button
                  variant="outlined"
                  startIcon={<Language />}
                  href={`https://${card.web}`}
                  target="_blank"
                  size="large"
                >
                  בקר באתר
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CardDetailsPage;
