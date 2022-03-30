import { ProductReadDto, ProductType } from "../../../../models/Product";
import Product from "../Product";

type Props = {
  productType: ProductType;
  products: ProductReadDto[];
};

export default function ProductsByType({ productType, products }: Props) {
  return (
    <div>
      <p>section: {productType}</p>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
