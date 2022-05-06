import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressButton, {
  ProgressButtonStatus,
} from "../../../../../common/components/ProgressButton";
import {
  progressButtonErrorRecoveryTimeout,
  progressButtonSuccessRecoveryTimeout,
} from "../../../../../common/constants/timeouts";
import useCurrentUser from "../../../../../common/hooks/useCurrentUser";
import { ApiError } from "../../../../../common/models/Common";
import { logoutApi } from "../../../../../common/services/api/authentication";
import { translateApiErrors } from "../../../../../common/services/api/translation";
import { removeLocalStorageItem } from "../../../../../common/services/localStorage";

export default function LoggedInSection() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [status, setStatus] = React.useState<ProgressButtonStatus>("idling");
  const [apiErrors, setApiErrors] = React.useState<ApiError>();
  const navigate = useNavigate();

  if (!currentUser) {
    return <></>;
  }

  const { email } = currentUser;

  async function handleLogout() {
    setStatus("loading");
    try {
      await logoutApi();
      setStatus("success");
      setTimeout(() => {
        setStatus("idling");
        removeLocalStorageItem("accessToken");
        removeLocalStorageItem("refreshToken");
        setCurrentUser(undefined);
      }, progressButtonSuccessRecoveryTimeout);
    } catch (error) {
      setApiErrors(error as ApiError);
      setStatus("error");
      setTimeout(() => {
        setStatus("idling");
        removeLocalStorageItem("accessToken");
        removeLocalStorageItem("refreshToken");
        setCurrentUser(undefined);
      }, progressButtonErrorRecoveryTimeout);
    }
  }

  return (
    <Box display="flex" alignItems="center">
      <Button sx={{ marginRight: 1 }} onClick={() => navigate("my-orders")}>
        Mes commandes
      </Button>
      <Typography variant="body1" marginRight={1}>
        {email}
      </Typography>

      <ProgressButton
        label="Déconnexion"
        status={status}
        onClick={handleLogout}
      />
      {apiErrors && (
        <Typography color="error">
          {translateApiErrors(apiErrors, "")}
        </Typography>
      )}
    </Box>
  );
}
