import { useNavigate } from 'react-router-dom';
import { Fligth } from '../types/flight.types';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleFavourite } from '../store/slices/flightsSlice';
import { Star, StarBorder } from '@mui/icons-material';

interface FlightCardProps {
  flight: Fligth;
  isFavorite: boolean;
}

export const FlightCard = ({ flight, isFavorite }: FlightCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 }
      }}
      onClick={() => navigate(`/flight/${flight.id}`)}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{flight.airline}</Typography>
          <IconButton 
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleFavourite(flight.id));
            }}
          >
            {isFavorite ? <Star color="primary" /> : <StarBorder />}
          </IconButton>
        </Box>
        <Box my={2}>
          <Typography>Flight ID: {flight.id}</Typography>
          <Box display="flex" justifyContent="space-between" my={1} mb={2}>
            <Box>
              <Typography variant="body1">{flight.from}</Typography>
              <Typography>{new Date(flight.departureTime).toLocaleTimeString()}</Typography>
            </Box>
            <Box>
              <Typography variant="body1">{flight.to}</Typography>
              <Typography>{new Date(flight.arrivalTime).toLocaleTimeString()}</Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography>Terminal: {flight.terminal}</Typography>
            <Typography>Gate: {flight.gate}</Typography>
          </Box>
          <Typography>Available: {flight.tickets.remaining}/{flight.tickets.total} seats</Typography>
        </Box>
        <Typography variant="h6" color="primary">${flight.price}</Typography>
      </CardContent>
    </Card>
  );
};