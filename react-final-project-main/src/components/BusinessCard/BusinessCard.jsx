import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
  Tooltip
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Phone,
  Email,
  Language,
  Edit,
  Delete,
  Visibility
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';

const BusinessCard = ({ card, onEdit, onDelete, showActions = true }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isOwner = user && card.userId === user.id;
  const canEdit = isOwner || (user?.userType === 'admin');

  const handleCardClick = () => {
    navigate(`/card/${card.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isAuthenticated) {
      toggleFavorite(card.id);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(card);
    } else {
      navigate(`/edit-card/${card.id}`);
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(card.id);
    }
  };

  const handleViewClick = (e) => {
    e.stopPropagation();
    handleCardClick();
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={card.image}
        alt={card.alt}
        sx={{
          objectFit: 'cover'
        }}
      />
      
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom noWrap>
          {card.title}
        </Typography>
        
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {card.subtitle}
        </Typography>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            mb: 2
          }}
        >
          {card.description}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          <Chip
            label={`${card.address.city}, ${card.address.state}`}
            size="small"
            variant="outlined"
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 1 }}>
          <Tooltip title="טלפון">
            <IconButton
              size="small"
              color="primary"
              href={`tel:${card.phone}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Phone fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="אימייל">
            <IconButton
              size="small"
              color="primary"
              href={`mailto:${card.email}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Email fontSize="small" />
            </IconButton>
          </Tooltip>
          
          {card.web && (
            <Tooltip title="אתר אינטרנט">
              <IconButton
                size="small"
                color="primary"
                href={`https://${card.web}`}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                <Language fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>

      {showActions && (
        <CardActions sx={{ justifyContent: 'space-between', pt: 0 }}>
          <Box>
            {isAuthenticated && (
              <Tooltip title={isFavorite(card.id) ? "הסר ממועדפים" : "הוסף למועדפים"}>
                <IconButton
                  color="secondary"
                  onClick={handleFavoriteClick}
                >
                  {isFavorite(card.id) ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Tooltip>
            )}
          </Box>
          
          <Box>
            <Tooltip title="צפה בפרטים">
              <IconButton color="primary" onClick={handleViewClick}>
                <Visibility />
              </IconButton>
            </Tooltip>
            
            {canEdit && (
              <>
                <Tooltip title="ערוך">
                  <IconButton color="info" onClick={handleEditClick}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="מחק">
                  <IconButton color="error" onClick={handleDeleteClick}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

export default BusinessCard;
