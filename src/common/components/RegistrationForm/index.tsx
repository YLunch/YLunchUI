import { Box } from "@mui/system";
import { useForm, FieldValues } from "react-hook-form";
import FormInput from "../FormInput";

interface Inputs extends FieldValues {
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegistrationForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({ mode: "onBlur" });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      component={"form"}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <FormInput
        register={register}
        errors={errors}
        label="Nom d'utilisateur"
        name="username"
        rules={{
          required: "This is a required field",
          minLength: { value: 2, message: "Trop court" },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Nom"
        name="lastname"
        rules={{
          required: "This is a required field",
          minLength: { value: 2, message: "Trop court" },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Prénom"
        name="firstname"
        rules={{
          required: "This is a required field",
          minLength: { value: 2, message: "Trop court" },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Téléphone"
        name="phone"
        rules={{
          pattern: {
            value: /[0-9]{10}/,
            message: "Votre numero de téléphone est incorrect",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Adresse mail"
        name="email"
        rules={{
          required: "This is a required field",
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Votre email doit s'ecrire sous la forme john@doe.fr",
          },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Mot de passe"
        name="password"
        type="password"
        rules={{
          required: "This is a required field",
          minLength: { value: 8, message: "Trop court" },
        }}
      />
      <FormInput
        register={register}
        errors={errors}
        label="Confirmation du mot de passe"
        name="passwordConfirm"
        type="password"
        rules={{
          required: "This is a required field",
          minLength: { value: 8, message: "Trop court" },
        }}
      />

      <input type="submit" />
    </Box>
  );
}
