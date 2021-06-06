import React, { useContext } from "react";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthContext, { AuthRoles } from "../../context/auth/AuthContext";
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
  type: yup.string().required(),
  business: yup.string().required().max(30),
});

function SignIn() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  let history = useHistory();
  const { signUp } = useContext(AuthContext);
  const watchType = watch("type");
  const onSubmit = async (data) => {
    const res = await signUp(data);
    if (res) {
      history.push("/login")
      reset(
        {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordConfirmation: "",
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

  return (
    <Grid container>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("firstName")} placeholder="Name" />
          <Typography color="secondary" component="span">
            {errors.firstName?.message}
          </Typography>
          <input {...register("lastName")} placeholder="Last Name" />
          <Typography color="secondary" component="span">
            {errors.lastName?.message}
          </Typography>
          <input {...register("email")} placeholder="email" />
          <Typography color="secondary" component="span">
            {errors.email?.message}
          </Typography>
          <input {...register("password")} placeholder="password" />
          <Typography color="secondary" component="span">
            {errors.password?.message}
          </Typography>
          <input
            {...register("passwordConfirmation")}
            placeholder="password Confirm"
          />
          <Typography color="secondary" component="span">
            {errors.passwordConfirmation?.message}
          </Typography>
          {watchType === AuthRoles.EMPRESARIO ? (
            <>
              <input
                {...register("business")}
                placeholder="Nombre de su negocio"
              />
              <Typography color="secondary" component="span">
                {errors.business?.message}
              </Typography>
            </>
          ) : (
            ""
          )}

          <select {...register("type")}>
            <option value={AuthRoles.EMPRESARIO}>Microempresa</option>
            <option value={AuthRoles.NORMAL}>Normal</option>
          </select>
          <input type="submit" />
        </form>
        <Link to="/dashboard">Dashboard</Link>
      </Grid>
    </Grid>
  );
}

export default SignIn;
