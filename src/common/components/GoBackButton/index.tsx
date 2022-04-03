import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function GoBackButton() {
  const navigate = useNavigate();
  return (
    <Button variant="outlined" onClick={() => navigate(-1)}>
      Retour
    </Button>
  );
}
