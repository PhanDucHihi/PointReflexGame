/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import InputPoint from "./components/game-play/InputPoint";
import { ModeToggle } from "./components/mode-toggle";
import ButtonsPlay from "./components/game-play/ButtonsPlay";
import RandomPoints from "./components/game-play/RandomPoints";
import { useGameStore } from "./store";
import HeaderSection from "./components/game-play/HeaderSection ";
import TimeDisplay from "./components/game-play/TimeDisplay";
import NextPointDisplay from "./components/game-play/NextPointDisplay";

function App() {
  const [pointsNumber, setPointsNumber] = useState<number>(5);
  const isRunningTime = useGameStore((state) => state.isRunningTime);
  const setTime = useGameStore((state) => state.setTime);
  console.log("app render");

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isRunningTime) {
      timer = setInterval(() => {
        setTime((prev: number) => prev + 100);
      }, 100);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isRunningTime]);

  return (
    <>
      <div className="px-2 py-4 relative min-h-screen">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="space-y-2 w-full flex flex-col items-center">
          <HeaderSection />
          <div className="space-y-2 mb-4">
            <div className="flex gap-5">
              <p className="w-[100px]">Points</p>
              <InputPoint points={pointsNumber} setPoints={setPointsNumber} />
            </div>
            <div className="flex gap-5">
              <p className="w-[100px]">Time:</p>
              <TimeDisplay />
            </div>

            <ButtonsPlay pointsNumber={pointsNumber} />
          </div>
          <div className="w-[500px] h-[500px] border-2 border-amber-500 rounded-sm bg-[#80CBC4] dark:bg-amber-50 relative z-0">
            <RandomPoints />
          </div>
          <NextPointDisplay />
        </div>
      </div>
    </>
  );
}

export default App;
