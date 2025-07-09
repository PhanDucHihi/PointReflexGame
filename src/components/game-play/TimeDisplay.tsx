import { useGameStore } from "@/store";

const TimeDisplay = () => {
  const time = useGameStore((state) => state.time);

  return <p className="flex-1">{(time / 1000).toFixed(1)}s</p>;
};

export default TimeDisplay;
