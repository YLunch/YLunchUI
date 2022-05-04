import { Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useCurrentUser from "../../../common/hooks/useCurrentUser";
import LoggedOutSection from "./components/LoggedOutSection";
import LoggedInSection from "./components/LoggedInSection";
import logo from "./ylunch-logo.png";
import React from "react";
import { getCurrentUserApi } from "../../../common/services/api/authentication";
import { getLocalStorageItem } from "../../../common/services/localStorage";
import Cart from "../Cart";

export default function Header() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      getLocalStorageItem("accessToken") &&
      getLocalStorageItem("refreshToken")
    ) {
      getCurrentUserApi().then((res) => {
        setCurrentUser(res);
      });
    }
  }, [setCurrentUser]);

  return (
    <Box
      sx={{
        boxShadow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      paddingX={2}
      component={"header"}
    >
      <Link to="/">
        <Box
          component={"img"}
          sx={{ height: "50px" }}
          src={logo}
          alt="Logo Ylunch"
        />
      </Link>

      <Box marginRight={1}>
        <Button sx={{ marginRight: "5px" }} onClick={() => navigate("cart")}>
          Panier
        </Button>
      </Box>
      {currentUser ? <LoggedInSection /> : <LoggedOutSection />}
    </Box>
  );
}
