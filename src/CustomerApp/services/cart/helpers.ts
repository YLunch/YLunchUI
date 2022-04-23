import { Cart, CartItem } from "./types";

export const formatCart = (cart: Cart): CartItem[] => {
  return cart.reduce((items: CartItem[], id) => {
    const found = items.find((item) => item.id === id);
    if (found) {
      found.qty++;
      return items;
    }
    return [{ id: id, qty: 1 }, ...items];
  }, []);
};
