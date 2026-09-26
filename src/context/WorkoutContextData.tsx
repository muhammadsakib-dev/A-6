"use client";

import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { WorkoutType } from "@/types/workoutTypes";

interface WorkoutContextType {
  workouts: WorkoutType[];
  loading: boolean;
  error: string;
  plan: number[];
  saved: number[];
  completed: number[];
  setPlan: Dispatch<SetStateAction<number[]>>;
  setSaved: Dispatch<SetStateAction<number[]>>;
  setCompleted: Dispatch<SetStateAction<number[]>>;
}

const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const useWorkout = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useWorkout must be used inside WorkoutProvider");
  }

  return context;
};

export default WorkoutContext;

