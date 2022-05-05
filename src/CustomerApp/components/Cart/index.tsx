import { Button, Typography } from "@mui/material";
import useCart from "../../hooks/useCart";
import CartItem from "./CartItem";
import { GoBackButton } from "../../../common/components/GoBackButton";
import { Box } from "@mui/system";
import { addOrderApi } from "../../services/api/orders";
import { addMinutes } from "date-fns";

export default function Cart() {
  const { clear, cart, addProduct } = useCart();

  const totalPrice = cart.items.reduce<number>((acc, item) => {
    acc += item.product.price * item.quantity;
    return acc;
  }, 0);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <GoBackButton />
      {cart.items.map((cartItem) => (
        <CartItem
          key={cartItem.product.id}
          product={cartItem.product}
          quantity={cartItem.quantity}
          addProduct={addProduct}
        />
      ))}
      {!!totalPrice && (
        <Typography>{`${totalPrice.toFixed(2)}`.padStart(2, "0")}</Typography>
      )}
      <Button
        sx={{ marginTop: "10px" }}
        variant="outlined"
        onClick={() => clear()}
      >
        Supprimer le panier
      </Button>
      <Button
        sx={{ marginTop: "10px" }}
        variant="outlined"
        onClick={async () =>
          await addOrderApi(cart.restaurantId, {
            productIds: cart.items.map((item) => item.product.id),
            customerComment: "",
            reservedForDateTime: addMinutes(new Date(), 1),
          })
        }
      >
        Confirmer la réservation
      </Button>
    </Box>
  );
}
