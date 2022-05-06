import { Box, Typography } from "@mui/material";
import { OrderReadDto } from "../../../models/Order";

type Props = {
  order: OrderReadDto;
};

export default function ({ order }: Props) {
  console.log(order);

  return (
    <Box sx={{ diplay: "flex", flexDirection: "column" }}>
      <p>Order</p>
      <Typography>{order.currentOrderStatus.orderState.toString()}</Typography>
    </Box>
  );
}
