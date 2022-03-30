import { ProductReadDto } from "../../../../models/Product";

type Props = {
  product: ProductReadDto;
};

export default function Product({ product }: Props) {
  return <div>{product.name}</div>;
}
