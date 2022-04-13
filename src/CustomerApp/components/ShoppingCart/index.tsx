import { useState } from "react";
import { ProductReadDto } from "../../../models/Product";
import {
  addProductToShoppingCart,
  clearShoppingCart,
  getShoppingCart,
  removeProductFromShoppingCart,
} from "../../services/shoppingCart";
import { ShoppingCartType } from "../../services/shoppingCart/types";

export default function ShoppingCart() {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartType>(
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
    removeProductFromShoppingCart(product);
    setShoppingCart(getShoppingCart());
  };

  const handleClear = () => {
    clearShoppingCart();
    setShoppingCart(getShoppingCart());
  };

  return (
    <div>
      <button onClick={() => handleClear()}>clear</button>
      <button onClick={() => handleRemove(p)}>remove</button>
      {shoppingCart.length}
      <button onClick={() => handleAdd(p)}>add</button>
    </div>
  );
}
