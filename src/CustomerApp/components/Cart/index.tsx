import { Button, Typography } from "@mui/material";
import useCart from "../../hooks/useCart";
import CartItem from "./CartItem";
import { GoBackButton } from "../../../common/components/GoBackButton";

export default function Cart() {
  const { clear, cart, addProduct } = useCart();

  const totalPrice = cart.items.reduce<number>((acc, item) => {
    acc += item.product.price * item.quantity;
    return acc;
  }, 0);

  return (
    <div>
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
      <Button variant="outlined" onClick={() => clear()}>
        clear
      </Button>
    </div>
  );
}
