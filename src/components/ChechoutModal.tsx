import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Transition } from './DeleteCartItemModal';

interface ChechoutModalProps {
  open: boolean;
  onClose: () => void;
  total: number;
}

export const ChechoutModal = ({ open, onClose, total }: ChechoutModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogTitle>Thank you for your order!</DialogTitle>
      <DialogContent>
        <Typography>
          Total amount: ${total}
          <br />
          This is a demo app. No real payment will be processed.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
