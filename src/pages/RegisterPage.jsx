import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  FormControlLabel,
  Checkbox,
  Divider
} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isBusiness: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // בדיקת שם פרטי
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'שם פרטי הוא שדה חובה';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'שם פרטי חייב להכיל לפחות 2 תווים';
    }

    // בדיקת שם משפחה
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'שם משפחה הוא שדה חובה';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'שם משפחה חייב להכיל לפחות 2 תווים';
    }

    // בדיקת אימייל
    if (!formData.email.trim()) {
      newErrors.email = 'אימייל הוא שדה חובה';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }

    // בדיקת טלפון
    const phoneRegex = /^[0-9\-+().\s]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'מספר טלפון הוא שדה חובה';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }

    // בדיקת סיסמה - לפי הדרישות במסמך
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*\d.*\d.*\d)(?=.*[!@#$%^&*\-_])[A-Za-z\d!@#$%^&*\-_]{8,}$/;
    if (!formData.password) {
      newErrors.password = 'סיסמה היא שדה חובה';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה, 4 ספרות וסימן מיוחד (!@#$%^&*-_)';
    }

    // בדיקת אישור סיסמה
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'אישור סיסמה הוא שדה חובה';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field] && (event.target.type === 'checkbox' || value.trim())) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    if (generalError) {
      setGeneralError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setGeneralError('');

    try {
      const { confirmPassword, ...submitData } = formData;
      const result = await register(submitData);
      
      if (result.success) {
        navigate('/');
      } else {
        setGeneralError(result.error || 'שגיאה ברישום');
      }
    } catch (error) {
      setGeneralError('אירעה שגיאה במערכת. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={6} sx={{ p: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <PersonAdd sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          
          <Typography component="h1" variant="h4" gutterBottom>
            הרשמה למערכת
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            צרו חשבון חדש כדי להתחיל להשתמש במערכת
          </Typography>

          {generalError && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {generalError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                required
                fullWidth
                id="firstName"
                label="שם פרטי"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              
              <TextField
                required
                fullWidth
                id="lastName"
                label="שם משפחה"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Box>

            <TextField
              required
              fullWidth
              id="email"
              label="כתובת אימייל"
              name="email"
              autoComplete="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 3 }}
            />
            
            <TextField
              required
              fullWidth
              id="phone"
              label="מספר טלפון"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ mb: 3 }}
            />
            
            <TextField
              required
              fullWidth
              name="password"
              label="סיסמה"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={!!errors.password}
              helperText={errors.password || "8+ תווים, אות גדולה, אות קטנה, 4 ספרות, סימן מיוחד"}
              sx={{ mb: 3 }}
            />
            
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="אישור סיסמה"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ mb: 3 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isBusiness}
                  onChange={handleInputChange('isBusiness')}
                  name="isBusiness"
                />
              }
              label="אני בעל עסק ומעוניין ליצור כרטיסי ביקור"
              sx={{ mb: 3 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ mb: 3, py: 1.5 }}
            >
              {isSubmitting ? 'נרשם...' : 'הרשמה'}
            </Button>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                כבר יש לכם חשבון?{' '}
                <Link component={RouterLink} to="/login">
                  התחברו כאן
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
