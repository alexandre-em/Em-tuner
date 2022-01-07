import React, { useMemo } from "react";
import Button from "@mui/material/Button";
import Tuner from "./components/Tuner";
import { PlayCircleOutline, StopCircle } from "@mui/icons-material";

function App() {
  const [show, setShow] = React.useState(false);

  const buttonVariant = useMemo(() => !show ? "contained" : "outlined", [show]);
  const buttonColor = useMemo(() => !show ? "primary" : "error", [show]);
  const buttonIcon = useMemo(() => !show ? <PlayCircleOutline /> : <StopCircle />, [show]);

  const handleClick = () => { setShow((prevState) => !prevState); }

  return (
    <div>
      <Tuner isStarted={show} />
      <Button 
        variant={buttonVariant}
        color={buttonColor}
        startIcon={buttonIcon}
        onClick={() => handleClick()}
      >
        Start tunning
      </Button>
    </div>
  );
}

export default App;
