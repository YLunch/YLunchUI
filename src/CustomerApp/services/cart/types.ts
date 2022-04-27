export type Cart = { productIds: string[]; restaurantId: string };

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};
