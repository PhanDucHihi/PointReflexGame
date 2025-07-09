import { create } from "zustand";

export interface IPoint {
  id: number;
  x: number;
  y: number;
}

interface GameState {
  time: number;
  isWin: boolean;
  isStarted: boolean;
  isAutoPlay: boolean;
  isRunningTime: boolean;
  points: IPoint[];
  tempPoints: IPoint[];
  nextPoint: number;
  setIsStarted: (value: boolean) => void;
  setNextPoint: (value: number | ((prev: number) => number)) => void;
  setIsAutoPlay: (value: boolean) => void;
  setIsRunningTime: (value: boolean) => void;
  setPoints: (points: IPoint[] | ((prev: IPoint[]) => IPoint[])) => void;
  setTempoints: (points: IPoint[] | ((prev: IPoint[]) => IPoint[])) => void;
  setIsWin: (value: boolean) => void;
  setTime: (value: number | ((prev: number) => number)) => void;

  resetForNewGame: (points: IPoint[]) => void;
}

export const useGameStore = create<GameState>((set) => ({
  time: 0,
  isWin: false,
  isStarted: false,
  isRunningTime: false,
  isAutoPlay: false,
  nextPoint: 1,
  points: [],
  tempPoints: [],
  setNextPoint: (value) =>
    set((state) => ({
      nextPoint: typeof value === "function" ? value(state.nextPoint) : value,
    })),
  setIsAutoPlay: (value) =>
    set({
      isAutoPlay: value,
    }),
  setIsStarted: (value) =>
    set({
      isStarted: value,
    }),
  setIsRunningTime: (value) => set({ isRunningTime: value }),
  setPoints: (value) =>
    set((state) => ({
      points: typeof value === "function" ? value(state.points) : value,
    })),
  setTempoints: (value) =>
    set((state) => ({
      tempPoints: typeof value === "function" ? value(state.tempPoints) : value,
    })),
  setIsWin: (value) => set({ isWin: value }),
  setTime: (value) =>
    set((state) => ({
      time: typeof value === "function" ? value(state.time) : value,
    })),

  resetForNewGame: (points) =>
    set({
      points,
      tempPoints: points,
    }),
}));
