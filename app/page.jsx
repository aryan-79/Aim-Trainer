"use client";
import ScoreCard from "@/components/ScoreCard";
import AimBox from "@/components/aimbox";
import { useEffect, useState } from "react";
// generate random position for aim box
const generateRandomPosition = () => {
  const innerWidth = window.innerWidth;
  let maxX, maxY;
  if (innerWidth > 1300) {
    maxX = 1080;
    maxY = 450;
  } else if (innerWidth > 1024 && innerWidth <= 1300) {
    maxX = 850;
    maxY = 400;
  } else if (innerWidth > 768 && innerWidth <= 1024) {
    maxX = 570;
    maxY = 400;
  } else if (innerWidth > 660 && innerWidth <= 768) {
    maxX = 480;
    maxY = 350;
  } else if (innerWidth > 560 && innerWidth < 660) {
    maxX = 350;
    maxY = 400;
  }
  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;
  // console.log(newX, newY);
  return { x: newX, y: newY };
};
const Home = () => {
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(30);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // start timer when start set to true
  useEffect(() => {
    let intervalId;
    if (start) {
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [start]);

  // handle click
  const handleClick = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
    // console.log(count);

    setPosition(generateRandomPosition());
  };
  // clear interval when count reaches 0
  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalId);
    }
  }, [count, intervalId]);

  return (
    <div className="aim-area-start">
      {start ? (
        <div className="bg-aim_area aim-area cursor-crosshair">
          {count === 0 ? (
            <ScoreCard timer={timer} />
          ) : (
            <AimBox handleClick={handleClick} position={position} />
          )}
        </div>
      ) : (
        <div
          className="aim-area cursor-pointer flex justify-center items-center font-inter bg-aim_area text-white font-bold text-4xl"
          onClick={() => {
            setStart((prev) => !prev);
            setPosition(generateRandomPosition());
          }}
        >
          Click anywhere to start
        </div>
      )}
    </div>
  );
};

export default Home;
