import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ProductReadDto, ProductType } from "../../../models/Product";
import { getProducts } from "../../../services/api/product";
import ProductsByType from "./ProductsByType";

export default function Products() {
  const urlParams = useParams();
  const [products, setProducts] = React.useState<ProductReadDto[]>([]);

  const restaurantId = urlParams.restaurantId;

  useQuery("products", () => getProducts(restaurantId!), {
    onSuccess: (response) => {
      console.log(response);
      setProducts(response);
    },
  });

  if (!restaurantId) {
    return <></>;
  }

  const classifiedProductsByType: Record<
    "starter" | "main" | "dessert" | "drink" | "menu" | "daily" | "other",
    ProductReadDto[]
  > = {
    starter: products.filter(
      (product) => product.productType === ProductType.Starter
    ),
    main: products.filter(
      (product) => product.productType === ProductType.Main
    ),
    dessert: products.filter(
      (product) => product.productType === ProductType.Dessert
    ),
    drink: products.filter(
      (product) => product.productType === ProductType.Drink
    ),
    menu: products.filter(
      (product) => product.productType === ProductType.Menu
    ),
    daily: products.filter(
      (product) => product.productType === ProductType.Daily
    ),
    other: products.filter(
      (product) => product.productType === ProductType.Other
    ),
  };

  return (
    <div>
      <p>Products works</p>
      {classifiedProductsByType.starter.length > 0 && (
        <ProductsByType
          title="Entrées"
          products={classifiedProductsByType.starter}
        />
      )}
      {classifiedProductsByType.main.length > 0 && (
        <ProductsByType
          title="Plats"
          products={classifiedProductsByType.main}
        />
      )}
      {classifiedProductsByType.dessert.length > 0 && (
        <ProductsByType
          title="Desserts"
          products={classifiedProductsByType.dessert}
        />
      )}
      {classifiedProductsByType.drink.length > 0 && (
        <ProductsByType
          title="Boissons"
          products={classifiedProductsByType.drink}
        />
      )}
      {classifiedProductsByType.menu.length > 0 && (
        <ProductsByType
          title="Menus"
          products={classifiedProductsByType.menu}
        />
      )}
      {classifiedProductsByType.daily.length > 0 && (
        <ProductsByType
          title="Plats du jour"
          products={classifiedProductsByType.daily}
        />
      )}
      {classifiedProductsByType.other.length > 0 && (
        <ProductsByType
          title="Autres"
          products={classifiedProductsByType.other}
        />
      )}
    </div>
  );
}