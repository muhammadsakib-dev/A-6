"use client";
import { useWorkout } from "@/context/WorkoutContextData";
import WorkoutCard from "@/app/components/home/WorkoutCard";

const Library = () => {
  const { workouts, loading, error } = useWorkout();

  if (loading) {
    return <p className="text-zinc-400">Loading workouts...</p>;
  }

  if (error) {
    return <p className="text-red-400">{error}</p>;
  }

  return (

    <div
      id="workout"
      className="mx-auto mb-16 max-w-375 px-4 py-6 sm:px-6 lg:max-w-1450 lg:px-8"
    >
      <div className="mb-8">
        <h3 className="text-4xl font-bold text-white">THE LIBRARY</h3>

        <p className="mt-2 text-base text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default Library;
