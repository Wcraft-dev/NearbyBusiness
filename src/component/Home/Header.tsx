import React from "react";
import back from "../../assets/Home.jpg";
import clsx from "clsx";
import { makeStyles, Link, Paper, Grid, Typography } from "@material-ui/core";
import { Flip } from "react-awesome-reveal";

const useStyles = makeStyles((theme) => ({
  background: {
    background:
      theme.palette.type === "dark"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  paper: {
    maxWidth: 400,
    marginTop: "calc(100vh - 70vh)",
    padding: theme.spacing(2),
  },
  start: {
    height: "100vh",
    minHeight: "300px",
    background: "url('" + back + "')",
  },
  noBorder: {
    borderRadius: "0 !important",
  },
}));
const Header = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.start}>
        <Flip direction="vertical">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Paper
                className={clsx(
                  classes.paper,
                  classes.noBorder,
                  classes.background
                )}
              >
                <Typography variant="h5">Hello!</Typography>
                <Typography component="p">
                  Take control of your product management with our user-friendly
                  tool.
                </Typography>
                <Link href="/register">Click</Link>
              </Paper>
            </Grid>
          </Grid>
        </Flip>
      </div>
    </>
  );
};

export default Header;
