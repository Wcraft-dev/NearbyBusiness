import React, { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log("envio");
    const respuesta = await singIn(data);
    console.log(respuesta);
  };
  const { singIn, userToken } = useContext(AuthContext);

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
        <Link to="/dashboard">Dashboard</Link>
      </Grid>
    </Grid>
  );
}

export default SignIn;
