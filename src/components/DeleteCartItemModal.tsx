import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography } from '@mui/material';
import { CartItem } from "../types/cart.types";
import { TransitionProps } from "@mui/material/transitions";
import React from 'react';

interface DeleteCartItemModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: CartItem;
}

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DeleteCartItemModal = ({
  open,
  onClose,
  onConfirm,
  item,
}: DeleteCartItemModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to remove this ticket?</Typography>
        <Typography mt={2}>
          Flight: {item.flight.from} → {item.flight.to}
          <br />
          Seat: Row {item.seat.row}, Seat {item.seat.number}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
