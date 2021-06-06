import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().max(30).required(),
});

function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let history = useHistory();

  const onSubmit = async (data) => {
    const res = await signIn(data);
    if (res) {
      reset(
        {
          email: "",
          password: "",
        },
        {
          keepErrors: true,
          keepDirty: true,
          keepIsSubmitted: false,
          keepTouched: false,
          keepIsValid: false,
          keepSubmitCount: false,
        }
      );
    }
  };
  const { signIn, userToken, googleSingIn } = useContext(AuthContext);

  useEffect(() => {
    if (userToken !== null) {
      history.push("/dashboard");
    }
  }, [userToken]);
  return (
    <Grid container>
      <Typography>{userToken}</Typography>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email")} />
          <Typography color="secondary" component="span">
            {errors.email?.message}
          </Typography>
          <input {...register("password")} />
          <Typography color="secondary" component="span">
            {errors.password?.message}
          </Typography>
          <input type="submit" />
        </form>
        <Button
          variant="contained"
          color="primary"
          onClick={() => googleSingIn()}
        >
          Inicio de sesion con Google
        </Button>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/productos">productos</Link>
      </Grid>
    </Grid>
  );
}

export default SignIn;
