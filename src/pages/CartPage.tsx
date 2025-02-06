import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { Layout } from "../components/common/Layout";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import { removeFromCart } from "../store/slices/cartSlice";
import { useState } from "react";
import { CartItem } from "../types/cart.types";
import { DeleteCartItemModal } from "../components/DeleteCartItemModal";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ChechoutModal } from "../components/ChechoutModal";

export const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.flight.price,
    0
  );

  const handleDelete = () => {
    if (itemToDelete) {
      dispatch(
        removeFromCart({
          flightId: itemToDelete.flight.id,
          seatId: itemToDelete.seat.id,
        })
      );
      setItemToDelete(null);
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" mb={3}>
          Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <>
            {cartItems.map((item) => (
              <Card
                key={`${item.flight.id}-${item.seat.id}`}
                sx={{ mb: 2, p: 2 }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">
                      <LocalAirportIcon
                        sx={{ mr: 1, verticalAlign: "bottom" }}
                      />
                      {item.flight.airline}
                    </Typography>
                    <Box display="flex">
                      <Typography>{item.flight.from}</Typography>
                      <ArrowForwardIcon />
                      <Typography>{item.flight.to}</Typography>
                    </Box>
                    <Typography>
                      Row {item.seat.row}, Seat {item.seat.number}
                    </Typography>
                    <Typography color="primary">
                      ${item.flight.price}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => setItemToDelete(item)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            ))}

            <Box
              sx={{ mt: 3, p: 2, bgcolor: "background.paper", borderRadius: 1 }}
            >
              <Typography variant="h5">Total: ${totalPrice}</Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => setShowCheckoutModal(true)}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>

      <ChechoutModal
        open={showCheckoutModal} 
        onClose={() => setShowCheckoutModal(false)}
        total={totalPrice}
      />

      {itemToDelete && (
        <DeleteCartItemModal
          open={!!itemToDelete}
          onClose={() => setItemToDelete(null)}
          onConfirm={handleDelete}
          item={itemToDelete}
        />
      )}
    </Layout>
  );
};
