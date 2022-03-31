import React from "react";
import { useMutation } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import ProgressButton, {
  ProgressButtonStatus,
} from "../../../common/components/ProgressButton";
import { LoginRequestDto } from "../../../models/Authentication";
import { ApiError } from "../../../models/Common";
import { getProfile, loginApi } from "../../../services/api/authentication";
import classes from "./styles.module.scss";
import { Route } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();
  const [status, setStatus] = React.useState<ProgressButtonStatus>("idling");

  const regexEmail =
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,20}$/;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/;

  const mutation = useMutation((login: LoginRequestDto) => loginApi(login), {
    onSuccess: () => {
      // Todo redirection based on role
      console.log("Success");

      getProfile().then((user) => {
        console.log(user);

        for (let role of user.roles) {
          if (role === "RestaurantAdmin") {
            //<Route path="/restaurant-" element={Restaurant} />
          }
        }
      });
    },
    onError: (error: ApiError) => {
      // Todo process error
      setStatus("error");

      console.log(error);
      setError("email", {
        type: "manual",
        message: error.message,
      });

      setError("password", {
        type: "manual",
        message: error.message,
      });
    },
    onSettled: () => {
      setTimeout(() => {
        setStatus("idling");
      }, 500);
    },
  });

  function handleClick(data: IFormInput) {
    const body = { email: data.email, password: data.password };
    setStatus("loading");
    mutation.mutate(body);
  }

  return (
    <div className={classes.login}>
      <h1 className={classes.login_title}>Connexion</h1>
      <Card className={classes.card}>
        <CardContent>
          <FormControl
            className={classes.form}
            onSubmit={handleSubmit(handleClick)}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  className="materialUIInput"
                  label="Email"
                  variant="filled"
                  error={errors.email ? true : false}
                  helperText={
                    errors.email
                      ? errors.email.message
                        ? errors.email.message
                        : "Mauvaise saisie de l'email"
                      : " "
                  }
                />
              )}
              control={control}
              name="email"
              defaultValue="admin@restaurant.com"
              rules={{ required: true, pattern: regexEmail }}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  className="materialUIInput"
                  label="Password"
                  variant="filled"
                  error={errors.password ? true : false}
                  helperText={
                    errors.password
                      ? errors.password.message
                        ? errors.password.message
                        : "Mauvaise saisie du  password"
                      : " "
                  }
                  style={{ marginTop: "2rem" }}
                />
              )}
              control={control}
              name="password"
              defaultValue="Password1234."
              rules={{ required: true, pattern: regexPassword }}
            />

            <CardActions style={{ placeContent: "center" }}>
              <ProgressButton
                status={status}
                onClick={handleSubmit(handleClick)}
                label="Connexion"
              />
            </CardActions>
          </FormControl>
        </CardContent>
      </Card>
    </div>
  );
}
