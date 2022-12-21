import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  CardActionArea,
  CardMedia,
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Facebook, GitHub, Twitter, LinkedIn } from "@material-ui/icons";

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
  IconButtonColor: { color: theme.palette.text.secondary },
}));

const Testimonials = () => {
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
            Our Experts Trainers
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
            Replenish man have thing gathering lights yielding shall you
          </Box>
        </Typography>
      </Container>

      <Container maxWidth="md" className={classes.spacing}>
        <Grid container spacing={3}>
          <Grid item md>
            <Card className={clsx(classes.noBorder, classes.background)}>
              <CardActionArea href="https://google.com">
                <CardMedia
                  component="img"
                  alt="Human"
                  height="240"
                  image="https://thispersondoesnotexist.com/image"
                  title="Human"
                />
                <CardContent>
                  <Box textAlign="center" mb={4}>
                    <Typography variant="h5" component="span" color="secondary">
                      <Box fontWeight={700}>Guiller Toro</Box>
                    </Typography>
                    <Typography component="span">Developer</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    <Box textAlign="center">
                      I've been using your product management tool for a few
                      months now and I have to say, it's a game-changer. I used
                      to spend hours each week manually organizing my products,
                      but now I can do it all in just a few clicks. Plus, the
                      filtering and search features make it so much easier to
                      find what I'm looking for. I'm really impressed with the
                      user experience and I'm so glad I found your tool. culpa
                    </Box>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-evenly"
                >
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Facebook />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <GitHub />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Twitter />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <LinkedIn />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md>
            <Card className={clsx(classes.noBorder, classes.background)}>
              <CardActionArea href="https://google.com">
                <CardMedia
                  component="img"
                  alt="Human"
                  height="240"
                  image="https://thispersondoesnotexist.com/image"
                  title="Human"
                />
                <CardContent>
                  <Box textAlign="center" mb={4}>
                    <Typography variant="h5" component="span" color="secondary">
                      <Box fontWeight={700}>Lopez Mateo</Box>
                    </Typography>
                    <Typography component="span">
                      Engineer of software
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    <Box textAlign="center">
                      As a small business owner, I don't have a lot of time to
                      waste on tedious tasks like product management. Your
                      application has been a lifesaver for me. It's easy to use,
                      secure, and has helped me streamline my operations. I've
                      even been able to integrate it with my accounting
                      software, which has saved me even more time. Thank you for
                      developing such a helpful tool!
                    </Box>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-evenly"
                >
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Facebook />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <GitHub />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Twitter />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <LinkedIn />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md>
            <Card className={clsx(classes.noBorder, classes.background)}>
              <CardActionArea href="https://google.com">
                <CardMedia
                  component="img"
                  alt="Human"
                  height="240"
                  image="https://thispersondoesnotexist.com/image"
                  title="Human"
                />
                <CardContent>
                  <Box textAlign="center" mb={4}>
                    <Typography variant="h5" component="span" color="secondary">
                      <Box fontWeight={700}>Juan Pepe</Box>
                    </Typography>
                    <Typography component="span">UI/UX designer</Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    <Box textAlign="center">
                      I've tried a lot of different product management tools
                      over the years, but none of them have been as
                      comprehensive or user-friendly as yours. Your application
                      has everything I need to manage my products efficiently
                      and effectively. The customizability options are a huge
                      plus, too. I'm really happy with my decision to use your
                      tool and I would highly recommend it to others.
                    </Box>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-evenly"
                >
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Facebook />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <GitHub />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <Twitter />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton className={classes.IconButtonColor}>
                      <LinkedIn />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Testimonials;
