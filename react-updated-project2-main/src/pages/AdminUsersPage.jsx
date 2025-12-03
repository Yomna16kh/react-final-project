import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Alert,
  Grid
} from '@mui/material';
import {
  Edit,
  Delete,
  Person,
  Business,
  AdminPanelSettings
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const AdminUsersPage = () => {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // טעינת משתמשים (בפרויקט אמיתי זה יהיה API call)
    const mockUsers = [
      {
        id: 1,
        firstName: 'אדמין',
        lastName: 'ראשי',
        email: 'admin@business.com',
        phone: '052-1234567',
        userType: 'admin',
        createdAt: '2024-01-01',
        isActive: true
      },
      {
        id: 2,
        firstName: 'דני',
        lastName: 'עסקן',
        email: 'business@example.com',
        phone: '052-7654321',
        userType: 'business',
        createdAt: '2024-01-15',
        isActive: true
      },
      {
        id: 3,
        firstName: 'יוסי',
        lastName: 'כהן',
        email: 'user@example.com',
        phone: '052-9876543',
        userType: 'regular',
        createdAt: '2024-01-20',
        isActive: true
      }
    ];

    setUsers(mockUsers);
  }, []);

  // בדיקה אם המשתמש הוא אדמין
  if (!isAdmin) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          אין לך הרשאה לגשת לעמוד זה. רק מנהלי מערכת יכולים לנהל משתמשים.
        </Alert>
      </Container>
    );
  }

  const getUserTypeIcon = (userType) => {
    switch (userType) {
      case 'admin':
        return <AdminPanelSettings />;
      case 'business':
        return <Business />;
      default:
        return <Person />;
    }
  };

  const getUserTypeLabel = (userType) => {
    switch (userType) {
      case 'admin':
        return 'מנהל מערכת';
      case 'business':
        return 'משתמש עסקי';
      default:
        return 'משתמש רגיל';
    }
  };

  const getUserTypeColor = (userType) => {
    switch (userType) {
      case 'admin':
        return 'error';
      case 'business':
        return 'primary';
      default:
        return 'default';
    }
  };

  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.userType === 'admin').length;
  const businessUsers = users.filter(u => u.userType === 'business').length;
  const regularUsers = users.filter(u => u.userType === 'regular').length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* כותרת העמוד */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          ניהול משתמשים
        </Typography>
        <Typography variant="body1" color="text.secondary">
          נהלו את כל המשתמשים במערכת - צפו בפרטים, ערכו הרשאות ונהלו חשבונות
        </Typography>
      </Box>

      {/* סטטיסטיקות משתמשים */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'primary.light' }}>
            <Typography variant="h4" fontWeight="bold" color="primary.contrastText">
              {totalUsers}
            </Typography>
            <Typography variant="body1" color="primary.contrastText">
              סך הכל משתמשים
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'error.light' }}>
            <Typography variant="h4" fontWeight="bold" color="error.contrastText">
              {adminUsers}
            </Typography>
            <Typography variant="body1" color="error.contrastText">
              מנהלי מערכת
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'info.light' }}>
            <Typography variant="h4" fontWeight="bold" color="info.contrastText">
              {businessUsers}
            </Typography>
            <Typography variant="body1" color="info.contrastText">
              משתמשים עסקיים
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'success.light' }}>
            <Typography variant="h4" fontWeight="bold" color="success.contrastText">
              {regularUsers}
            </Typography>
            <Typography variant="body1" color="success.contrastText">
              משתמשים רגילים
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* טבלת משתמשים */}
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell><strong>שם מלא</strong></TableCell>
                <TableCell><strong>אימייל</strong></TableCell>
                <TableCell><strong>טלפון</strong></TableCell>
                <TableCell><strong>סוג משתמש</strong></TableCell>
                <TableCell><strong>תאריך הצטרפות</strong></TableCell>
                <TableCell><strong>סטטוס</strong></TableCell>
                <TableCell><strong>פעולות</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((userData) => (
                <TableRow key={userData.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getUserTypeIcon(userData.userType)}
                      {userData.firstName} {userData.lastName}
                    </Box>
                  </TableCell>
                  <TableCell>{userData.email}</TableCell>
                  <TableCell>{userData.phone}</TableCell>
                  <TableCell>
                    <Chip
                      label={getUserTypeLabel(userData.userType)}
                      color={getUserTypeColor(userData.userType)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{userData.createdAt}</TableCell>
                  <TableCell>
                    <Chip
                      label={userData.isActive ? 'פעיל' : 'לא פעיל'}
                      color={userData.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" size="small">
                      <Edit />
                    </IconButton>
                    {userData.id !== user?.id && (
                      <IconButton color="error" size="small">
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* הסבר על הרשאות */}
      <Paper elevation={1} sx={{ p: 3, mt: 4, backgroundColor: 'action.hover' }}>
        <Typography variant="h6" gutterBottom>
          הסבר על סוגי משתמשים:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>מנהל מערכת:</strong> גישה מלאה לכל המערכת, ניהול משתמשים וכרטיסי ביקור<br />
          <strong>משתמש עסקי:</strong> יכולת ליצור ולנהל כרטיסי ביקור, גישה למועדפים<br />
          <strong>משתמש רגיל:</strong> צפייה בכרטיסי ביקור, שמירת מועדפים, יצירת קשר עם עסקים
        </Typography>
      </Paper>
    </Container>
  );
};

export default AdminUsersPage;
