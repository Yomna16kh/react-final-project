import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from '@mui/material';
import { Add, Business } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BusinessCard from '../components/BusinessCard/BusinessCard';
import { businessCardsData } from '../data/businessCards';

const MyCardsPage = () => {
  const navigate = useNavigate();
  const { user, isBusiness } = useAuth();
  const [myCards, setMyCards] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, cardId: null });

  useEffect(() => {
    if (user) {
      // טעינת כרטיסים של המשתמש
      const userCards = businessCardsData.filter(card => card.userId === user.id);
      
      // טעינת כרטיסים נוספים מ-localStorage (כרטיסים שנוצרו על ידי המשתמש)
      const savedCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const userSavedCards = savedCards.filter(card => card.userId === user.id);
      
      setMyCards([...userCards, ...userSavedCards]);
    }
  }, [user]);

  // בדיקה אם המשתמש מורשה לגשת לעמוד
  if (!isBusiness) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          אין לך הרשאה לצפות בעמוד זה. רק משתמשים עסקיים יכולים לנהל כרטיסי ביקור.
        </Alert>
      </Container>
    );
  }

  const handleEdit = (card) => {
    navigate(`/edit-card/${card.id}`);
  };

  const handleDeleteClick = (cardId) => {
    setDeleteDialog({ open: true, cardId });
  };

  const handleDeleteConfirm = () => {
    const cardId = deleteDialog.cardId;
    
    // מחיקה מ-localStorage
    const savedCards = JSON.parse(localStorage.getItem('userCards') || '[]');
    const updatedCards = savedCards.filter(card => card.id !== cardId);
    localStorage.setItem('userCards', JSON.stringify(updatedCards));
    
    // עדכון המצב המקומי
    setMyCards(prev => prev.filter(card => card.id !== cardId));
    
    setDeleteDialog({ open: false, cardId: null });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, cardId: null });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* כותרת העמוד */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          הכרטיסים שלי
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          נהלו את כרטיסי הביקור שלכם - ערכו, מחקו או צרו כרטיסים חדשים
        </Typography>
        
        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          component={Link}
          to="/create-card"
          sx={{ mt: 2 }}
        >
          צור כרטיס ביקור חדש
        </Button>
      </Box>

      {/* סטטיסטיקות */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">
                {myCards.length}
              </Typography>
              <Typography variant="body1">
                כרטיסים פעילים
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">
                <Business sx={{ fontSize: 'inherit', mr: 1 }} />
              </Typography>
              <Typography variant="body1">
                פרופיל עסקי
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold">
                100%
              </Typography>
              <Typography variant="body1">
                נוכחות דיגיטלית
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* רשת הכרטיסים */}
      {myCards.length > 0 ? (
        <Grid container spacing={4}>
          {myCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <BusinessCard
                card={card}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                showActions={true}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Business sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            עדיין אין לכם כרטיסי ביקור
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            צרו את הכרטיס הראשון שלכם והתחילו להציג את העסק שלכם באופן מקצועי
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            component={Link}
            to="/create-card"
          >
            צור כרטיס ביקור ראשון
          </Button>
        </Box>
      )}

      {/* דיאלוג מחיקה */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          אישור מחיקת כרטיס ביקור
        </DialogTitle>
        <DialogContent>
          <Typography>
            האם אתם בטוחים שברצונכם למחוק את כרטיס הביקור? 
            פעולה זו אינה ניתנת לביטול.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>
            ביטול
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            מחק כרטיס
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyCardsPage;
