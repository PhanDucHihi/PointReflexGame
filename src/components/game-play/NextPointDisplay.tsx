import { useGameStore } from "@/store";

const NextPointDisplay = () => {
  const nextPoint = useGameStore((state) => state.nextPoint);
  const tempPoints = useGameStore((state) => state.tempPoints);
  const isRunningTime = useGameStore((state) => state.isRunningTime);

  if (!tempPoints.length || !isRunningTime) return null;

  return <p>Next: {nextPoint}</p>;
};

export default NextPointDisplay;
