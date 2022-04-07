import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../common/components/FormInput";
import ProgressButton, {
  ProgressButtonStatus,
} from "../../../../common/components/ProgressButton";
import { ynovEmailRegExp } from "../../../../common/constants/regexps";
import {
  progressButtonErrorRecoveryTimeout,
  progressButtonSuccessRecoveryTimeout,
} from "../../../../common/constants/timeouts";
import useCurrentUser from "../../../../common/hooks/useCurrentUser";
import { LoginRequestDto } from "../../../../common/models/Authentication";
import { ApiError } from "../../../../common/models/Common";
import {
  getCurrentUserApi,
  loginApi,
} from "../../../../common/services/api/authentication";

interface Inputs extends FieldValues {
  email: string;
  password: string;
}

export default function AddRestaurantForm() {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState<ProgressButtonStatus>("idling");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: "onBlur" });
  const { setCurrentUser } = useCurrentUser();

  const mutation = useMutation((data: LoginRequestDto) => loginApi(data), {
    onSuccess: async () => {
      setCurrentUser(await getCurrentUserApi());
      setStatus("success");
      setTimeout(async () => {
        setStatus("idling");
        navigate("/customer/restaurants");
      }, progressButtonSuccessRecoveryTimeout);
    },
    onError: (_: ApiError) => {
      setCurrentUser(undefined);
      setStatus("error");
      setTimeout(() => {
        setStatus("idling");
      }, progressButtonErrorRecoveryTimeout);
    },
  });

  const submit = (data: LoginRequestDto) => {
    setStatus("loading");
    mutation.mutate(data);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", paddingY: 2 }}
      component={"form"}
      onSubmit={handleSubmit((data) => submit(data))}
    >
      <Typography
        variant="caption"
        sx={{ marginBottom: 2 }}
        textAlign={"right"}
      >
        Champ obligatoire*
      </Typography>
      <FormInput
        register={register}
        errors={errors}
        label="nom du restaurant *"
        name="name"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Selectionner une image*"
        name="img"
        type="file"
        rules={{
          required: "Ce champs est requis",
        }}
      />
      <ProgressButton type="submit" label="Envoyer" status={status} />
    </Box>
  );
}
