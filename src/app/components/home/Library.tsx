"use client";

import { useWorkout } from "@/context/WorkoutContextData";
import WorkoutCard from "@/app/components/home/WorkoutCard";

const Library = () => {
  const { workouts, loading, error } = useWorkout();

  if (loading) {
    return <p className="text-(--color-text-muted)">Loading workouts...</p>;
  }

  if (error) {
    return <p className="text-(--color-error)">{error}</p>;
  }

  return (
    <div
      id="workout"
      className="mx-auto mb-16 max-w-375 px-4 py-6 sm:px-6 lg:max-w-1450 lg:px-8"
    >
      <div className="mb-8">
        <h3 className="text-4xl font-bold text-(--color-text-primary)">
          THE LIBRARY
        </h3>

        <p className="mt-2 text-base text-(--color-text-muted)">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default Library;