import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Business,
  Favorite,
  Search,
  Security,
  Support,
  Group,
  CheckCircle
} from '@mui/icons-material';

const AboutPage = () => {
  const features = [
    {
      icon: <Business />,
      title: 'יצירת כרטיסי ביקור',
      description: 'בעלי עסקים יכולים ליצור כרטיסי ביקור דיגיטליים מקצועיים עם כל הפרטים הרלוונטיים'
    },
    {
      icon: <Search />,
      title: 'חיפוש מתקדם',
      description: 'מנוע חיפוש חכם המאפשר למצוא עסקים לפי שם, קטגוריה או מיקום'
    },
    {
      icon: <Favorite />,
      title: 'מערכת מועדפים',
      description: 'שמירת עסקים מועדפים לגישה מהירה ונוחה'
    },
    {
      icon: <Security />,
      title: 'אבטחת מידע',
      description: 'הגנה מקסימלית על נתוני המשתמשים והעסקים'
    }
  ];

  const userTypes = [
    {
      type: 'משתמש רגיל',
      permissions: [
        'צפייה בכרטיסי ביקור',
        'חיפוש עסקים',
        'שמירת מועדפים',
        'יצירת קשר עם עסקים'
      ]
    },
    {
      type: 'משתמש עסקי',
      permissions: [
        'כל ההרשאות של משתמש רגיל',
        'יצירת כרטיסי ביקור',
        'עריכת כרטיסים קיימים',
        'מחיקת כרטיסים',
        'ניהול פרטי העסק'
      ]
    },
    {
      type: 'מנהל מערכת (אדמין)',
      permissions: [
        'כל ההרשאות של משתמש עסקי',
        'ניהול כל המשתמשים',
        'ניהול כל כרטיסי הביקור',
        'גישה למערכת CRM',
        'שינוי הרשאות משתמשים'
      ]
    }
  ];

  const howToUse = [
    'הרשמו למערכת או התחברו עם חשבון קיים',
    'עיינו בכרטיסי הביקור הזמינים',
    'השתמשו בחיפוש כדי למצוא עסקים ספציפיים',
    'שמרו עסקים מעניינים במועדפים שלכם',
    'צרו קשר ישיר עם העסקים',
    'אם אתם בעלי עסק - צרו כרטיס ביקור משלכם'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
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
          אודות המערכת
        </Typography>
        
        <Typography variant="h5" color="text.secondary" paragraph>
          מערכת כרטיסי ביקור דיגיטליים מתקדמת
        </Typography>
      </Box>

      {/* תיאור כללי */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          מה זה מערכת כרטיסי הביקור שלנו?
        </Typography>
        
        <Typography variant="body1" paragraph>
          מערכת כרטיסי הביקור הדיגיטליים שלנו היא פלטפורמה מקצועית ומתקדמת המיועדת לחבר בין עסקים ללקוחות 
          פוטנציאליים באופן יעיל ונוח. המערכת מאפשרת לבעלי עסקים ליצור כרטיסי ביקור דיגיטליים אינטראקטיביים 
          ומקצועיים, בעוד שמשתמשים יכולים לגלות עסקים חדשים, לשמור על מועדפים ולהתחבר ישירות עם ספקי השירותים.
        </Typography>
        
        <Typography variant="body1" paragraph>
          הפלטפורמה שלנו נבנתה עם דגש על חוויית משתמש מעולה, עיצוב מודרני ורספונסיבי, ופונקציונליות מתקדמת 
          המתאימה לעולם העסקי המודרני. כל כרטיס ביקור כולל מידע מפורט על העסק, דרכי התקשרות, מיקום ותמונות 
          המציגות את האווירה והשירותים.
        </Typography>

        <Typography variant="body1">
          המערכת מספקת פתרון מקיף לניהול נוכחות דיגיטלית עסקית ומאפשרת לכל עסק, גדול או קטן, להציג את עצמו 
          בצורה מקצועית ולהגיע לקהל יעד רחב יותר.
        </Typography>
      </Paper>

      {/* תכונות המערכת */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          תכונות המערכת
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ color: 'primary.main', mt: 1 }}>
                  {feature.icon}
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* סוגי משתמשים והרשאות */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          סוגי משתמשים והרשאות
        </Typography>
        
        <Grid container spacing={4}>
          {userTypes.map((userType, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  backgroundColor: index === 0 ? 'action.hover' : index === 1 ? 'primary.light' : 'secondary.light',
                  opacity: 0.1
                }}
              >
                <Typography variant="h6" gutterBottom color="primary">
                  <Group sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {userType.type}
                </Typography>
                
                <List dense>
                  {userType.permissions.map((permission, permIndex) => (
                    <ListItem key={permIndex} sx={{ pl: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={permission}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* איך להשתמש */}
      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          איך להשתמש במערכת?
        </Typography>
        
        <Typography variant="body1" paragraph>
          השימוש במערכת פשוט וידידותי למשתמש:
        </Typography>
        
        <List>
          {howToUse.map((step, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}
                >
                  {index + 1}
                </Box>
              </ListItemIcon>
              <ListItemText primary={step} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* תמיכה טכנית */}
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          תמיכה ויצירת קשר
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Support color="primary" />
              <Typography variant="h6">
                תמיכה טכנית
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              צוות התמיכה שלנו זמין לעזור לכם בכל שאלה או בעיה טכנית.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              אימייל: support@business-cards.co.il<br />
              טלפון: 03-1234567<br />
              שעות פעילות: ראשון-חמישי, 9:00-17:00
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Business color="primary" />
              <Typography variant="h6">
                שירותי עסקים
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              מעוניינים בפתרונות עסקיים מתקדמים? נשמח לייעץ לכם.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              אימייל: business@business-cards.co.il<br />
              טלפון: 03-7654321<br />
              נציג יחזור אליכם תוך 24 שעות
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AboutPage;
