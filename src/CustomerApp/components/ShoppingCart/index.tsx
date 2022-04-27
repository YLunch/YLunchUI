import { useState } from "react";
import { useQuery } from "react-query";
import { getProductsByIds } from "../../../services/api/product";
import { formatCart } from "../../services/cart/helpers";
import { CartItem } from "../../services/cart/types";
import useCart from "../../services/cart/useCart";

export default function ShoppingCart() {
  const {
    cart,
    addProduct,
    removeProduct,
    removeAllProducts,
    clear,
    restaurantId,
  } = useCart("a00000e0-aaa0-000a-0000-00e00aa00e00");

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useQuery("products", () => getProductsByIds(cart.productIds, restaurantId), {
    onSuccess: (response) => {
      const items = formatCart(cart.productIds, response);
      setCartItems(items);
    },
  });

  console.log(cartItems);

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

  return (
    <div>
      <button onClick={() => clear()}>clear</button>
      <button onClick={() => removeProduct(p)}>remove</button>
      <button onClick={() => addProduct(p)}>add</button>
    </div>
  );
}
