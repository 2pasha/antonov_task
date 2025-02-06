import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Fligth } from "../types/flight.types";
import { Seat } from "../types/seat.types";
import { getFlightsById } from "../services/api";
import { addToCart } from "../store/slices/cartSlice";
import { Loading } from "../components/common/Loading";
import { Alert, Box, Button, Card, Divider, Typography } from "@mui/material";
import { Layout } from "../components/common/Layout";
import { EventSeat } from "@mui/icons-material";
import { SeatGrid } from "../components/SeatGrid";
import { generateSeats } from "../utils/seatUtils";
import { SeatBookingModal } from '../components/SeatBookingModal';

export const FlightDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [flight, setFlight] = useState<Fligth | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  useEffect(() => {
    if (id) {
      getFlightsById(id)
        .then((res) => {
          setFlight(res);
          setSeats(generateSeats(res));
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setError("ID is not provided");
    }
  }, [id]);

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeat(seat);
  }

  const handleConfirmBooking = () => {
    if (!flight || !selectedSeat) {
      return;
    }

    dispatch(addToCart({ flight, seat: selectedSeat }));

    setSeats((prevSeats) =>prevSeats.map((s) =>
        s.id === selectedSeat.id ? { ...s, status: "selected" } : s
    ));
    setSelectedSeat(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!flight) {
    return null;
  }

  return (
    <Layout>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" mb={2}>
          {flight.airline}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Typography variant="h6">{flight.from}</Typography>
            <Typography>
              {new Date(flight.departureTime).toLocaleString()}
            </Typography>
            <Typography>Terminal: {flight.terminal}</Typography>
            <Typography>Gate: {flight.gate}</Typography>
          </Box>
          <Box>
            <Typography variant="h6">{flight.to}</Typography>
            <Typography>
              {new Date(flight.arrivalTime).toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" mb={2}>
            Select Your Seat
          </Typography>
          <Box display="flex" gap={2} mb={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <EventSeat color="success" />
              <Typography>Available</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <EventSeat sx={{ color: "grey.500" }} />
              <Typography>Occupied</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <EventSeat color="primary" />
              <Typography>Selected</Typography>
            </Box>
          </Box>

          <SeatGrid seats={seats} onSeatSelect={handleSeatSelect} />
          {flight && selectedSeat && (
            <SeatBookingModal
              open={!!selectedSeat}
              onClose={() => setSelectedSeat(null)}
              onConfirm={handleConfirmBooking}
              flight={flight}
              seat={selectedSeat}
            />
          )}
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="h5">Price per seat: ${flight.price}</Typography>
          <Button variant="contained" onClick={() => navigate("/cart")}>
            View Cart
          </Button>
        </Box>
      </Card>
    </Layout>
  );
};
