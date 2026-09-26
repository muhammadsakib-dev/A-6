import type { WorkoutType } from "@/types/workoutTypes";

export type SortType = "duration" | "calories" | "rating";

export const sortWorkouts = (
  workouts: WorkoutType[],
  sort: SortType,
): WorkoutType[] => {
  return [...workouts].sort((a, b) => {
    switch (sort) {
      case "calories":
        return Number(b.caloriesBurned) - Number(a.caloriesBurned);

      case "rating":
        return Number(b.rating) - Number(a.rating);

      case "duration":
      default:
        return Number(b.duration) - Number(a.duration);
    }
  });
};