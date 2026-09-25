"use client";

import { WorkoutType } from "@/types/workoutTypes";
import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
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
  setPlan: Dispatch<SetStateAction<number[]>>;
  setSaved: Dispatch<SetStateAction<number[]>>;
  completed: number[];
  setCompleted: Dispatch<SetStateAction<number[]>>;
} | null>(null);

export default WorkoutContext;
