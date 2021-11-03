import React, { useState } from "react";
import "./App.css";
import RideBike from "./assets/RideBike";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { speedToDuration } from "./utils";
import { Input } from "../node_modules/@chakra-ui/input";
import Propposition from "./assets/proposition.png";
import Static from "./assets/static.png";

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
    (distanceGY + distanceHG + distanceXH);
  const resultFrontWheel =
    (distanceXH * weightHuman + (distanceXH + distanceHG) * weightBike) /
    (distanceGY + distanceHG + distanceXH);

  console.log(1 / speedToDuration(velocityA, radius));
  return (
    <div className="App" style={{ display: "flex" }}>
      <div>
        <RideBike duration={speedToDuration(velocityA, radius)} />
      </div>

      <div>
        <p>Static</p>
        <Input
          placeholder="น้ำหนักของคนขี่จักรยาน (จุด H หน่วยเป็นกิโลกรัม)"
          type="number"
          onChange={(e) => setWeightHuman(parseFloat(e.target.value))}
        />
        <Input
          placeholder="น้ำหนักของจักรยาน (จุด G หน่วยเป็นกิโลกรัม)"
          type="number"
          onChange={(e) => setWeightBike(parseFloat(e.target.value))}
        />
        <Input
          placeholder="ระยะห่างระหว่างคนกับล้อหลัง (จุด X - จุด H หน่วยเป็นเซนติเมตร)"
          type="number"
          onChange={(e) => setDistanceXH(parseFloat(e.target.value))}
        />
        <Input
          placeholder="ระยะห่างระหว่างน้ำหนักคนกับน้ำหนักจักรยาน (จุด H - จุด G หน่วยเป็นเซนติเมตร)"
          type="number"
          onChange={(e) => setDistanceHG(parseFloat(e.target.value))}
        />
        <Input
          placeholder="ระยะห่างระหว่างน้ำหนักจักรยานกับล้อหน้า (จุด G - จุด Y หน่วยเป็นเซนติเมตร)"
          type="number"
          onChange={(e) => setDistanceGY(parseFloat(e.target.value))}
        />
        <div style={{ display: "flex" }}>
          <img src={Static} width="450"></img>
          <div>
            <p>
              แรงที่ล้อหลัง = {(resultBackWheel * 9.81).toFixed(2)} N /{" "}
              {resultBackWheel} kg
            </p>
            <p>
              แรงที่ล้อหน้า = {(resultFrontWheel * 9.81).toFixed(2)} N /{" "}
              {resultFrontWheel} kg
            </p>
          </div>
        </div>

        <p>Dynamic</p>
        <Input
          placeholder="ความเร็วที่จุด A (เมตรต่อวินาที)"
          type="number"
          onChange={(e) => setVelocityA(parseFloat(e.target.value))}
        />
        <Input
          placeholder="รัศมีของล้อ (เซนติเมตร)"
          type="number"
          onChange={(e) => setRadius(parseFloat(e.target.value))}
        />
        <Input
          placeholder="มุมระหว่างจุด B และ E (B เป็นจุดคงที่)"
          type="number"
          onChange={(e) => setAngle(parseFloat(e.target.value))}
        />
        <div style={{ display: "flex" }}>
          <img src={Propposition} width="450"></img>
          <div>
            <p>
              ความเร็วที่จุด B (จุดบนสุดของล้อ) ={" "}
              {(velocityA + (velocityA / radius) * radius).toFixed(2)} m/s
            </p>
            <p>
              ความเร็วที่จุด E ={" "}
              {Math.sqrt(
                Math.pow(velocityA * Math.sin((angle * Math.PI) / 180), 2) +
                  Math.pow(
                    velocityA + velocityA * Math.cos((angle * Math.PI) / 180),
                    2
                  )
              ).toFixed(2)}{" "}
              m/s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
