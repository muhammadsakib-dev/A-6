import type { WorkoutType } from "@/types/workoutTypes";

export type SortType = "duration" | "calories" | "rating";

export const sortWorkouts = (
  workouts: WorkoutType[],
  sort: SortType,
): WorkoutType[] => {
  return [...workouts].sort((a, b) => {
    switch (sort) {
      case "calories":
        return Number(a.caloriesBurned) - Number(b.caloriesBurned);

      case "rating":
        return Number(a.rating) - Number(b.rating);

      case "duration":
      default:
        return Number(a.duration) - Number(b.duration);
    }
  });
};