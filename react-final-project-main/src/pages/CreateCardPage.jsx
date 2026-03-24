import React, { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BusinessCardForm from '../components/BusinessCard/BusinessCardForm';

const CreateCardPage = () => {
  const navigate = useNavigate();
  const { user, isBusiness } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // בדיקה אם המשתמש מורשה ליצור כרטיסים
  if (!isBusiness) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
          אין לך הרשאה ליצור כרטיסי ביקור. רק משתמשים עסקיים יכולים ליצור כרטיסים.
        </Alert>
      </Container>
    );
  }

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // סימולציה של שמירת כרטיס חדש
      const newCard = {
        ...formData,
        id: Date.now(),
        userId: user.id,
        createdAt: new Date().toISOString().split('T')[0],
        bizNumber: Math.floor(Math.random() * 9000) + 1000
      };

      // שמירה ב-localStorage (בפרויקט אמיתי זה יהיה API call)
      const existingCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      existingCards.push(newCard);
      localStorage.setItem('userCards', JSON.stringify(existingCards));

      setSuccess('כרטיס הביקור נוצר בהצלחה!');
      
      // מעבר לעמוד הכרטיסים שלי אחרי 2 שניות
      setTimeout(() => {
        navigate('/my-cards');
      }, 2000);

    } catch (error) {
      console.error('Error creating card:', error);
      setError('אירעה שגיאה ביצירת הכרטיס. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          יצירת כרטיס ביקור חדש
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          מלאו את הפרטים ליצירת כרטיס ביקור דיגיטלי מקצועי
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

      <BusinessCardForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={false}
      />
    </Container>
  );
};

export default CreateCardPage;
