import React from "react";
import { useMutation } from "react-query";
import { loginApi } from "../services/api/authentication";
import { ApiError, LoginRequestDto } from "../services/api/types/authentication";
import { useForm, Controller } from "react-hook-form";
import {Input, TextField} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';

import ProgressButton, {
  ProgressButtonStatus,
} from "../common/components/ProgressButton";
import classes from "./styles.module.scss";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const { control, handleSubmit, formState:{ errors } } = useForm<IFormInput>();
  const [status, setStatus] = React.useState<ProgressButtonStatus>("idling");

  const mutation = useMutation((login: LoginRequestDto) => loginApi(login), {
    onSuccess: () => {
      // Todo redirection based on role
      setTimeout(() => {
        setStatus("error");
      }, 2000);
    },
    onError: (error: ApiError) => {
      // Todo process error
      setStatus("error");
      errors.email();
      errors.password();
    },
    onSettled: () => {
      setTimeout(() => {
        setStatus("idling");
      }, 500);
    },
  });

  function handleClick(data:IFormInput) {
    const body = { email : data.email, password : data.password};
    setStatus("loading");
    mutation.mutate(body);
  }


  return (
    <div className={classes.login}>
      <h1 className={classes.login_title}>Connexion</h1>
      <Card className={classes.card}>
        <CardContent>
          <FormControl className={classes.form} onSubmit={handleSubmit(handleClick)} >
            <Controller
              render={({ field }) =>
                <TextField  {...field} className="materialUIInput"
                            label="Email" variant="filled"
                            error={errors.email ? true : false}
                            helperText={errors.email ? 'Error email' : ''} />}
              control={control}
              name="email"
              defaultValue="admin@restaurant.com"
              rules={{ required: true }}
            />
            <Controller
              render={({ field }) =>
                <TextField {...field}  className="materialUIInput"
                           label="Password" variant="filled"
                           error={errors.password ? true : false}
                           helperText={errors.password ? ' Error Password !' : ' '}
                           style={{ marginTop: "2rem" }}/>}

              control={control}
              name="password"
              defaultValue="Password1234."

              rules={{ required: true }}
            />
              <CardActions style={{ placeContent:"center" }}>
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
