import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BusinessCardForm from '../components/BusinessCard/BusinessCardForm';
import { businessCardsData } from '../data/businessCards';

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isBusiness } = useAuth();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

        if (!foundCard) {
          setError('כרטיס הביקור לא נמצא');
          setLoading(false);
          return;
        }

        // בדיקה אם המשתמש מורשה לערוך את הכרטיס
        if (foundCard.userId !== user?.id && user?.userType !== 'admin') {
          setError('אין לך הרשאה לערוך כרטיס זה');
          setLoading(false);
          return;
        }

        setCard(foundCard);
        setLoading(false);
      } catch (error) {
        console.error('Error loading card:', error);
        setError('שגיאה בטעינת הכרטיס');
        setLoading(false);
      }
    };

    if (user) {
      loadCard();
    }
  }, [id, user]);

  // בדיקה אם המשתמש מורשה
  if (!isBusiness) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
          אין לך הרשאה לערוך כרטיסי ביקור. רק משתמשים עסקיים יכולים לערוך כרטיסים.
        </Alert>
      </Container>
    );
  }

  const handleSubmit = async (formData) => {
    setError('');
    setSuccess('');

    try {
      // עדכון הכרטיס
      const updatedCard = {
        ...card,
        ...formData,
        updatedAt: new Date().toISOString().split('T')[0]
      };

      // עדכון ב-localStorage
      const savedCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const cardIndex = savedCards.findIndex(c => c.id === parseInt(id));
      
      if (cardIndex !== -1) {
        savedCards[cardIndex] = updatedCard;
        localStorage.setItem('userCards', JSON.stringify(savedCards));
      }

      setSuccess('כרטיס הביקור עודכן בהצלחה!');
      
      // מעבר לעמוד הכרטיסים שלי אחרי 2 שניות
      setTimeout(() => {
        navigate('/my-cards');
      }, 2000);

    } catch (error) {
      console.error('Error updating card:', error);
      setError('אירעה שגיאה בעדכון הכרטיס. אנא נסו שוב.');
    }
  };

  const handleCancel = () => {
    navigate('/my-cards');
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          טוען כרטיס ביקור...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          עריכת כרטיס ביקור
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          ערכו את פרטי כרטיס הביקור שלכם
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      {card && (
        <BusinessCardForm
          initialData={card}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={true}
        />
      )}
    </Container>
  );
};

export default EditCardPage;
