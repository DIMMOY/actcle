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
import { Button } from "../node_modules/@chakra-ui/button";
import { Heading } from "../node_modules/@chakra-ui/react";
import { useDisclosure } from "../node_modules/@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

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
  const showResultStatic =
    distanceGY && distanceHG && weightHuman && distanceGY && weightBike;

  const VB = velocityA + (velocityA / radius) * radius || 0;
  const VE =
    Math.sqrt(
      Math.pow(velocityA * Math.sin((angle * Math.PI) / 180), 2) +
        Math.pow(velocityA + velocityA * Math.cos((angle * Math.PI) / 180), 2)
    ) || 0;
  const showResultDynamic = velocityA && radius && angle;

  const [isOpenStatic, setIsOpenStatic] = useState<boolean>(false);
  const [isOpenDynamic, setIsOpenDynamic] = useState<boolean>(false);

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
        <Text color="red">กรุณากรอกให้ครบทุกตัวแปร</Text>

        <div style={{ display: "flex" }}>
          <img src={Static} width="500" alt="static" />
          <div style={{ margin: "auto 0" }}>
            <Text fontSize="xl" textAlign="right">
              แรงที่ล้อหน้า ={" "}
              {showResultStatic
                ? Math.abs(resultFrontWheel * 9.81).toFixed(2)
                : 0}{" "}
              N = {showResultStatic ? Math.abs(resultFrontWheel).toFixed(2) : 0}{" "}
              kg
            </Text>
            <Text fontSize="xl" textAlign="right">
              แรงที่ล้อหลัง ={" "}
              {showResultStatic
                ? Math.abs(resultBackWheel * 9.81).toFixed(2)
                : 0}{" "}
              N = {showResultStatic ? Math.abs(resultBackWheel).toFixed(2) : 0}{" "}
              kg
            </Text>
            <Button
              onClick={() => setIsOpenStatic(true)}
              disabled={!showResultStatic}
              size="sm"
              colorScheme="teal"
              variant="solid"
              style={{ marginTop: "10px" }}
            >
              แสดงวิธีคิด
            </Button>
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
        <Text color="red">กรุณากรอกให้ครบทุกตัวแปร</Text>

        <div style={{ display: "flex" }}>
          <img src={dynamic} width="500" alt="" />
          <div style={{ margin: "auto 0" }}>
            <Text fontSize="xl" textAlign="right">
              ความเร็วที่จุด B (จุดบนสุดของล้อ) ={" "}
              {showResultDynamic ? VB.toFixed(2) : 0} m/s
            </Text>
            <Text fontSize="xl" textAlign="right">
              ความเร็วที่จุด E = {showResultDynamic ? VE.toFixed(2) : 0} m/s
            </Text>
            <Button
              onClick={() => setIsOpenDynamic(true)}
              disabled={!showResultDynamic}
              size="sm"
              colorScheme="teal"
              variant="solid"
              style={{ marginTop: "10px" }}
            >
              แสดงวิธีคิด
            </Button>
          </div>
        </div>

        <Modal
          isOpen={isOpenStatic}
          onClose={() => setIsOpenStatic(false)}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>วิธีคิด Static</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div style={{ marginBottom: "20px" }}>
                <Text fontSize="md">โมเมนต์ที่ล้อหลัง (X) = 0</Text>
                <Text fontSize="md">
                  (XH * Mass[H]) + ((XH + HG) * Mass[G]) + ((XH + HG + GY) *
                  Mass[Y]) = 0
                </Text>
                <Text fontSize="md">
                  ({distanceXH} * {-weightHuman}) + (({distanceXH} +{" "}
                  {distanceHG}) * {-weightBike}) + (({distanceXH} + {distanceHG}{" "}
                  + {distanceGY}) * Mass[Y]) = 0
                </Text>
                <Text fontSize="md">
                  {distanceXH * -weightHuman} +{" "}
                  {(distanceXH + distanceHG) * -weightBike} + (
                  {distanceXH + distanceHG + distanceGY} * Mass[Y]) = 0
                </Text>
                <Text fontSize="md">
                  Mass[Y] = ({distanceXH * weightHuman} +{" "}
                  {(distanceXH + distanceHG) * weightBike}) /{" "}
                  {distanceXH + distanceHG + distanceGY} ={" "}
                  {resultFrontWheel.toFixed(2)} kg ={" "}
                  {(resultFrontWheel * 9.81).toFixed(2)} N
                </Text>
                <Heading fontSize="md">
                  ดังนั้น Mass[Y] หรือแรงที่ล้อหน้า ={" "}
                  {Math.abs(resultFrontWheel * 9.81).toFixed(2)} N หรือ{" "}
                  {Math.abs(resultFrontWheel).toFixed(2)} kg
                </Heading>
              </div>

              <div>
                <Text fontSize="md">โมเมนต์ที่ล้อหน้า (Y) = 0</Text>
                <Text fontSize="md">
                  (GY * Mass[G]) + ((GY + HG) * Mass[H]) + ((GY + HG + XH) *
                  Mass[X]) = 0
                </Text>
                <Text fontSize="md">
                  ({distanceGY} * {-weightBike}) + (({distanceGY} + {distanceHG}
                  ) * {-weightHuman}) + (({distanceGY} + {distanceHG} +{" "}
                  {distanceXH}) * Mass[X]) = 0
                </Text>
                <Text fontSize="md">
                  {distanceGY * -weightBike} +{" "}
                  {(distanceGY + distanceHG) * -weightHuman} + (
                  {distanceGY + distanceHG + distanceXH} * Mass[X]) = 0
                </Text>
                <Text fontSize="md">
                  Mass[Y] = ({distanceGY * weightBike} +{" "}
                  {(distanceGY + distanceHG) * weightHuman}) /{" "}
                  {distanceGY + distanceHG + distanceXH} ={" "}
                  {resultBackWheel.toFixed(2)} kg ={" "}
                  {(resultBackWheel * 9.81).toFixed(2)} N
                </Text>
                <Heading fontSize="md">
                  ดังนั้น Mass[X] หรือแรงที่ล้อหลัง ={" "}
                  {Math.abs(resultBackWheel * 9.81).toFixed(2)} N หรือ{" "}
                  {Math.abs(resultBackWheel).toFixed(2)} kg
                </Heading>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpenStatic(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isOpen={isOpenDynamic}
          onClose={() => setIsOpenDynamic(false)}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>วิธีคิด Dynamic</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div style={{ marginBottom: "20px" }}>
                <Text fontSize="md">
                  ω(A) = VA / R = {velocityA} / {radius * 0.01} ={" "}
                  {(velocityA / radius / 0.01).toFixed(2)} rad / s
                </Text>
                <Text fontSize="md">
                  V(B/A) = V(E/A) = ω(A) * R ={" "}
                  {(velocityA / radius / 0.01).toFixed(2)} * {radius * 0.01} ={" "}
                  {velocityA.toFixed(2)} m/s
                </Text>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Text fontSize="md">
                  V(B) = V(B/A) + V(A) = V(B/A) * (cos(0)i + sin(0)j) + V(A) * i
                </Text>
                <Text fontSize="md">
                  V(B) = (V(B/A) + V(A))i = ({velocityA.toFixed(2)} +{" "}
                  {velocityA.toFixed(2)})i = {(velocityA * 2).toFixed(2)}i m/s ={" "}
                  {(velocityA * 2).toFixed(2)} m/s
                </Text>
                <Heading fontSize="md">
                  ดังนั้น ความเร็วที่จุด B = {(velocityA * 2).toFixed(2)}i m/s
                  หรือ {(velocityA * 2).toFixed(2)} m/s
                </Heading>
              </div>

              <div>
                <Text fontSize="md">
                  V(E) = V(E/A) + V(A) = V(E/A) * (cos(θ)i + sin(θ)j) + V(A) * i
                  โดย θ BE = {angle}
                </Text>
                <Text fontSize="md">
                  V(E) = {velocityA.toFixed(2)}(cos({angle})i + sin({angle})j) +{" "}
                  {velocityA.toFixed(2)}i
                </Text>
                <Heading fontSize="md">
                  ดังนั้น ความเร็วที่จุด E ={" "}
                  {(
                    velocityA +
                    velocityA * Math.cos((angle * Math.PI) / 180)
                  ).toFixed(2)}
                  i +{" "}
                  {(velocityA * Math.sin((angle * Math.PI) / 180)).toFixed(2)}j
                  m/s หรือ {VE.toFixed(2)} m/s
                </Heading>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setIsOpenDynamic(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default App;
