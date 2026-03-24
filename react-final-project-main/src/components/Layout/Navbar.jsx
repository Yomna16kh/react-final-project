import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  InputAdornment,
  Badge,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Brightness4,
  Brightness7,
  AccountCircle,
  Home,
  Favorite,
  Business,
  Add,
  People,
  Info,
  Login,
  PersonAdd,
  Logout
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useThemeMode } from '../../contexts/ThemeContext';
import { useFavorites } from '../../contexts/FavoritesContext';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { darkMode, toggleDarkMode } = useThemeMode();
  const { user, logout, isAuthenticated, isAdmin, isBusiness } = useAuth();
  const { favorites } = useFavorites();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const menuItems = [
    { text: 'בית', icon: <Home />, path: '/', show: true },
    { text: 'אודות', icon: <Info />, path: '/about', show: true },
    { text: 'מועדפים', icon: <Favorite />, path: '/favorites', show: isAuthenticated },
    { text: 'הכרטיסים שלי', icon: <Business />, path: '/my-cards', show: isBusiness },
    { text: 'יצירת כרטיס', icon: <Add />, path: '/create-card', show: isBusiness },
    { text: 'ניהול משתמשים', icon: <People />, path: '/admin/users', show: isAdmin },
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {menuItems.filter(item => item.show).map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{ 
              textDecoration: 'none', 
              color: 'inherit',
              '&:hover': { backgroundColor: 'action.hover' }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        
        {!isAuthenticated && (
          <>
            <ListItem
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <ListItemIcon><Login /></ListItemIcon>
              <ListItemText primary="התחברות" />
            </ListItem>
            <ListItem
              component={Link}
              to="/register"
              onClick={handleDrawerToggle}
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                '&:hover': { backgroundColor: 'action.hover' }
              }}
            >
              <ListItemIcon><PersonAdd /></ListItemIcon>
              <ListItemText primary="הרשמה" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: isMobile ? 1 : 0,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              mr: 4
            }}
          >
            מערכת כרטיסי ביקור
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              {menuItems.filter(item => item.show).map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{ textTransform: 'none' }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="חיפוש..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.23)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '& input': { color: 'white' },
                  '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: 'white' }
                }
              }}
            />

            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {isAuthenticated && (
              <IconButton
                color="inherit"
                component={Link}
                to="/favorites"
              >
                <Badge badgeContent={favorites.length} color="secondary">
                  <Favorite />
                </Badge>
              </IconButton>
            )}

            {isAuthenticated ? (
              <>
                <IconButton
                  size="large"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem disabled>
                    {user?.firstName} {user?.lastName}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Logout sx={{ mr: 1 }} />
                    התנתקות
                  </MenuItem>
                </Menu>
              </>
            ) : (
              !isMobile && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    startIcon={<Login />}
                  >
                    התחברות
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                    startIcon={<PersonAdd />}
                  >
                    הרשמה
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
