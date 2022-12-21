import React from "react";
import {
  makeStyles,
  Link,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { Send, HomeOutlined, GitHub } from "@material-ui/icons";
import CopyrightIcon from "@material-ui/icons/Copyright";
import { Fade } from "react-awesome-reveal";

const useStyles = makeStyles((theme) => ({
  background: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  noBorder: {
    borderRadius: "0 !important",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <footer className={classes.background}>
        <Box p={10}>
          <Fade duration={2000}>
            <Container>
              <Grid container spacing={3} alignContent="center">
                <Grid item md>
                  <Typography component="h6">
                    <Box
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                      color="secondary"
                      pb={4}
                    >
                      Menu
                    </Box>
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary">
                    <Grid
                      container
                      justifyContent="flex-start"
                      direction="column"
                    >
                      <Link href="/">Tablero</Link>
                      <Link href="/">Perfil</Link>
                      <Link href="/">Ayuda</Link>
                      <Link href="/">Notas</Link>
                      <Link href="/">Reporte</Link>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography component="h6">
                    <Box
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                      color="secondary"
                      pb={4}
                    >
                      Enlaces Rapidos
                    </Box>
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    <Grid
                      container
                      justifyContent="flex-start"
                      direction="column"
                    >
                      <Link href="/">Tablero</Link>
                      <Link href="/">Perfil</Link>
                      <Link href="/">Ayuda</Link>
                      <Link href="/">Notas</Link>
                      <Link href="/">Reporte</Link>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid item md>
                  <Typography component="h6">
                    <Box
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                      color="secondary"
                      pb={4}
                    >
                      Redes
                    </Box>
                  </Typography>
                  <Typography variant="subtitle1" color="textPrimary">
                    <Grid
                      container
                      justifyContent="flex-start"
                      direction="column"
                    >
                      <Link href="/">Tablero</Link>
                      <Link href="/">Perfil</Link>
                      <Link href="/">Ayuda</Link>
                      <Link href="/">Servicio</Link>
                      <Link href="/">Reportar</Link>
                    </Grid>
                  </Typography>
                </Grid>
                <Grid item md>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-around"
                  >
                    <Grid item>
                      <Typography component="h3">
                        <Box
                          fontWeight="fontWeightBold"
                          fontSize="h6.fontSize"
                          pb={4}
                        >
                          Sugerencias
                        </Box>
                      </Typography>
                    </Grid>
                    <form action="">
                      <Grid item>
                        <TextField
                          variant="outlined"
                          label="Tu comentario"
                          fullWidth
                        />
                        <Box pt={2}>
                          <Button
                            className={classes.noBorder}
                            variant="contained"
                            fullWidth
                            color="secondary"
                            endIcon={<Send />}
                          >
                            Enviar
                          </Button>
                        </Box>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Grid>
              <Box pt={4} pb={4}>
                <Grid container direction="row" justifyContent="space-around">
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <IconButton
                        color="secondary"
                        size="medium"
                        href="https://github.com/IllustriousLoop/"
                      >
                        <GitHub />
                      </IconButton>
                      <Typography component="h4">IllustriousLoop</Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" alignItems="center">
                      <IconButton
                        color="secondary"
                        size="medium"
                        href="https://jhairparis.com"
                      >
                        <HomeOutlined />
                      </IconButton>
                      <Typography component="h4">IllustriousLoop</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <Grid container justifyContent="center">
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {"Copyright  "}
                  <CopyrightIcon fontSize="small" />
                  <Link color="inherit" href="https://jhairparis.com/">
                    {"  IllustriousLoop"}
                  </Link>
                  {` ${new Date().getFullYear()}`}
                </Typography>
              </Grid>
            </Container>
          </Fade>
        </Box>
      </footer>
    </>
  );
};

export default Footer;
