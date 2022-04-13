import { ProductReadDto } from "../../../models/Product";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../common/services/localStorage";
import { ShoppingCartType } from "./types";

const emptyShoppingCart: ShoppingCartType = [];

const pesistShoppingCart = (shoppingCart: ShoppingCartType) => {
  setLocalStorageItem("shoppingCart", JSON.stringify(shoppingCart));
};

export function getShoppingCart(): ShoppingCartType {
  const found = getLocalStorageItem("shoppingCart");
  return found ? JSON.parse(found) : emptyShoppingCart;
}

export function addProductToShoppingCart(product: ProductReadDto) {
  const shoppingCart = getShoppingCart();
  shoppingCart.push(product.id);
  pesistShoppingCart(shoppingCart);
}

export function removeProductFromShoppingCart(product: ProductReadDto) {
  const shoppingCart = getShoppingCart();
  const productIndex = shoppingCart.indexOf(product.id);
  if (productIndex > -1) shoppingCart.splice(productIndex, 1);
  pesistShoppingCart(shoppingCart);
}

export function clearShoppingCart() {
  pesistShoppingCart(emptyShoppingCart);
}
