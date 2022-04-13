import {FormControl, Typography} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../common/components/FormInput";
import FormCheckBox from "../../../../common/components/FormCheckBox";
import FormSelect from "../../../../common/components/FormSelect";
import ProgressButton, {
  ProgressButtonStatus,
} from "../../../../common/components/ProgressButton";
import {firstOrLastNameRegExp,phoneNumberRegExp,standardEmailRegExp,ynovEmailRegExp} from "../../../../common/constants/regexps";
import {
  progressButtonErrorRecoveryTimeout,
  progressButtonSuccessRecoveryTimeout,
} from "../../../../common/constants/timeouts";
import useCurrentUser from "../../../../common/hooks/useCurrentUser";
import { LoginRequestDto } from "../../../../common/models/Authentication";
import { ApiError } from "../../../../common/models/Common";
import {getCurrentUserApi } from "../../../../common/services/api/authentication";
import FormInputFile from "../../../../common/components/FormInputFile";
import {RestaurantCreateDto} from "../../../models/Restaurant";
import {createRestaurant} from "../../../services/api/restaurantService";
import BasicDateTimePicker from "../../../../common/components/DatePicker";
import BasicDatePicker from "../../../../common/components/DatePicker";

interface Inputs extends FieldValues {
  name:string;
  phoneNumber: string;
  email: string;
  isOpen: boolean;
  isPublic: boolean;
  zipCode: string;
  country: string;
  city: string;
  streetNumber:string;
  streetName: string;
  addressExtraInformation: string;
  closingDates: [
    {
      closingDateTime: string;
    }
  ];
  placeOpeningTimes: [
    {
      dayOfWeek: number;
      OffsetInMinutes: number;
      DurationInMinutes: number;
    }
  ],
  orderOpeningTimes: [
    {
      dayOfWeek: number;
      OffsetInMinutes: number;
      DurationInMinutes: number;
    }
  ];
  base64Logo: string;
  base64Image: string ;

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

  const mutation = useMutation((data: RestaurantCreateDto) => createRestaurant(data), {
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

  const submit = (data: RestaurantCreateDto) => {
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
            value: firstOrLastNameRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
      />

      <FormInput
        register={register}
        errors={errors}
        label="numéro de téléphone  *"
        name="phoneNumber"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: phoneNumberRegExp,
            message:
              "Le numero de téléphone ne doit pas être null",
          },
        }}
      />

      <FormInput
        register={register}
        errors={errors}
        label="email du restaurant *"
        name="email"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: standardEmailRegExp,
            message:
              "L' email ne doit pas être null",
          },
        }}
      />


      <FormCheckBox
        register={register}
        name="isOpen"
        label="Ouvert "
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
      />

      <FormCheckBox
        register={register}
        name="isPublic"
        label="Public"
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
        label="Pays  *"
        name="country"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le pays ne doit pas être null",
          },
        }}
      />

      <FormInput
        register={register}
        errors={errors}
        label="ville  du restaurant *"
        name="city"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "La ville  ne doit pas être null",
          },
        }}
      />

      <FormInput
        register={register}
        errors={errors}
        label="numero de l'addres  *"
        name="streetNumber"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le numero de l'addres  ne doit pas être null",
          },
        }}
      />

      <FormInput
        register={register}
        errors={errors}
        label="adresse  *"
        name="streetName"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "L ' adresse   ne doit pas être null",
          },
        }}
      />

      <FormInput
        register={register}
        errors={errors}
        label="complément d'adresse  *"
        name="addressExtraInformation"
        rules={{
          required: "Ce champs est requis",
        }}
      />

      <FormInputFile
        register={register}
        errors={errors}
        label="Selectionner une image*"
        name="img"
        type="file"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
      />


      <FormInputFile
        register={register}
        errors={errors}
        label="Selectionner un logo *"
        name="logo"
        type="file"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
      />

      <p>placeOpeningTimes</p>
      <FormSelect
        register={register}
        label="Jours  *"
        name="day"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
        value=""
        options={[
          { value: "1", label: "lundi" },
          { value: "2", label: "mardi" },
          { value: "3", label: "mercredi" },
          { value: "4", label: "jeudi" },
          { value: "5", label: "vendredi" },
          { value: "6", label: "samedi" },
          { value: "7", label: "dimanche" },
        ]}

        />


      <FormSelect
        register={register}
        label="heure   *"
        name="hours "
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
        value=""
        options = {[
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
          { value: "6", label: "6" },
          { value: "7", label: "7" },
          { value: "8", label: "8" },
          { value: "9", label: "9" },
          { value: "10", label: "10" },
          { value: "11", label: "11" },
          { value: "12", label: "12" },
          { value: "13", label: "13" },
          { value: "14", label: "14" },
          { value: "15", label: "15" },
          { value: "16", label: "16" },
          { value: "17", label: "17" },
          { value: "18", label: "18" },
          { value: "19", label: "19" },
          { value: "20", label: "20" },
          { value: "21", label: "21" },
          { value: "22", label: "22" },
          { value: "23", label: "23" },
          { value: "24", label: "24h" },
        ]}

      />


      <FormSelect
        register={register}
        label="minute   *"
        name="minutes"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
        value=""
        options = {[
          { value: "0", label: "0" },
          { value: "5", label: "5" },
          { value: "10", label: "10" },
          { value: "15", label: "15" },
          { value: "20", label: "20" },
          { value: "25", label: "25" },
          { value: "30", label: "30" },
          { value: "35", label: "35" },
          { value: "40", label: "40" },
          { value: "45", label: "45" },
          { value: "50", label: "50" },
          { value: "55", label: "55" },
        ]}

      />

      <p>orderOpeningTimes</p>
      <FormSelect
        register={register}
        label="Jours  *"
        name="day"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
        value=""
        options={[
          { value: "1", label: "lundi" },
          { value: "2", label: "mardi" },
          { value: "3", label: "mercredi" },
          { value: "4", label: "jeudi" },
          { value: "5", label: "vendredi" },
          { value: "6", label: "samedi" },
          { value: "7", label: "dimanche" },
        ]}

        />


      <FormSelect
        register={register}
        label="heure   *"
        name="hours "
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
        value=""
        options = {[
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
          { value: "6", label: "6" },
          { value: "7", label: "7" },
          { value: "8", label: "8" },
          { value: "9", label: "9" },
          { value: "10", label: "10" },
          { value: "11", label: "11" },
          { value: "12", label: "12" },
          { value: "13", label: "13" },
          { value: "14", label: "14" },
          { value: "15", label: "15" },
          { value: "16", label: "16" },
          { value: "17", label: "17" },
          { value: "18", label: "18" },
          { value: "19", label: "19" },
          { value: "20", label: "20" },
          { value: "21", label: "21" },
          { value: "22", label: "22" },
          { value: "23", label: "23" },
          { value: "24", label: "24h" },
        ]}

      />


      <FormSelect
        register={register}
        label="minute   *"
        name="minutes"
        rules={{
          required: "Ce champs est requis",
          pattern: {
            value: ynovEmailRegExp,
            message:
              "Le nom ne doit pas être null",
          },
        }}
        value=""
        options = {[
          { value: "0", label: "0" },
          { value: "5", label: "5" },
          { value: "10", label: "10" },
          { value: "15", label: "15" },
          { value: "20", label: "20" },
          { value: "25", label: "25" },
          { value: "30", label: "30" },
          { value: "35", label: "35" },
          { value: "40", label: "40" },
          { value: "45", label: "45" },
          { value: "50", label: "50" },
          { value: "55", label: "55" },
        ]}

      />


      <BasicDatePicker />

      <ProgressButton type="submit" label="Envoyer" status={status} />
    </Box>
  );
}
