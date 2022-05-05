import { Box, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RestaurantReadDto,OpeningTimeReadDto} from "../../../../common/models/Restaurant";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import OpeningTimes from "../OpeningTimes";
import classes from "./styles.module.scss";

type Props = {
  restaurant: RestaurantReadDto
};

export default function RestaurantCard({ restaurant }: Props) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`${restaurant.id}`);
  }

  return (
    <Box className={classes.wrapper} onClick={handleClick}>
      <Typography variant="h1" sx={{
        fontSize : "clamp(2rem, 5vw, 4rem)",
        margin : "2%"
      }}>{restaurant.name}</Typography>
      <div className={classes.openingswrapper}>
      <div className={classes.openings}>
        <p className={classes.hours}>Horaires  </p>
        <QueryBuilderIcon></QueryBuilderIcon> Restauration<OpeningTimes openingTimes={restaurant.placeOpeningTimes} />
        <HourglassBottomIcon></HourglassBottomIcon> Commandez<OpeningTimes openingTimes={restaurant.orderOpeningTimes} />
      </div>
      </div>
    </Box>
  );
}
