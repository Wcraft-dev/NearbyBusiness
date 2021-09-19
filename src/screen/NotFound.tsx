import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import imgNotFound from "../assets/notFound.svg";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100%",
  },
  image: {
    height: "300px",
    width: "300px",
    marginLeft: "10px",
  },
}));

function NotFound() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={5}>
        <img src={imgNotFound} className={classes.image} />
      </Grid>
      <Grid item xs={7} style={{ color: "#6B62FE" }}>
        <Typography variant="h1" align="center" style={{ fontWeight: "bold" }}>
          404
        </Typography>
        <Typography variant="h6" align="center">
          Esta pagina no se a encontrado, No te preocupes estamos trabajando
          para que esto pase
        </Typography>
        <Box mt={2} mb={2}>
          <Grid container direction="column" alignItems="center">
            <Grid item xs>
              <Button
                color="primary"
                variant="contained"
                to="/"
                component={Link}
              >
                Regresar a Inicio
              </Button>
            </Grid>
            <Grid item xs>
              <Typography variant="caption">
                Mientras tando porque no regresas
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default NotFound;
