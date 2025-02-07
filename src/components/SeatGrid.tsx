import { Box, Grid, Grid2, IconButton, Tooltip, Typography } from '@mui/material';
import { Seat, SeatStatus } from '../types/seat.types';
import { EventSeat } from '@mui/icons-material';

interface SeatGridProps {
  seats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

export const SeatGrid = ({ seats, onSeatSelect }: SeatGridProps) => {
  const rows = seats.reduce(
    (acc, seat) => {
      if (!acc[seat.row]) {
        acc[seat.row] = [];
      }

      acc[seat.row].push(seat);

      return acc;
    },
    {} as Record<number, Seat[]>
  );

  const getStatusColor = (status: SeatStatus) => {
    switch (status) {
      case 'free':
        return 'success.main';
      case 'occupied':
        return 'grey.500';
      case 'selected':
        return 'primary.main';
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      {Object.entries(rows).map(([rowNum, rowSeats]) => (
        <Grid2 container spacing={1} key={rowNum} sx={{ mb: 1 }}>
          <Grid item xs={1}>
            <Typography>{rowNum}</Typography>
          </Grid>
          <Grid item xs={11}>
            <Grid container spacing={1}>
              {rowSeats.map((seat) => (
                <Grid item key={seat.id}>
                  <Tooltip title={`Row ${seat.row}, Seat ${seat.number}`}>
                    <span>
                      <IconButton
                        onClick={() => seat.status === 'free' && onSeatSelect(seat)}
                        disabled={seat.status === 'occupied'}
                        sx={{ color: getStatusColor(seat.status) }}
                      >
                        <EventSeat />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid2>
      ))}
    </Box>
  );
};
