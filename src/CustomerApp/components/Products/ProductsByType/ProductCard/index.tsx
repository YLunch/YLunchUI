import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import {AllergenReadDto, ProductReadDto} from "../../../../../models/Product";
import React from "react";
import imgdefault from "./img-product.png";


type Props = {
  product: ProductReadDto;
};

export default function ProductCard({ product}: Props) {

  const { name, image, description, price, allergens} = product;

  // @ts-ignore
  return (
    <Card>
        <CardMedia component="img"  src={image!==null ? image : imgdefault} alt="icone ynov" height="140"/>
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
