import React from "react";
import back from "../assets/Home.jpg";
import {
  makeStyles,
  Paper,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { Fade } from "react-awesome-reveal";

const useStyles = makeStyles((theme) => ({
  background: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  spacing: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  noBorder: {
    borderRadius: "0 !important",
  },
}));

const Important = () => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="md" className={classes.spacing}>
        <Typography variant="h4">
          <Box
            textAlign="center"
            fontSize="h4.fontSize"
            fontWeight="fontWeightBold"
          >
            Important
          </Box>
        </Typography>
        <Typography variant="h4">
          <Box
            textAlign="center"
            fontSize="h6.fontSize"
            fontStyle="italic"
            fontWeight="fontWeightBold"
            color="text.secondary"
          >
            ProductSync
          </Box>
        </Typography>
      </Container>

      <Container maxWidth="xl" className={classes.background}>
        <Box pt={10} pb={10}>
          <Container maxWidth="md">
            <Grid container spacing={3}>
              <Grid item md={7}>
                <Fade direction="bottom-right" duration={2000}>
                  <Typography variant="h4">
                    <Box fontWeight="fontWeightBold" fontSize="h4.fontSize">
                      Promotion
                    </Box>
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    Introducing the ultimate product management tool! Our
                    fullstack application is designed to make it easy for you to
                    create, manage, and navigate your products. With a
                    user-friendly interface and powerful features like filtering
                    and search, you'll be able to find what you need in no time.
                    Plus, our authentication system ensures that your data is
                    kept secure and only accessible to authorized users. Whether
                    you're managing a small product line or a large inventory,
                    our tool has you covered. Try it out today and streamline
                    your product management processes!
                  </Typography>
                </Fade>
                <Box pt={8}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Paper
                        variant="outlined"
                        style={{
                          borderColor: "white",
                          background: "rgba(137, 222, 249, 0.23)",
                          color: "white",
                        }}
                      >
                        <Box p={3} pl={2} pr={2}>
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box
                                  fontWeight="fontWeightBold"
                                  fontSize={25}
                                  pr={1}
                                >
                                  150
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box fontSize={15} paddingBottom="4px">
                                  Days
                                </Box>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        variant="outlined"
                        style={{
                          borderColor: "white",
                          background: "rgba(137, 222, 249, 0.23)",
                          color: "white",
                        }}
                      >
                        <Box p={3} pl={2} pr={2}>
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box
                                  fontWeight="fontWeightBold"
                                  fontSize={25}
                                  pr={1}
                                >
                                  23
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box fontSize={15} paddingBottom="4px">
                                  Hours
                                </Box>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        variant="outlined"
                        style={{
                          borderColor: "white",
                          background: "rgba(137, 222, 249, 0.23)",
                          color: "white",
                        }}
                      >
                        <Box p={3} pl={2} pr={2}>
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box
                                  fontWeight="fontWeightBold"
                                  fontSize={25}
                                  pr={1}
                                >
                                  47
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box fontSize={15} paddingBottom="4px">
                                  Mins
                                </Box>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <Paper
                        variant="outlined"
                        style={{
                          borderColor: "white",
                          background: "rgba(137, 222, 249, 0.23)",
                          color: "white",
                        }}
                      >
                        <Box p={3} pl={2} pr={2}>
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-end"
                          >
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box
                                  fontWeight="fontWeightBold"
                                  fontSize={25}
                                  pr={1}
                                >
                                  59
                                </Box>
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" component="span">
                                <Box fontSize={15} paddingBottom="4px">
                                  Secs
                                </Box>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item md={5}>
                <Card className={classes.noBorder}>
                  <CardContent>
                    <Box pt={4}>
                      <Typography variant="h6" color="secondary">
                        <Box
                          fontWeight="fontWeightBold"
                          textAlign="center"
                          fontSize="h5.fontSize"
                        >
                          Registro Rapido
                        </Box>
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        color="textSecondary"
                      >
                        <Box textAlign="center" fontSize={15}>
                          takimata sanctus
                        </Box>
                      </Typography>
                      <Box p={5} pt={3} pb={0}>
                        <Grid container direction="column">
                          <form noValidate autoComplete="off">
                            <Grid item>
                              <TextField
                                variant="outlined"
                                label="Your Name"
                                fullWidth
                                margin="normal"
                                type="text"
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                label="Your Phone Number"
                                id="adornment"
                                margin="normal"
                                type="text"
                                variant="outlined"
                                InputProps={{
                                  inputProps: { min: 0 },
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      +57
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item>
                              <TextField
                                variant="outlined"
                                label="Your Email Address"
                                fullWidth
                                type="email"
                                margin="normal"
                              />
                            </Grid>
                            <Grid item>
                              <Box mt={3} mb={3}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  className={classes.noBorder}
                                  fullWidth
                                >
                                  Submit
                                </Button>
                              </Box>
                            </Grid>
                          </form>
                        </Grid>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    </>
  );
};

export default Important;
