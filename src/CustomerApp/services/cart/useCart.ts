import { ProductReadDto } from "../../../models/Product";
import { getLocalStorageItem, setLocalStorageItem } from "../../../common/services/localStorage";
import { Cart } from "./types";
import { useEffect, useState } from "react";

const useCart = () => {
  const emptyCart: Cart = [];

  const init = (): Cart => {
    const found = getLocalStorageItem("cart");
    return found ? JSON.parse(found) : emptyCart;
  };

  const [cart, setCart] = useState(init());

  const addProduct = (product: ProductReadDto) => {
    const newCart = [...cart, product.id];
    setCart(newCart);
  };

  const removeOneProduct = (product: ProductReadDto) => {
    const newCart = [...cart];
    const index = newCart.indexOf(product.id);
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const removeAllProduct = (product: ProductReadDto) => {
    const newCart = cart.filter((item) => item !== product.id);
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

  return { cart, addProduct, removeOneProduct, removeAllProduct, clear };
};

export default useCart;
