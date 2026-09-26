"use client";

import { useEffect, useState, type ReactNode } from "react";

import WorkoutContext from "@/context/WorkoutContextData";
import type { WorkoutType } from "@/types/workoutTypes";

type WorkoutsProviderProps = {
  children: ReactNode;
};

const WorkoutProvider = ({
  children,
}: WorkoutsProviderProps) => {
  /* =========================
     Workout Data
     ========================= */

  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================
     Plan / Saved / Completed
     ========================= */

  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  /* =========================
     Fetch Workouts
     ========================= */

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog",
          {
            cache: "force-cache",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: WorkoutType[] = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Workout fetch error:", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    void fetchWorkouts();
  }, []);

  /* =========================
     Provider
     ========================= */

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        loading,
        error,

        plan,
        setPlan,

        saved,
        setSaved,

        completed,
        setCompleted,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;