import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Home,
  Info,
  Business,
  Favorite,
  Add,
  People
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Footer = () => {
  const { isAuthenticated, isAdmin, isBusiness } = useAuth();

  const navigationLinks = [
    { text: 'בית', icon: <Home />, path: '/', show: true },
    { text: 'אודות', icon: <Info />, path: '/about', show: true },
    { text: 'מועדפים', icon: <Favorite />, path: '/favorites', show: isAuthenticated },
    { text: 'הכרטיסים שלי', icon: <Business />, path: '/my-cards', show: isBusiness },
    { text: 'יצירת כרטיס', icon: <Add />, path: '/create-card', show: isBusiness },
    { text: 'ניהול משתמשים', icon: <People />, path: '/admin/users', show: isAdmin },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              מערכת כרטיסי ביקור
            </Typography>
            <Typography variant="body2" color="text.secondary">
              פלטפורמה מקצועית לניהול כרטיסי ביקור דיגיטליים עבור עסקים ויזמים
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              ניווט מהיר
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {navigationLinks.filter(link => link.show).map((link) => (
                <Link
                  key={link.text}
                  component={RouterLink}
                  to={link.path}
                  color="text.secondary"
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  {link.icon}
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              יצירת קשר
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              אימייל: info@business-cards.co.il
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              טלפון: 03-1234567
            </Typography>
            <Typography variant="body2" color="text.secondary">
              כתובת: תל אביב, ישראל
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              עקבו אחרינו
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="primary" href="#" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="primary" href="#" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="primary" href="#" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="primary" href="#" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} מערכת כרטיסי ביקור. כל הזכויות שמורות.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="text.secondary" underline="hover">
              תנאי שימוש
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              מדיניות פרטיות
            </Link>
          </Box>
        </Box>

        {/* Copyright bar */}
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            py: 1,
            textAlign: 'center',
            backgroundColor: 'action.hover',
            borderRadius: 1,
            mt: 2
          }}
        >
          <Typography variant="caption" color="text.secondary">
            AI vibe coded development by {'Yomna Khashan '}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              underline="hover"
            >
            </Link>

          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
