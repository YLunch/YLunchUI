import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { ProductReadDto } from "../../../models/Product";
import {
  addProductToShoppingCart,
  clearShoppingCart,
  getShoppingCart,
  substractProductFromShoppingCart,
} from "../../services/shoppingCart";
import { CartItem } from "../../services/shoppingCart/CartItem.class";
import ShoppingItem from "./ShoppingItem";

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState<CartItem[]>(
    getShoppingCart()
  );

  const p = {
    id: "a00000e0-aaa0-000a-0000-00e00aa00e00",
    restaurantId: "a00000e0-aaa0-000a-0000-00e00aa00e00",
    name: "my product",
    description: "my ingredients",
    price: 9.8,
    quantity: 3,
    isActive: true,
    productType: 0,
    creationDateTime: "2021-12-31T00:00:00.000000",
    expirationDateTime: "2021-12-31T00:00:00.000000",
    image: "data:image/png;base64,iVBORw0KGgoAAA...",
    allergens: [
      {
        id: "a00000e0-aaa0-000a-0000-00e00aa00e00",
        name: "gluten",
      },
    ],
    productTags: [
      {
        id: "a00000e0-aaa0-000a-0000-00e00aa00e00",
        name: "pizza",
      },
    ],
  };

  const handleAdd = (product: ProductReadDto) => {
    addProductToShoppingCart(product);
    setShoppingCart(getShoppingCart());
  };

  const handleRemove = (product: ProductReadDto) => {
    substractProductFromShoppingCart(product);
    setShoppingCart(getShoppingCart());
  };

  const handleClear = () => {
    clearShoppingCart();
    setShoppingCart(getShoppingCart());
  };

  return (
    <>
      <Typography gutterBottom variant="h2" component="h1">Votre commande</Typography>
      <Box sx={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column"
        }}>
        {shoppingCart.length > 0 
        ? shoppingCart.map((item) => <ShoppingItem item={item} />)
        : <Typography variant="h4" sx={{margin: "auto"}} component="p">Votre panier est vide...</Typography>}
      </Box>
    </>
  );
}
