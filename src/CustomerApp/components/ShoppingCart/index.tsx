import useCart from "../../services/cart/useCart";
import { formatCart } from "../../services/cart/helpers";

export default function ShoppingCart() {

  const p = {
    id: "a00000e0-aaa0-000a-0000-00e00aa00e02",
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

  const { cart, addProduct, removeOneProduct } = useCart();

  return (
    <div>
      <button onClick={() => console.log(formatCart(cart))}>clear</button>
      <button onClick={() => removeOneProduct(p)}>remove</button>
      <button onClick={() => addProduct(p)}>add</button>
    </div>
  );
}
