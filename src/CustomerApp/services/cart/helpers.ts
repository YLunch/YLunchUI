import { ProductReadDto } from "../../../models/Product";
import { Cart, CartItem } from "./types";

// export const formatCart = (cart: Cart): CartItem[] => {
//   return cart.reduce((items: CartItem[], id) => {
//     const found = items.find((item) => item.id === id);
//     if (found) {
//       found.qty++;
//       return items;
//     }
//     return [{ id: id, qty: 1 }, ...items];
//   }, []);
// };

export const formatCart = (
  productIds: string[],
  products: ProductReadDto[]
): CartItem[] => {
  return productIds.reduce((items: CartItem[], productId) => {
    const product: ProductReadDto | undefined = products.find(
      (p) => p.id === productId
    );
    if (!product) return items;

    const found = items.find((item) => item.id === productId);
    if (found) {
      found.qty++;
      return items;
    }
    return [
      ...items,
      { id: product.id, name: product.name, price: product.price, qty: 1 },
    ];
  }, []);
};
