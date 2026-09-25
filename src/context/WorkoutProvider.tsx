"use client";

import { ReactNode, useEffect, useState } from "react";
import WorkoutContext from "@/context/WorkoutContextData";
import type { WorkoutType } from "@/types/workoutTypes";

type WorkoutsProviderProps = {
  children: ReactNode;
};

const WorkoutProvider = ({ children }: WorkoutsProviderProps) => {

/**
 * ==========================
 * Fetch Workouts Data
 * ==========================
 */
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  async function fetchWorkouts(): Promise<void> {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {cache: "force-cache"});

      if (!response.ok) {
        throw new Error("Failed to fetch workouts");
      }

      const data: WorkoutType[] = await response.json();

      setWorkouts(data);
    } catch (error) {
      setError("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void Promise.resolve().then(fetchWorkouts);
  }, []);

/**
 * ==========================
 * Store Plan & Saved data using useState + Completed Tasks
 * ==========================
 */

  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  return (
    <WorkoutContext.Provider
      value={
        {
          workouts,
          loading,
          error,
          plan,
          saved,
          setPlan,
          setSaved,
          completed,
          setCompleted,
        }
      }
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;
