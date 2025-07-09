import { useGameStore } from "@/store";

const HeaderSection = () => {
  const isRunningTime = useGameStore((state) => state.isRunningTime);
  const isWin = useGameStore((state) => state.isWin);
  // const time = useGameStore((state) => state.time);
  const isStarted = useGameStore((state) => state.isStarted);

  console.log("HeaderSection render");

  return (
    <h1 className="font-bold text-4xl">
      {!isStarted || isRunningTime
        ? "LET'S PLAY"
        : isWin
        ? "ALL CLEARED"
        : "GAME's OVER"}
    </h1>
  );
};

export default HeaderSection;
