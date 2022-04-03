import { ProductReadDto } from "../../../../../models/Product";

type Props = {
  product: ProductReadDto;
};

export default function ProductCard({ product }: Props) {
  return <div>{product.name}</div>;
}
