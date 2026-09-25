"use client";
import { FiArrowLeft, FiBookmark, FiCalendar, FiCheck } from "react-icons/fi";
import { useWorkout } from "@/context/WorkoutContextData";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { WorkoutType } from "@/types/workoutTypes";



const WorkoutDetails = () => {
  const { did } = useParams<{ cardid: string }>();

  const { workouts, loading, error } = useWorkout();
 
  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4">
        <p className="text-sm text-zinc-400">Loading workout...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4">
        <p className="text-sm text-red-400">{error}</p>
      </main>
    );
  }

  const workout = workouts.find((item): item is WorkoutType => String(item.id) === did);

  console.log("Workout Details:", workout); // Log the workout details for debugging

  if (!workout) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] flex-col items-center justify-center gap-4">
        <h1 className="font-oswald text-3xl uppercase text-white">
          Workout not found
        </h1>

        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-lime-400 transition hover:text-lime-300"
        >
          <FiArrowLeft />
          Back to workouts
        </Link>
      </main>
    );
  }

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-300">
        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <FiArrowLeft />
          Back to workouts
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          {/* Image */}
          <div className="relative aspect-[0.82] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 lg:aspect-auto lg:min-h-152.5">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <h1 className="font-oswald text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-lime-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Workout Details */}
            <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              <DetailRow label="Equipment" value={workout.equipment} />

              <DetailRow label="Difficulty" value={workout.difficulty} />

              <DetailRow label="Sets" value={String(workout.sets)} />

              <DetailRow label="Reps" value={workout.reps} />

              <DetailRow label="Duration" value={`${workout.duration} min`} />

              <DetailRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <DetailRow label="Rating" value={String(workout.rating)} />
            </div>

            {/* Instructions */}
            <div className="mt-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-white">
                Instructions
              </h2>

              <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={`${workout.id}-${index}`}
                    className="flex gap-3 text-sm leading-6 text-zinc-400"
                  >
                    <span className="shrink-0 text-zinc-500">{index + 1}.</span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetails;

/* =================================
   DETAIL ROW
   ================================= */

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <div className="flex min-h-11.75 items-center justify-between border-b border-zinc-800 px-4 last:border-b-0">
      <span className="text-[10px] font-bold uppercase tracking-wide text-zinc-500">
        {label}
      </span>

      <span className="text-sm text-zinc-200">{value}</span>
    </div>
  );
};
