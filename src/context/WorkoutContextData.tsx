"use client";

import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { WorkoutType } from "@/types/workoutTypes";

/* =========================
   Workout Context Type
   ========================= */

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

/* =========================
   Workout Context
   ========================= */

const WorkoutContext =
  createContext<WorkoutContextType | null>(null);

/* =========================
   Workout Hook
   ========================= */

export const useWorkout = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider",
    );
  }

  return context;
};

export default WorkoutContext;