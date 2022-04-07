import {Card, CardContent, Container, Typography} from "@mui/material";
import AddRestaurantForm from "./AddRestaurantForm";

export default function AddRestaurant() {

  return (
    <>
      <Typography gutterBottom variant="h2" component="h1">
        Ajouter votre restaurant
      </Typography>
      <Card>
        <Container maxWidth="md">
          <CardContent>
            <AddRestaurantForm />
          </CardContent>
        </Container>
      </Card>
    </>
  );


}








