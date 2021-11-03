import React, { useState } from "react";
import "./App.css";
import RideBike from "./assets/RideBike";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { speedToDuration } from "./utils";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import dynamic from "./assets/dynamic.png";
import Static from "./assets/static.png";
import { Text } from "@chakra-ui/layout";

function App() {
  const [speed, setSpeed] = useState(800);
  const [velocityA, setVelocityA] = useState<number>(0);
  const [radius, setRadius] = useState<number>(0);
  const [weightHuman, setWeightHuman] = useState<number>(0);
  const [weightBike, setWeightBike] = useState<number>(0);
  const [distanceHG, setDistanceHG] = useState<number>(0);
  const [distanceGY, setDistanceGY] = useState<number>(0);
  const [distanceXH, setDistanceXH] = useState<number>(0);
  const [angle, setAngle] = useState<number>(0);

  const resultBackWheel =
    ((distanceGY + distanceHG) * weightHuman + distanceGY * weightBike) /
      (distanceGY + distanceHG + distanceXH) || 0;
  const resultFrontWheel =
    (distanceXH * weightHuman + (distanceXH + distanceHG) * weightBike) /
      (distanceGY + distanceHG + distanceXH) || 0;

  const VB = velocityA + (velocityA / radius) * radius || 0;
  const VE =
    Math.sqrt(
      Math.pow(velocityA * Math.sin((angle * Math.PI) / 180), 2) +
        Math.pow(velocityA + velocityA * Math.cos((angle * Math.PI) / 180), 2)
    ) || 0;

  return (
    <div className="App" style={{ display: "flex" }}>
      <div style={{ width: "50%", margin: "auto 0" }}>
        <RideBike duration={speedToDuration(velocityA, radius)} />
      </div>

      <div style={{ width: "50%", margin: "auto 0", paddingRight: "50px" }}>
        <Text textAlign="left" fontSize="xl" fontWeight={700} marginBottom={5}>
          Static
        </Text>
        <InputGroup>
          <InputLeftAddon children="H (kg)" width={100} />
          <Input
            placeholder="น้ำหนักของคนขี่จักรยาน (จุด H หน่วยเป็นกิโลกรัม)"
            type="number"
            onChange={(e) => setWeightHuman(parseFloat(e.target.value))}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="G (kg)" width={100} />
          <Input
            placeholder="น้ำหนักของจักรยาน (จุด G หน่วยเป็นกิโลกรัม)"
            type="number"
            onChange={(e) => setWeightBike(parseFloat(e.target.value))}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="XH (cm)" width={100} />
          <Input
            placeholder="ระยะห่างระหว่างคนกับล้อหลัง (จุด X - จุด H หน่วยเป็นเซนติเมตร)"
            type="number"
            onChange={(e) => setDistanceXH(parseFloat(e.target.value))}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="HG (cm)" width={100} />
          <Input
            placeholder="ระยะห่างระหว่างน้ำหนักคนกับน้ำหนักจักรยาน (จุด H - จุด G หน่วยเป็นเซนติเมตร)"
            type="number"
            onChange={(e) => setDistanceHG(parseFloat(e.target.value))}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="GY (cm)" width={100} />
          <Input
            placeholder="ระยะห่างระหว่างน้ำหนักจักรยานกับล้อหน้า (จุด G - จุด Y หน่วยเป็นเซนติเมตร)"
            type="number"
            onChange={(e) => setDistanceGY(parseFloat(e.target.value))}
          />
        </InputGroup>

        <div style={{ display: "flex" }}>
          <img src={Static} width="400" alt="static" />
          <div style={{ margin: "auto 0" }}>
            <Text fontSize="xl" textAlign="right">
              แรงที่ล้อหลัง = {(resultBackWheel * 9.81).toFixed(2)} N /{" "}
              {resultBackWheel} kg
            </Text>
            <Text fontSize="xl" textAlign="right">
              แรงที่ล้อหน้า = {(resultFrontWheel * 9.81).toFixed(2)} N /{" "}
              {resultFrontWheel} kg
            </Text>
          </div>
        </div>

        <Text textAlign="left" fontSize="xl" fontWeight={700} marginBottom={5}>
          Dynamic
        </Text>
        <InputGroup>
          <InputLeftAddon children="VA (m/s)" width={100} />
          <Input
            placeholder="ความเร็วที่จุด A (เมตรต่อวินาที)"
            type="number"
            onChange={(e) => setVelocityA(parseFloat(e.target.value))}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="R (cm)" width={100} />
          <Input
            placeholder="รัศมีของล้อ (เซนติเมตร)"
            type="number"
            onChange={(e) => setRadius(parseFloat(e.target.value))}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="θ BE" width={100} />
          <Input
            placeholder="มุมระหว่างจุด B และ E (B เป็นจุดคงที่)"
            type="number"
            onChange={(e) => setAngle(parseFloat(e.target.value))}
          />
        </InputGroup>
        <div style={{ display: "flex" }}>
          <img src={dynamic} width="400" alt="" />
          <div style={{ margin: "auto 0" }}>
            <Text fontSize="xl" textAlign="right">
              ความเร็วที่จุด B (จุดบนสุดของล้อ) = {VB.toFixed(2)} m/s
            </Text>
            <Text fontSize="xl" textAlign="right">
              ความเร็วที่จุด E = {VE.toFixed(2)} m/s
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
