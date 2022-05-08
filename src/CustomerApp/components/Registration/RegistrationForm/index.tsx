import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../common/components/FormInput";
import ProgressButton from "../../../../common/components/ProgressButton";
import {
  firstOrLastNameRegExp,
  passwordRegExp,
  phoneNumberRegExp,
  ynovEmailRegExp,
} from "../../../../common/constants/regexps";
import useAsyncAction from "../../../../common/hooks/useAsyncAction";
import { ApiError } from "../../../../common/models/Common";
import { translateApiErrors } from "../../../../common/translations/apiErrors";
import { CustomerCreateDto } from "../../../models/Customer";
import { addCustomerApi } from "../../../services/api/customers";

interface Inputs extends FieldValues {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegistrationForm() {
  const navigate = useNavigate();
  const {
    actAsync,
    status,
    error: addCustomerApiError,
  } = useAsyncAction<ApiError>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<Inputs>({ mode: "onBlur" });

  const mutation = useMutation(
    "users",
    (data: CustomerCreateDto) => addCustomerApi(data),
    {
      onError: (error: ApiError) => {
        throw error;
      },
    }
  );

  async function submit(data: CustomerCreateDto) {
    await actAsync({
      asyncAction: async () => await mutation.mutateAsync(data),
      onSuccessTimeoutAsync: async () =>
        navigate("/customer/login", {
          state: {
            isFromRegistration: true,
            message:
              "Votre compte a bien été créé, veuillez-vous authentifier avec votre login/mot de passe",
          },
        }),
    });
  }

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
        label="Prénom*"
        name="firstname"
        // Todo remove initialValue
        initialValue="firstname"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: firstOrLastNameRegExp,
            message:
              "Votre prénom ne doit contenir que des caractères alphabétiques. Exemple : Henri",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Nom*"
        name="lastname"
        // Todo remove initialValue
        initialValue="lastname"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: firstOrLastNameRegExp,
            message:
              "Votre nom ne doit contenir que des caractères alphabétiques. Exemple : Dupont",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Téléphone*"
        name="phoneNumber"
        // Todo remove initialValue
        initialValue="0612345678"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: phoneNumberRegExp,
            message:
              "Le numero de téléphone doit respecter le format : '0612345678'",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Adresse mail*"
        name="email"
        // Todo remove initialValue
        initialValue="firstname.lastname@ynov.com"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Votre email doit respecter le format : prenom.nom@ynov.com",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Mot de passe*"
        name="password"
        type="password"
        // Todo remove initialValue
        initialValue={"Password1234."}
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: passwordRegExp,
            message:
              "Votre mot de passe doit contenir au moins 8 caractères, 1 lettre miniscule, 1 lettre majuscule, 1 caractère spécial et 1 chiffre",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Confirmation du mot de passe*"
        name="passwordConfirm"
        type="password"
        // Todo remove initialValue
        initialValue={"Password1234."}
        rules={{
          required: "Ce champs est requis",
          validate: {
            match: (value: string) =>
              value === getValues().password ||
              "Les mots doivent être identiques",
          },
        }}
      />
      <ProgressButton
        type="submit"
        label="S'enregistrer"
        status={status}
        sx={{ marginTop: 3 }}
      />
      {addCustomerApiError && (
        <Typography color="error">
          {translateApiErrors(addCustomerApiError, "Utilisateur")}
        </Typography>
      )}
    </Box>
  );
}
