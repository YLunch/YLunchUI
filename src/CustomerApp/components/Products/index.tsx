import { useQuery } from "react-query";
import React from "react";
import { ProductReadDto, ProductType } from "../../../models/Product";
import { getProducts } from "../../../services/api/product";
import ProductsByType from "./ProductsByType";

type Props = {
  restaurantId: string;
};

export default function Products({ restaurantId }: Props) {
  const [products, setProducts] = React.useState<ProductReadDto[]>([]);
  useQuery("products", () => getProducts(restaurantId), {
    onSuccess: (response) => {
      console.log(response);
      setProducts(response);
    },
  });

  function getProductsByType(productType: ProductType) {
    return products.filter((product) => product.productType === productType);
  }

  return (
    <div>
      <ProductsByType
        productType={1}
        products={getProductsByType(ProductType.Main)}
      />
    </div>
  );
}
