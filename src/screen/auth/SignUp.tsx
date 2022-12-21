import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../../context/auth/AuthContext";
import {
  Grid,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  InputAdornment,
  InputLabel,
  Typography,
  Button,
  TextField,
  Box,
  makeStyles,
  IconButton,
  Divider,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import * as yup from "yup";
import { Bounce, Roll } from "react-awesome-reveal";
import { AuthDataSign, AuthRole } from "../../@types/Auth";

const schema = yup.object().shape({
  firstName: yup.string().required().min(3).max(20),
  lastName: yup.string().required().min(3).max(20),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Deben contener al menos 8 carracteres")
    .max(30, "Deben ser menos de 30 carracter")
    .matches(
      RegExp("(.*[a-z].*)"),
      "La contraseña debe contener al menos una minuscula"
    )
    .matches(
      RegExp("(.*[A-Z].*)"),
      "La contraseña debe contener al menos una mayuscula"
    )
    .matches(
      RegExp("(.*\\d.*)"),
      "La contraseña debe contener al menos un numero"
    )
    .matches(
      RegExp('[!@#$%^&*(),.?":{}|<>]'),
      "La contraseña debe contener al menos un carracter especial"
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required(),
  type: yup.string().required("Debes seleccinar alguno"),
  business: yup
    .string()
    .min(4, "Debe contener al menos 4 carracteres")
    .max(30, "Deben ser menos de 30 carracteres")
    .default(() => {
      return "none";
    }),
});
const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #00F260 30%, #0575E6 90%)",
    borderRadius: "40px",
    border: 0,
    color: "white",
    height: 48,
    padding: "0 25px",
    boxShadow: "0 3px 5px 2px rgba(0,242,96, .3)",
    "&:hover": {
      boxShadow: "0 3px 5px 2px rgba(5,117,230, .3)",
    },
  },
  inputs: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  noAccount: {
    marginTop: theme.spacing(2),
    width: "100%",
    textAlign: "center",
    display: "inline-block",
  },
  splitLeft: {
    height: "100vh",
    display: "flex",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#267CFE",
  },
  splitRight: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "#fff",
  },
  form: {
    width: "350px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
  },
  dividerLeft: {
    width: "10%",
    height: "2%",
    marginTop: theme.spacing(1),
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
  dividerRight: {
    width: "6%",
    height: "1%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    backgroundColor: "#267CFE",
    borderRadius: "5px",
  },
  orLogin: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function SignUp() {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  let history = useHistory();
  const classes = useStyles();
  const { signUp } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const watchType = watch("type");

  const onSubmit = async (data: AuthDataSign | any) => {
    const res = await signUp(data);
    if (res) {
      history.push("/login");
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
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={12} sm={6}>
        <Box pl={2} pr={2} className={classes.splitLeft}>
          <Bounce>
            <Box ml={6} mr={6}>
              <Typography
                variant="h5"
                component="h4"
                style={{ fontWeight: "bold" }}
              >
                Bienvenido a Nerby Business
              </Typography>
              <Divider className={classes.dividerLeft} />
              <Box mt={5}>
                <Typography variant="body1" component="p" align="justify">
                  Are you tired of manually tracking and organizing your
                  products? Our fullstack application is here to help! With a
                  user-friendly interface and powerful features like filtering
                  and search, you'll be able to manage your products efficiently
                  and effectively. Plus, our secure authentication system
                  ensures that your data is kept safe and only accessible to
                  authorized users. Don't waste any more time on tedious product
                  management tasks - register for our application today and
                  start streamlining your workflow!
                </Typography>
              </Box>
              <Box mt={5}>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{
                    borderRadius: "60px",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                  }}
                >
                  Conoce Mas
                </Button>
              </Box>
            </Box>
          </Bounce>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box pl={2} pr={2} className={classes.splitRight}>
          <Roll>
            <Typography
              variant="h5"
              component="h4"
              style={{ fontWeight: "bold" }}
            >
              Crear Cuenta
            </Typography>
            <Divider className={classes.dividerRight} />

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.form}
              >
                <Grid item container spacing={2}>
                  <Grid item xs={6}>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Nombre"
                          placeholder="Juan"
                          error={errors.firstName ? true : false}
                          helperText={
                            errors.firstName ? errors.firstName.message : ""
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Apellido"
                          placeholder="Garzon"
                          error={errors.lastName ? true : false}
                          helperText={
                            errors.lastName ? errors.lastName.message : ""
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item className={classes.inputs}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Correo"
                        placeholder="ejemplo@nerbyBusiness.com"
                        error={errors.email ? true : false}
                        className={classes.inputs}
                        helperText={errors.email ? errors.email.message : ""}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Contraseña"
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          className={classes.inputs}
                          error={errors.password ? true : false}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          helperText={
                            errors.password ? errors.password.message : ""
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Controller
                      name="passwordConfirmation"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Confirmar contraseña"
                          placeholder="********"
                          type={showPassword ? "text" : "password"}
                          className={classes.inputs}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          error={errors.passwordConfirmation ? true : false}
                          helperText={
                            errors.passwordConfirmation
                              ? errors.passwordConfirmation.message
                              : ""
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                {watchType === AuthRole.EMPRESARIO ? (
                  <Grid item className={classes.inputs}>
                    <Controller
                      name="business"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          label="Nombre de la empresa"
                          placeholder="Tesla"
                          className={classes.inputs}
                          error={errors.business ? true : false}
                          helperText={
                            errors.business ? errors.business.message : ""
                          }
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                ) : (
                  ""
                )}

                <Grid item className={classes.inputs}>
                  <FormControl
                    className={classes.inputs}
                    error={errors.type ? true : false}
                  >
                    <InputLabel id="select">Tipo</InputLabel>
                    <Controller
                      name="type"
                      control={control}
                      defaultValue={AuthRole.NORMAL}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          labelId="select"
                          id="select"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={AuthRole.EMPRESARIO}>
                            Microempresa
                          </MenuItem>
                          <MenuItem value={AuthRole.NORMAL}>Normal</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {errors.type ? errors.type.message : ""}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item className={classes.noAccount}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component={Link}
                    to="/login"
                  >
                    Ya tienes cuenta?
                  </Typography>
                </Grid>

                <Grid item className={classes.inputs}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.inputs}
                  >
                    Resgistrarse
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Roll>
        </Box>
      </Grid>
    </Grid>
  );
}
