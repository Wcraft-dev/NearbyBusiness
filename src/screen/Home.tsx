import React from "react";
import { makeStyles } from "@material-ui/core";

import OurServices from "../component/Home/OurServices";
import Header from "../component/Home/Header";
import Benefits from "../component/Home/Benefits";
import Important from "../component/Home/Important";
import Testimonials from "../component/Home/Testimonials";
import Footer from "../component/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 0),
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <Header />
      <OurServices />
      <Benefits/>
      <Important/>
      <Testimonials/>
      <Footer/>
    </main>
  );
}
