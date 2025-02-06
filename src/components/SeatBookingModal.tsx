import React from "react";
import { Flight } from "../types/flight.types";
import { Seat } from "../types/seat.types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

interface SeatBookingModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  flight: Flight;
  seat: Seat;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
