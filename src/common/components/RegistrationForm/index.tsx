import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm, FieldValues } from "react-hook-form";
import { useMutation } from "react-query";
import { RegisterApi } from "../../../services/api";
import { ApiError, CustomerCreateDto } from "../../../services/api/types";
import FormInput from "../FormInput";
import ProgressButton, { ProgressButtonStatus } from "../ProgressButton";

interface Inputs extends FieldValues {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegistrationForm() {
  const [status, setStatus] = React.useState<ProgressButtonStatus>("idling");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: "onBlur" });

  const mutation = useMutation((data: CustomerCreateDto) => RegisterApi(data), {
    onSuccess: () => {
      // Todo redirection based on role
      setTimeout(() => {
        setStatus("error");
      }, 2000);
    },
    onError: (error: ApiError) => {
      // Todo process error
      setStatus("error");
    },
    onSettled: () => {
      setTimeout(() => {
        setStatus("idling");
      }, 500);
    },
  });

  const submit = (data: CustomerCreateDto) => {
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
        label="Nom*"
        name="lastname"
        rules={{
          required: "This is a required field",
          minLength: { value: 2, message: "Trop court" },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Prénom*"
        name="firstname"
        rules={{
          required: "This is a required field",
          minLength: { value: 2, message: "Trop court" },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Téléphone*"
        name="phone"
        rules={{
          required: "This is a required field",
          pattern: {
            value: /^0[6-7][0-9]{8}$/,
            message: "PhoneNumber is invalid. Example: '0612345678'.",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Adresse mail*"
        name="email"
        rules={{
          required: "This is a required field",
          pattern: {
            value:
              /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,20}$/,
            message:
              "Email is invalid. It should be lowercase email format. Example: example@example.com.",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Mot de passe*"
        name="password"
        type="password"
        rules={{
          required: "This is a required field",
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/,
            message:
              "Password is invalid. Must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 special character and 1 number",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Confirmation du mot de passe*"
        name="passwordConfirm"
        type="password"
        rules={{
          required: "This is a required field",
          pattern: {
            value:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/,
            message:
              "Password is invalid. Must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 special character and 1 number",
          },
        }}
      />
      <ProgressButton type="submit" label="Envoyer" status={status} />
    </Box>
  );
}
