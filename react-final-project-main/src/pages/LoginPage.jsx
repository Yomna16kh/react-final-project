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
  Divider
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'אימייל הוא שדה חובה';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'סיסמה היא שדה חובה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field] && value.trim()) {
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
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setGeneralError(result.error || 'שגיאה בהתחברות');
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
          <LoginIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          
          <Typography component="h1" variant="h4" gutterBottom>
            התחברות למערכת
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            הכנסו את פרטי ההתחברות שלכם כדי לגשת למערכת
          </Typography>

          {generalError && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {generalError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              required
              fullWidth
              id="email"
              label="כתובת אימייל"
              name="email"
              autoComplete="email"
              autoFocus
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
              name="password"
              label="סיסמה"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 4 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ mb: 3, py: 1.5 }}
            >
              {isSubmitting ? 'מתחבר...' : 'התחבר'}
            </Button>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                עדיין אין לכם חשבון?{' '}
                <Link component={RouterLink} to="/register">
                  הרשמו כאן
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Demo Users Info */}
      <Paper elevation={2} sx={{ mt: 4, p: 3, backgroundColor: 'action.hover' }}>
        <Typography variant="h6" gutterBottom>
          משתמשי דמו לבדיקה:
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>אדמין:</strong> admin@business.com / Admin123!
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>משתמש עסקי:</strong> business@example.com / Business123!
        </Typography>
        <Typography variant="body2">
          <strong>משתמש רגיל:</strong> user@example.com / User123!
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
