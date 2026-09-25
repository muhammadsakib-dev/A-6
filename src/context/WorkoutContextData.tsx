"use client";
import type { Dispatch, SetStateAction } from "react";
import { WorkoutType } from "@/types/workoutTypes";
import { createContext, useContext } from "react";
/**
 * ==========================
 * WorkoutContext
 * ==========================
 */
const WorkoutContext = createContext<{
  workouts: WorkoutType[];
  loading: boolean;
  error: string;
  plan: number[];
  saved: number[];
  completed: number[];
  setPlan: Dispatch<SetStateAction<number[]>>;
  setSaved: Dispatch<SetStateAction<number[]>>;
  setCompleted: Dispatch<SetStateAction<number[]>>;
} | null>(null);

export function useWorkout() {
  const fitDataContext = useContext(WorkoutContext);

  if (!fitDataContext) {
    throw new Error("useWorkout must be used inside WorkoutProvider");
  }

  return fitDataContext;
}

export default WorkoutContext;
