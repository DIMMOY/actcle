import React, { useState } from "react";
import "./App.css";
import RideBike from "./assets/RideBike";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { speedToDuration } from "./utils";

function App() {
  const [speed, setSpeed] = useState(200);

  return (
    <div className="App">
      <RideBike duration={speedToDuration(speed)} />
    </div>
  );
}

export default App;
