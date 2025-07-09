/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import Point from "./Point";
import { useGameStore } from "@/store";
import React from "react";

export interface IPoint {
  id: number;
  x: number;
  y: number;
}


const RandomPoints = () => {
  const isRunningTime = useGameStore((state) => state.isRunningTime);
  const points = useGameStore((state) => state.points);
  const isAutoPlay = useGameStore((state) => state.isAutoPlay);
  const nextPoint = useGameStore((state) => state.nextPoint);
  const tempPoints = useGameStore((state) => state.tempPoints);
  const isWin = useGameStore((state) => state.isWin);
  const isStarted = useGameStore((state) => state.isStarted);
  const setIsWin = useGameStore((state) => state.setIsWin);
  const setIsRunningTime = useGameStore((state) => state.setIsRunningTime);
  // const setPoints = useGameStore((state) => state.setPoints);
  const setTempoints = useGameStore((state) => state.setTempoints);
  const setIsAutoPlay = useGameStore((state) => state.setIsAutoPlay);
  const setNextPoint = useGameStore((state) => state.setNextPoint);

  const isRunningTimeRef = useRef(isRunningTime);

  const nextPointRef = useRef(nextPoint);

  console.log("RandomPoints render");
  console.log("RandomPoints render isWin: ", isWin);

  useEffect(() => {
    nextPointRef.current = nextPoint;
  }, [nextPoint]);

  useEffect(() => {
    isRunningTimeRef.current = isRunningTime;
  }, [isRunningTime]);

  useEffect(() => {
    if (points.length === 0 && isStarted) {
      setIsWin(true);
      setIsRunningTime(false);
      setIsAutoPlay(false);
      setNextPoint(1);
      return;
    }
  }, [points]);

  // handleClick
  const handleClick = useCallback((id: number) => {
    console.log("Click id = ", id);
    console.log("nextPoint ", nextPointRef.current);
    if (id !== nextPointRef.current) {
      console.log("Wrong cick");
      setIsRunningTime(false);
      setIsWin(false);
      setNextPoint(1);
      return;
    } else {
      setNextPoint((prev) => prev + 1);
      setTempoints((prev) => prev.filter((point) => point.id !== id));
    }
  }, []);

  return isStarted ? (
    <div className="w-full h-full">
      {points.map((point) => {
        const isAutoClick = isAutoPlay && point.id === tempPoints[0]?.id;

        return (
          <Point
            key={point.id}
            point={point}
            onClick={handleClick}
            isRunningTimeRef={isRunningTimeRef}
            isAutoClick={isAutoClick}
          />
        );
      })}
    </div>
  ) : null;
};

export default React.memo(RandomPoints);
