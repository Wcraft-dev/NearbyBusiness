import React from "react";
import { Container, Box, Typography } from "@material-ui/core";

function Home() {
  return (
    <Container maxWidth="lg">
      <Box component="div" mt={2} mb={2}>
        <Typography variant="h1" component="h2">
          Nerby Business
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
