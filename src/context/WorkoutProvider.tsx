"use client";

import { useEffect, useState, type ReactNode } from "react";

import WorkoutContext from "@/context/WorkoutContextData";
import type { WorkoutType } from "@/types/workoutTypes";

type WorkoutsProviderProps = {
  children: ReactNode;
};

type StoredWorkoutData = {
  workouts: WorkoutType[];
  plan: number[];
  saved: number[];
  completed: number[];
};

const STORAGE_KEY = "fitlog-workout-data";

const WorkoutProvider = ({ children }: WorkoutsProviderProps) => {
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [plan, setPlan] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  const [hydrated, setHydrated] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);

      if (storedData) {
        const parsedData = JSON.parse(storedData) as Partial<StoredWorkoutData>;

        if (Array.isArray(parsedData.workouts)) {
          setWorkouts(parsedData.workouts);
        }

        if (Array.isArray(parsedData.plan)) {
          setPlan(parsedData.plan);
        }

        if (Array.isArray(parsedData.saved)) {
          setSaved(parsedData.saved);
        }

        if (Array.isArray(parsedData.completed)) {
          setCompleted(parsedData.completed);
        }
      }
    } catch (error) {
      console.error("Local storage load error:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Fetch latest workouts from API
  useEffect(() => {
    if (!hydrated) return;

    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://api.api-store.workers.dev/api/fitlog",
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

        setError(
          workouts.length > 0
            ? "Using saved workout data"
            : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchWorkouts();
  }, [hydrated, workouts.length]);

  // Save everything to localStorage whenever state changes
  useEffect(() => {
    if (!hydrated) return;

    const storedData: StoredWorkoutData = {
      workouts,
      plan,
      saved,
      completed,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
    } catch (error) {
      console.error("Local storage save error:", error);
    }
  }, [hydrated, workouts, plan, saved, completed]);

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