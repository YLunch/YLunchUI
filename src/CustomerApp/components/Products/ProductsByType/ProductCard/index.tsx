import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ProductReadDto } from "../../../../../models/Product";
import imgdefault from "./img-product.png";

type Props = {
  product: ProductReadDto;
};

export default function ProductCard({ product }: Props) {
  const { name, image, description, price, allergens } = product;

  return (
    <Card>
      <CardMedia
        component="img"
        src={image !== null ? image : imgdefault}
        alt="icone ynov"
        height="140"
        sx={{
          objectFit: "contain",
        }}
      />
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography mb={2} variant="subtitle2" component="div">
          {name}
          <Typography variant="body2">{description}</Typography>
          {allergens.map((allergen) => (
            <Typography key={allergen.id}>{allergen.name}</Typography>
          ))}
        </Typography>
        <Typography variant="subtitle2" component="p">
          {price}
        </Typography>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Button variant="contained" size="small" sx={{ textTransform: "none" }}>
          {" "}
          Réserver
        </Button>
      </CardActions>
    </Card>
  );
}
