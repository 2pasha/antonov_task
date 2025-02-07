import { Flight } from '../types/flight.types';
import { Seat } from '../types/seat.types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Transition } from './DeleteCartItemModal';

interface SeatBookingModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  flight: Flight;
  seat: Seat;
}

export const SeatBookingModal = ({
  open,
  onClose,
  onConfirm,
  flight,
  seat,
}: SeatBookingModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle>Confirm Seat Booking</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">{flight.airline}</Typography>
          <Typography>
            Flight: {flight.from} → {flight.to}
          </Typography>
          <Typography>
            Row {seat.row}, Seat {seat.number}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            Price: ${flight.price}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};
