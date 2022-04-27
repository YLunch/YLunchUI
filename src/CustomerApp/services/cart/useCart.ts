import { ProductReadDto } from "../../../models/Product";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../common/services/localStorage";
import { Cart } from "./types";
import { useEffect, useState } from "react";

const useCart = (restaurantId: string) => {
  const emptyCart: Cart = { productIds: [], restaurantId };

  const init = (): Cart => {
    const found = getLocalStorageItem("cart");
    return found ? JSON.parse(found) : emptyCart;
  };

  const [cart, setCart] = useState(init());

  const addProduct = (product: ProductReadDto) => {
    const productIds = [...cart.productIds, product.id];
    const newCart = { productIds, restaurantId };
    setCart(newCart);
  };

  const removeProduct = (product: ProductReadDto) => {
    const productIds = [...cart.productIds];
    const index = productIds.indexOf(product.id);
    productIds.splice(index, 1);
    const newCart = { productIds, restaurantId };
    setCart(newCart);
  };

  const removeAllProducts = (product: ProductReadDto) => {
    const productIds = cart.productIds.filter((item) => item !== product.id);
    const newCart = { productIds, restaurantId };
    setCart(newCart);
  };

  const clear = () => {
    setCart(emptyCart);
  };

  const pesist = () => {
    setLocalStorageItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    pesist();
  }, [cart]);

  return {
    cart,
    addProduct,
    removeProduct,
    removeAllProducts,
    clear,
    restaurantId,
  };
};

export default useCart;
