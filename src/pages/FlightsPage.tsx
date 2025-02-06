import { useEffect, useState } from "react";
import { Flight } from "../types/flight.types";
import { getFlights } from "../services/api";
import { Layout } from "../components/common/Layout";
import {
  Alert,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Loading } from "../components/common/Loading";
import { FlightCard } from "../components/FlightCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type SortOption = "price-asc" | "price-desc" | "departure";

export const FlightsPage = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("departure");
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  const favorites = useSelector((state: RootState) => state.flights.favorites);

  useEffect(() => {
    getFlights()
      .then(setFlights)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const getFilteredAndSortedFlights = (flightList: Flight[]) => {
    return flightList
      .filter(
        (flight) =>
          flight.airline.toLowerCase().includes(search.toLowerCase()) ||
          flight.from.toLowerCase().includes(search.toLowerCase()) ||
          flight.to.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "departure":
            return (
              new Date(a.departureTime).getTime() -
              new Date(b.departureTime).getTime()
            );
          default:
            return 0;
        }
      });
  };

  const displayedFlights = getFilteredAndSortedFlights(
    activeTab === "favorites"
      ? flights.filter((flight) => favorites.includes(flight.id))
      : flights
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Layout>
      <Box mb={4}>
        <Typography variant="h4" mb={3}>
          Available Flights
        </Typography>

        <Box display="flex" gap={2}>
          <TextField
            label="Search flights"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <MenuItem value="departure">Departure Time</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
          <Tab value="all" label="All flights" />
          <Tab value="favorites" label={`Favorites ${favorites.length}`} />
        </Tabs>
      </Box>
      <Grid container spacing={3}>
        {displayedFlights.map((flight) => (
          <Grid item xs={12} sm={6} md={4} key={flight.id}>
            <FlightCard
              flight={flight}
              isFavorite={favorites.includes(flight.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};
