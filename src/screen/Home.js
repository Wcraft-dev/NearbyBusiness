import React from "react";
import { Container, Box, Typography } from "@material-ui/core";
import HomeImg from "../assets/Home.jpg";

function Home() {
  return (
    <>
      <img id="Fondo-Portada" src={HomeImg} alt="Fondo" />
      <p id="Por">Hola</p>

      <Container maxWidth="lg">
        <Box component="div" mt={2} mb={2}>
          <Typography variant="h1" component="h2">
            Nerby Business
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default Home;
