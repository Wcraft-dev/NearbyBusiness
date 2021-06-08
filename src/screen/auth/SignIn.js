import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Grid,
  IconButton,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
  makeStyles,
  Divider,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import AuthContext from "../../context/auth/AuthContext";
import square from "../../assets/square.png";
import donut from "../../assets/donut.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Flip, Fade } from "react-awesome-reveal";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Debe se un email valido")
    .required("El corro es obligatorio"),
  password: yup
    .string()
    .max(30, "La contraseña no puede superar los 30 carracteres")
    .required("La contraseña es obligatoria"),
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

function SignIn() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

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
  const { signIn, userToken, homePath, googleSingIn } = useContext(AuthContext);

  useEffect(() => {
    if (userToken !== null) {
      history.push(homePath);
    }
  }, [userToken, homePath]);
  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={12} sm={6}>
        <Box pl={2} pr={2} className={classes.splitLeft}>
          <Fade>
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                  blanditiis tenetur unde suscipit, quam beatae rerum inventore
                  consectetur, neque doloribus, cupiditate numquam dignissimos
                  laborum fugiat deleniti? Eum quasi quidem quibusdam
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
          </Fade>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box pl={2} pr={2} className={classes.splitRight}>
          <Flip direction="vertical">
            <Typography
              variant="h5"
              component="h4"
              style={{ fontWeight: "bold" }}
            >
              Iniciar Sesion
            </Typography>
            <Divider className={classes.dividerRight} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.form}
              >
                <Grid item className={classes.inputs}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        label="Correo"
                        className={classes.inputs}
                        placeholder="ejemplo@nerbyBusiness.com"
                        error={errors.email ? true : false}
                        helperText={errors.email?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item className={classes.inputs}>
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
                        helperText={errors.password?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item className={classes.noAccount}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component={Link}
                    to="/register"
                  >
                    No tienes cuenta?
                  </Typography>
                </Grid>
                <Grid item className={classes.inputs}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.inputs}
                  >
                    Iniciar Sesion
                  </Button>
                </Grid>
              </Grid>
            </form>
            <Box mt={4} className={classes.orLogin}>
              <Typography
                variant="caption"
                component="span"
                color="textSecondary"
                align="center"
              >
                Ó Inicia sesion con
              </Typography>
              <Button
                variant="contained"
                classes={{
                  root: classes.root,
                }}
                onClick={googleSingIn}
              >
                Inicia sesion con Google
              </Button>
            </Box>
          </Flip>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignIn;
