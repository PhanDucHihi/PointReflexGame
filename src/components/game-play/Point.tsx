/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import type { IPoint } from "./RandomPoints";
import { useGameStore } from "@/store";
import React from "react";

type Props = {
  point: IPoint;
  onClick: (id: number) => void;
  isRunningTimeRef: React.MutableRefObject<boolean>;
  isAutoClick: boolean;
};

const Point = ({ point, onClick, isAutoClick,isRunningTimeRef }: Props) => {
  const setPoints = useGameStore((state) => state.setPoints);
  const [countdown, setCountdown] = useState<number>(0);
  const [isVisibleCountDown, setIsVisibleCountDown] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  console.log(isRunningTimeRef.current);

  console.log("Render Point", point.id);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);



  useEffect(() => {
    if (isAutoClick) {
      const timer = setTimeout(() => {
        handleClick(point.id);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAutoClick]);

  const opacity: number = !isVisibleCountDown ? 1 : countdown / 3000;

  const handleClick = useCallback((id: number) => {
    console.log(id);
    onClick(id);
    setIsVisibleCountDown(true);
    setCountdown(3000);

    // handle set IsCountDown
    timerRef.current = setInterval(() => {
      console.log(isRunningTimeRef.current);

      if (!isRunningTimeRef.current) {
        console.log("hello world");
        clearInterval(timerRef.current!);
        setCountdown((prev) => prev);
        return;
      }
      setCountdown((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current!);
          setIsVisibleCountDown(false);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    timeoutRef.current = setTimeout(() => {
      if (!isRunningTimeRef.current) return;
      setPoints((prevPoints) => prevPoints.filter((point) => point.id !== id));
    }, 3000);
  }, []);

  return countdown === 0 && isVisibleCountDown ? null : (
    <div
      key={point.id}
      className={`w-10 h-10  border-black border-2 text-white flex flex-col items-center justify-center rounded-full absolute  leading-none ${
        countdown === 0 && isVisibleCountDown === true ? "hidden" : ""
      } ${isVisibleCountDown === true ? "bg-green-600" : "bg-white"}`}
      style={{ left: point.x, top: point.y, opacity, zIndex: 9999 - point.id }}
    >
      <button
        className="w-full h-full"
        disabled={isVisibleCountDown}
        onClick={() => handleClick(point.id)}
      >
        <p className="text-black font-bold"> {point.id}</p>
        {isVisibleCountDown && (
          <p className="text-white">{(countdown / 1000).toFixed(1)}</p>
        )}
      </button>
    </div>
  );
};

// export default React.memo(Point);

export default React.memo(Point, (prevProps, nextProps) => {
  return (
    prevProps.point.id === nextProps.point.id &&
    prevProps.point.x === nextProps.point.x &&
    prevProps.point.y === nextProps.point.y &&
    prevProps.isAutoClick === nextProps.isAutoClick
  );
});
