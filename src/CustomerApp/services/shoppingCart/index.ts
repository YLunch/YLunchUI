import { getLocalStorageItem, setLocalStorageItem } from "../../../common/services/localStorage";
import { CartItem } from "./CartItem.class";
import { Buyable } from "./buyable.interface";

const emptyShoppingCart: CartItem[] = [];

const findProductInShoppingCart = (product: Buyable): CartItem | undefined => {
  const shoppingCart = getShoppingCart();
  return shoppingCart.find((item) => item.id === product.id);
};

const pesistShoppingCart = (shoppingCart: CartItem[]) => {
  setLocalStorageItem("shoppingCart", JSON.stringify(shoppingCart));
  console.log(getShoppingCart());
};

const insertCartItem = (item: CartItem) => {
  const shoppingCart = getShoppingCart();
  shoppingCart.push(item);
  pesistShoppingCart(shoppingCart);
};

const updateCartItem = (item: CartItem, qty: number) => {
  const shoppingCart = getShoppingCart();
  item.qty = qty;
  pesistShoppingCart(shoppingCart);
};

const deleteCartItem = (item: CartItem) => {
  const shoppingCart = getShoppingCart();
  const productIndex = shoppingCart.indexOf(item);
  if (productIndex > -1) shoppingCart.splice(productIndex, 1);
  pesistShoppingCart(shoppingCart);
};

export function getShoppingCart(): CartItem[] {
  const found = getLocalStorageItem("shoppingCart");
  return found ? JSON.parse(found) : emptyShoppingCart;
}

export function addProductToShoppingCart(product: Buyable, qty: number = 1) {
  const item = findProductInShoppingCart(product);
  item === undefined
    ? insertCartItem(new CartItem(product.id, product.name, product.price, qty))
    : updateCartItem(item, item.qty + qty);
}

export function substractProductFromShoppingCart(product: Buyable, qty: number = 1) {
  const item = findProductInShoppingCart(product);
  if (item === undefined) return;
  item.qty - qty > 0 ? updateCartItem(item, item.qty - qty) : deleteCartItem(item);
}

export function clearShoppingCart() {
  pesistShoppingCart(emptyShoppingCart);
}
