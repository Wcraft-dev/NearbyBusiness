import React, { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required().min(3).max(20),
  lastName: yup.string().required().min(3).max(20),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8)
    .max(30)
    .matches(
      RegExp("(.*[a-z].*)"),
      "password must contain at least one lowercase letter"
    )
    .matches(
      RegExp("(.*[A-Z].*)"),
      "password must contain at least one uppercase letter"
    )
    .matches(RegExp("(.*\\d.*)"), "password must contain at least one number")
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      "password must contain at least one special character"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required(),
});

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { singUp } = useContext(AuthContext);

  const onSubmit = async (data) => {
    console.log("envio");
    const respuesta = await singUp(data);
    console.log(respuesta);
  };

  return (
    <Grid container>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("firstName")} />
          <Typography color="secondary" component="span">
            {errors.email?.message}
          </Typography>
          <input {...register("lastName")} />
          <Typography color="secondary" component="span">
            {errors.password?.message}
          </Typography>
          <input {...register("email")} />
          <Typography color="secondary" component="span">
            {errors.password?.message}
          </Typography>
          <input {...register("password")} />
          <Typography color="secondary" component="span">
            {errors.password?.message}
          </Typography>
          <input {...register("passwordConfirmation")} />
          <Typography color="secondary" component="span">
            {errors.password?.message}
          </Typography>
          <select {...register("type")}>
            <option value="empresario">Microempresa</option>
            <option value="normal">Normal</option>
          </select>
          <input type="submit" />
        </form>
        <Link to="/dashboard">Dashboard</Link>
      </Grid>
    </Grid>
  );
}

export default SignIn;
