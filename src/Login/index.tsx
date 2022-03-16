import React from "react";
import { useMutation } from "react-query";
import { loginApi } from "../services/api";
import { ApiError, LoginRequestDto } from "../services/api/types";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@mui/material";

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
    <form>
      <Controller
        render={({ field }) =>
          <Input  {...field} className="materialUIInput" placeholder="email" />}
        name="email"
        control={control}
        defaultValue="admin@restaurant.com"
        rules={{ required: true }}
      />
      {errors.email && "email is required"}
      <br/>

      <Controller
        render={({ field }) =>
          <Input {...field}  className="materialUIInput" placeholder="password"/>}
        name="password"
        control={control}
        defaultValue="Password1234."
        rules={{ required: true }}
      />
      {errors.password && "Password is required"}
      <br/>

      <div className={classes.button}>
        <ProgressButton
          label="Confirmer"
          onClick={ handleSubmit(handleClick)}
          status={status}
        />
      </div>

    </form>
  );
}
/*
  return (
    <div className={classes.wrapper}>
      <div className={classes.field}>
        <TextField
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
      </div>

      <div className={classes.field}>
        <TextField
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Mot de passe"
          type="password"
        />
      </div>

      <div className={classes.button}>
        <ProgressButton
          label="Confirmer"
          onClick={handleClick}
          status={status}
        />
      </div>
    </div>
  );
}
*/
