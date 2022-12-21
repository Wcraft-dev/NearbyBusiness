import React from "react";
import {
  makeStyles,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { School } from "@material-ui/icons";
import { Bounce } from "react-awesome-reveal";

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

const OurServices = () => {
  const classes = useStyles();
  return (
    <>
      <Container component="div" maxWidth="md" className={classes.spacing}>
        <Typography variant="h4">
          <Box
            textAlign="center"
            fontSize="h4.fontSize"
            fontWeight="fontWeightBold"
          >
            Our services
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
            Free
          </Box>
        </Typography>
      </Container>
      <Container maxWidth="md">
        <Grid container spacing={5}>
          <Grid item sm={4}>
            <Bounce duration={2000}>
              <Card className={classes.noBorder}>
                <CardContent className={classes.background}>
                  <School style={{ fontSize: "45px" }} color="primary" />
                  <Typography variant="h4">
                    <Box
                      pt={2}
                      pb={1}
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                    >
                      Data backup
                    </Box>
                  </Typography>
                  <Typography component="p" color="textSecondary">
                    By storing data in a cloud-based database like Firebase,
                    your application can help users to protect their data
                    against loss or damage. If their local data is lost or
                    corrupted, they can access a backup copy through your
                    application.
                  </Typography>
                </CardContent>
              </Card>
            </Bounce>
          </Grid>
          <Grid item sm={4}>
            <Bounce duration={2000}>
              <Card className={classes.noBorder}>
                <CardContent className={classes.background}>
                  <School style={{ fontSize: "45px" }} color="primary" />
                  <Typography variant="h4">
                    <Box
                      pt={2}
                      pb={1}
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                    >
                      Customization
                    </Box>
                  </Typography>
                  <Typography component="p" color="textSecondary">
                    users may be able to customize certain aspects of the
                    application to better suit their needs. For example, they
                    may be able to create custom product categories or adjust
                    the layout of the product management interface.
                  </Typography>
                </CardContent>
              </Card>
            </Bounce>
          </Grid>
          <Grid item sm={4}>
            <Bounce duration={2000}>
              <Card className={classes.noBorder}>
                <CardContent className={classes.background}>
                  <School style={{ fontSize: "45px" }} color="primary" />
                  <Typography variant="h4">
                    <Box
                      pt={2}
                      pb={1}
                      fontWeight="fontWeightBold"
                      fontSize="h6.fontSize"
                    >
                      Scalability
                    </Box>
                  </Typography>
                  <Typography component="p" color="textSecondary">
                    Using Firebase for authentication, storage, and database
                    management can help your application scale easily as it
                    grows. This can be useful if you expect your application to
                    attract a large number of users or if you plan to add
                    additional features in the future.
                  </Typography>
                </CardContent>
              </Card>
            </Bounce>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OurServices;
