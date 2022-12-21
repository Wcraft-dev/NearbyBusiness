import React from "react";
import {
  makeStyles,
  CardActionArea,
  CardMedia,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { Person, Favorite } from "@material-ui/icons";
import { Fade, Slide } from "react-awesome-reveal";

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
const Benefit = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md" className={classes.spacing}>
        <Fade direction="bottom-right" duration={2000}>
          <Typography variant="h4">
            <Box
              textAlign="center"
              fontSize="h4.fontSize"
              fontWeight="fontWeightBold"
            >
              Benefits
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
              Streamline your product management with our secure and easy-to-use
              tool.
            </Box>
          </Typography>
        </Fade>
      </Container>
      <Container maxWidth="lg">
        <Slide direction="up">
          <Grid container spacing={3} justifyContent="center">
            <Grid item sm={3}>
              <Card className={classes.noBorder}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Human"
                    height="212"
                    image="https://image.freepik.com/foto-gratis/estudiantes-sonrientes-mochilas_1098-1220.jpg"
                    title="Human"
                  />
                </CardActionArea>
                <Box className={classes.background}>
                  <Box p={3} pb={0}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.noBorder}
                    >
                      Ver mas
                    </Button>
                  </Box>
                  <Box p={3} pb={2}>
                    <Typography component="h4" color="primary">
                      <Box fontWeight={900}>Ease of use</Box>
                    </Typography>
                  </Box>
                  <Box pl={3} pr={3}>
                    <Typography component="p" color="textSecondary">
                      With its home page, authentication system, and product
                      management features, your application is designed to be
                      easy to use and navigate. This means that users will be
                      able to quickly get up and running with the application
                      and start managing their products efficiently
                    </Typography>
                  </Box>
                </Box>
                <CardActions className={classes.background}>
                  <Box p={2}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item>
                        <Grid container alignItems="center">
                          <Avatar
                            src="https://thispersondoesnotexist.com/image"
                            alt="Linda imagen"
                          />
                          <Box pl={2}>
                            <Typography component="span" color="primary">
                              Juan
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Box pl={1}>
                          <Button
                            color="primary"
                            size="small"
                            startIcon={<Person />}
                          >
                            12
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          size="small"
                          startIcon={<Favorite />}
                        >
                          12
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card className={classes.noBorder}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Human"
                    height="212"
                    image="https://image.freepik.com/foto-gratis/estudiantes-sonrientes-mochilas_1098-1220.jpg"
                    title="Human"
                  />
                </CardActionArea>
                <Box className={classes.background}>
                  <Box p={3} pb={0}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.noBorder}
                    >
                      Ver mas
                    </Button>
                  </Box>
                  <Box p={3} pb={2}>
                    <Typography component="h4" color="primary">
                      <Box fontWeight={900}>Security</Box>
                    </Typography>
                  </Box>
                  <Box pl={3} pr={3}>
                    <Typography component="p" color="textSecondary">
                      The authentication system in your application helps to
                      ensure that only authorized users can access certain
                      features and data. This helps to protect against
                      unauthorized access and ensure that users' data is kept
                      secure
                    </Typography>
                  </Box>
                </Box>
                <CardActions className={classes.background}>
                  <Box p={2}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item>
                        <Grid container alignItems="center">
                          <Avatar
                            src="https://thispersondoesnotexist.com/image"
                            alt="Linda imagen"
                          />
                          <Box pl={2}>
                            <Typography component="span" color="primary">
                              Pedro
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Box pl={1}>
                          <Button
                            color="primary"
                            size="small"
                            startIcon={<Person />}
                          >
                            10
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          size="small"
                          startIcon={<Favorite />}
                        >
                          1
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
            <Grid item sm={3}>
              <Card className={classes.noBorder}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Human"
                    height="212"
                    image="https://image.freepik.com/foto-gratis/estudiantes-sonrientes-mochilas_1098-1220.jpg"
                    title="Human"
                  />
                </CardActionArea>
                <Box className={classes.background}>
                  <Box p={3} pb={0}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.noBorder}
                    >
                      Ver mas
                    </Button>
                  </Box>
                  <Box p={3} pb={2}>
                    <Typography component="h4" color="primary">
                      <Box fontWeight={900}>Productivity</Box>
                    </Typography>
                  </Box>
                  <Box pl={3} pr={3}>
                    <Typography component="p" color="textSecondary">
                      By providing users with the ability to create, manage, and
                      search for products, your application can help users save
                      time and be more productive. Instead of manually tracking
                      and organizing products, users can use your application to
                      streamline these processes and focus on other tasks.
                    </Typography>
                  </Box>
                </Box>
                <CardActions className={classes.background}>
                  <Box p={2}>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item>
                        <Grid container alignItems="center">
                          <Avatar
                            src="https://thispersondoesnotexist.com/image"
                            alt="Linda imagen"
                          />
                          <Box pl={2}>
                            <Typography component="span" color="primary">
                              Mateo
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Box pl={1}>
                          <Button
                            color="primary"
                            size="small"
                            startIcon={<Person />}
                          >
                            12
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          size="small"
                          startIcon={<Favorite />}
                        >
                          12
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Slide>
      </Container>
    </>
  );
};

export default Benefit;
