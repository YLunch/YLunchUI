import { ProductReadDto } from "../../../../models/Product";
import Product from "../Product";

type Props = {
  title: string;
  products: ProductReadDto[];
};

export default function ProductsByType({ title, products }: Props) {
  return (
    <div>
      <p>{title}</p>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
