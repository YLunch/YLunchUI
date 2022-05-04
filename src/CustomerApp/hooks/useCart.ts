import React from "react";
import { useMutation } from "react-query";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../common/services/localStorage";
import { ProductReadDto } from "../../models/Product";
import { getProductsApi } from "../services/api/products";

export type CartItem = {
  product: ProductReadDto;
  quantity: number;
};

type Cart = {
  restaurantId: string;
  items: CartItem[];
};

const initialCart: Cart = { restaurantId: "", items: [] };

function getCartFromLocalStorage(): Cart {
  const cart = getLocalStorageItem("cart");
  return cart ? JSON.parse(cart) : initialCart;
}

function useCart() {
  const [cart, setCart] = React.useState<Cart>(() => getCartFromLocalStorage());
  const mutation = useMutation(
    "cart",
    () => {
      const cart = getCartFromLocalStorage();
      return getProductsApi({
        restaurantId: cart.restaurantId,
        productIds: cart.items.map((cartItem) => cartItem.product.id),
        isAvailable: true,
      });
    },
    {
      onSuccess: (response) => {
        const cart: Cart = {
          restaurantId: response[0].restaurantId,
          items: getCartFromLocalStorage().items.filter((item) =>
            response.map((product) => product.id).includes(item.product.id)
          ),
        };
        setLocalStorageItem("cart", JSON.stringify(cart));
        setCart(cart);
      },
    }
  );

  function addProduct(product: ProductReadDto) {
    const cartFromLocalStorage = getCartFromLocalStorage();
    const cartItemOfProduct = cartFromLocalStorage.items.find(
      (item) =>
        item.product.id === product.id &&
        cartFromLocalStorage.restaurantId === product.restaurantId
    );
    let newCart: Cart;
    if (!cartItemOfProduct) {
      newCart = {
        restaurantId: product.restaurantId,
        items: [...cartFromLocalStorage.items, { product, quantity: 1 }],
      };
    } else {
      newCart = {
        ...cartFromLocalStorage,
        items: cartFromLocalStorage.items.map((item) => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      };
    }
    setLocalStorageItem("cart", JSON.stringify(newCart));

    mutation.mutateAsync();
  }

  // function removeProduct(product: ProductReadDto) {
  //   return getCartFromLocalStorage().filter((cartProduct) => {
  //     let notFound = true;
  //     if (cartProduct.product.id === product.id && notFound) {
  //       notFound = false;
  //       return false;
  //     }
  //     return true;
  //   });
  // }

  // function removeProductGroup(product: ProductReadDto) {
  //   return getCartFromLocalStorage().filter(
  //     (cartProduct) => cartProduct.product.id !== product.id
  //   );
  // }

  function clear() {
    setLocalStorageItem("cart", JSON.stringify(initialCart));
    setCart(initialCart);
  }

  // useQuery(
  //   "cart",
  //   () => {
  //     const products = getProducts();
  //     return getProductsApi(
  //       products[0].restaurantId,
  //       getProducts().map((product) => product.id)
  //     );
  //   },
  //   {
  //     onSuccess: (response) => {
  //       // setCart(response);
  //     },
  //   }
  // );

  return {
    cart,
    addProduct,
    // removeProduct,
    // removeProductGroup,
    clear,
  };
}

export default useCart;
