import { useGameStore, type IPoint } from "@/store";
import { Button } from "../ui/button";
import React from "react";

type Props = {
  pointsNumber: number;
};

const ButtonPlay = ({ pointsNumber }: Props) => {
  // console.log(pointsNumber);
  const isRunningTime = useGameStore((state) => state.isRunningTime);
  const isAutoPlay = useGameStore((state) => state.isAutoPlay);
  const isWin = useGameStore((state) => state.isWin);
  const isStarted = useGameStore((state) => state.isStarted);
  const setIsRunningTime = useGameStore((state) => state.setIsRunningTime);
  const setTime = useGameStore((state) => state.setTime);
  const setPoints = useGameStore((state) => state.setPoints);
  const setTempoints = useGameStore((state) => state.setTempoints);
  const setIsAutoPlay = useGameStore((state) => state.setIsAutoPlay);
  const setNextPoint = useGameStore((state) => state.setNextPoint);
  const setIsStarted = useGameStore((state) => state.setIsStarted);

  console.log(isWin);

  const handleClickPlay = () => {
    setIsRunningTime(true);
    setIsStarted(true);
    setTime(0);
    const newPoints: IPoint[] = [];
    for (let i = 1; i <= pointsNumber; i++) {
      newPoints.push({
        id: i,
        x: Math.random() * 460,
        y: Math.random() * 460,
      });
    }
    setPoints(newPoints);
    setTempoints(newPoints);
  };
  console.log("buttonsplay render");
  // fix here
  const handleClickRestart = () => {
    setNextPoint(1);
    setTime(0);
    setIsStarted(false);
    setTimeout(() => {
      const newPoints: IPoint[] = [];
      for (let i = 1; i <= pointsNumber; i++) {
        newPoints.push({
          id: i,
          x: Math.random() * 460,
          y: Math.random() * 460,
        });
      }
      setIsStarted(true);
      setIsRunningTime(true);
      setPoints(newPoints);
      setTempoints(newPoints);
    }, 50);
  };

  const handleClickAutoPlayOn = () => {
    setIsAutoPlay(true);
    console.log("Auto play on");
  };

  const handleClickAutoPlayOff = () => {
    setIsAutoPlay(false);
    console.log("Auto play off");
  };

  return !isStarted && !isRunningTime ? (
    <Button onClick={handleClickPlay} className="max-h-[30px] px-5">
      Play
    </Button>
  ) : (
    <div className="flex gap-4">
      <Button onClick={handleClickRestart} className="max-h-[30px] px-5">
        Restart
      </Button>
      {isAutoPlay ? (
        <Button onClick={handleClickAutoPlayOff} className="max-h-[30px] px-5">
          Auto Play OFF
        </Button>
      ) : (
        <Button onClick={handleClickAutoPlayOn} className="max-h-[30px] px-5">
          Auto Play ON
        </Button>
      )}
    </div>
  );
};

export default React.memo(ButtonPlay);
