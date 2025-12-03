import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Alert,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';

const BusinessCardForm = ({ initialData, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: '',
    alt: '',
    state: '',
    country: 'ישראל',
    city: '',
    street: '',
    houseNumber: '',
    zip: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        description: initialData.description || '',
        phone: initialData.phone || '',
        email: initialData.email || '',
        web: initialData.web || '',
        image: initialData.image || '',
        alt: initialData.alt || '',
        state: initialData.address?.state || '',
        country: initialData.address?.country || 'ישראל',
        city: initialData.address?.city || '',
        street: initialData.address?.street || '',
        houseNumber: initialData.address?.houseNumber || '',
        zip: initialData.address?.zip || ''
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    // בדיקות שדות חובה
    if (!formData.title.trim()) {
      newErrors.title = 'שם העסק הוא שדה חובה';
    }

    if (!formData.subtitle.trim()) {
      newErrors.subtitle = 'תת כותרת היא שדה חובה';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'תיאור העסק הוא שדה חובה';
    }

    // בדיקת טלפון
    const phoneRegex = /^[0-9\-+().\s]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'מספר טלפון הוא שדה חובה';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }

    // בדיקת אימייל
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'כתובת אימייל היא שדה חובה';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }

    // בדיקת URL תמונה
    const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i;
    if (!formData.image.trim()) {
      newErrors.image = 'כתובת תמונה היא שדה חובה';
    } else if (!urlRegex.test(formData.image)) {
      newErrors.image = 'כתובת תמונה לא תקינה (חייבת להיות URL של תמונה)';
    }

    if (!formData.alt.trim()) {
      newErrors.alt = 'תיאור תמונה הוא שדה חובה לנגישות';
    }

    // בדיקות כתובת
    if (!formData.state.trim()) {
      newErrors.state = 'מחוז הוא שדה חובה';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'עיר היא שדה חובה';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'רחוב הוא שדה חובה';
    }

    if (!formData.houseNumber.toString().trim()) {
      newErrors.houseNumber = 'מספר בית הוא שדה חובה';
    }

    // בדיקת מיקוד
    const zipRegex = /^[0-9]{5,7}$/;
    if (!formData.zip.toString().trim()) {
      newErrors.zip = 'מיקוד הוא שדה חובה';
    } else if (!zipRegex.test(formData.zip.toString())) {
      newErrors.zip = 'מיקוד חייב להכיל 5-7 ספרות';
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

    // נקה שגיאה אם השדה נמלא
    if (errors[field] && value.trim()) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        phone: formData.phone,
        email: formData.email,
        web: formData.web,
        image: formData.image,
        alt: formData.alt,
        address: {
          state: formData.state,
          country: formData.country,
          city: formData.city,
          street: formData.street,
          houseNumber: parseInt(formData.houseNumber),
          zip: parseInt(formData.zip)
        }
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        {isEditing ? 'עריכת כרטיס ביקור' : 'יצירת כרטיס ביקור חדש'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {/* פרטי העסק */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              פרטי העסק
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="שם העסק"
              value={formData.title}
              onChange={handleInputChange('title')}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="תת כותרת"
              value={formData.subtitle}
              onChange={handleInputChange('subtitle')}
              error={!!errors.subtitle}
              helperText={errors.subtitle}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="תיאור העסק"
              value={formData.description}
              onChange={handleInputChange('description')}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>

          {/* פרטי קשר */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              פרטי קשר
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="טלפון"
              value={formData.phone}
              onChange={handleInputChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              type="email"
              label="אימייל"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="אתר אינטרנט"
              value={formData.web}
              onChange={handleInputChange('web')}
              helperText="אופציונלי - ללא http://"
            />
          </Grid>

          {/* תמונה */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              תמונה
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="כתובת תמונה (URL)"
              value={formData.image}
              onChange={handleInputChange('image')}
              error={!!errors.image}
              helperText={errors.image || "הכנס כתובת URL של תמונה מאתרים כמו Unsplash או Pexels"}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="תיאור תמונה (לנגישות)"
              value={formData.alt}
              onChange={handleInputChange('alt')}
              error={!!errors.alt}
              helperText={errors.alt || "תיאור קצר של התמונה לצורכי נגישות"}
            />
          </Grid>

          {/* כתובת */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              כתובת
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="מחוז"
              value={formData.state}
              onChange={handleInputChange('state')}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="מדינה"
              value={formData.country}
              onChange={handleInputChange('country')}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="עיר"
              value={formData.city}
              onChange={handleInputChange('city')}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label="רחוב"
              value={formData.street}
              onChange={handleInputChange('street')}
              error={!!errors.street}
              helperText={errors.street}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="מספר בית"
              value={formData.houseNumber}
              onChange={handleInputChange('houseNumber')}
              error={!!errors.houseNumber}
              helperText={errors.houseNumber}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="מיקוד"
              value={formData.zip}
              onChange={handleInputChange('zip')}
              error={!!errors.zip}
              helperText={errors.zip}
            />
          </Grid>

          {/* כפתורי פעולה */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<Save />}
                disabled={isSubmitting}
                size="large"
              >
                {isSubmitting ? 'שומר...' : isEditing ? 'עדכן כרטיס' : 'צור כרטיס'}
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={onCancel}
                disabled={isSubmitting}
                size="large"
              >
                ביטול
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default BusinessCardForm;
