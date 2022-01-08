import { Paper, Typography } from "@mui/material";
import React from "react";
import Tuner from "components/Tuner";
import { Footer, Main, paperStyle } from './App.style';
import { GitHub } from "@mui/icons-material";

function App() {

  return (
    <Main>
      <Paper sx={paperStyle} elevation={12}>
          <Typography variant="h4">Em Tuner 🎸</Typography>
          <Typography variant="h7" color="text.secondary">Tune your instrument by playing a note near your mic or by selecting your input</Typography>
        <Tuner />
      </Paper>
      <Footer href="https://github.com/alexandre-em/Em-tuner">
        <GitHub fontSize="large" />
        <Typography variant="h7" color="text.secondary" style={{ textAlign: 'center' }}>Code</Typography>
      </Footer>
    </Main>
  );
}

export default App;
