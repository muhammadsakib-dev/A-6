"use client";

import {
  FiArrowLeft,
  FiBookmark,
  FiCalendar,
  FiCheck,
} from "react-icons/fi";
import { useWorkout } from "@/context/WorkoutContextData";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import type { WorkoutType } from "@/types/workoutTypes";

const WorkoutDetails = () => {
  const { did } = useParams<{ did: string }>();

  const {
    workouts,
    loading,
    error,
    setPlan,
    setSaved,
    plan,
    saved,
  } = useWorkout();

  const workoutId = Number(did);

  const isInPlan = plan.includes(workoutId);
  const isSaved = saved.includes(workoutId);

  /*
   * ==========================
   * Add Workout To Plan
   * ==========================
   */

  const handleAddToPlan = () => {
    if (isInPlan) {
      toast.info("This workout is already in your plan.");
      return;
    }

    setPlan((currentPlan) => [...currentPlan, workoutId]);

    toast.success("Workout added to today's plan.");
  };

  /*
   * ==========================
   * Save Workout
   * ==========================
   */

  const handleSaveWorkout = () => {
    if (isSaved) {
      toast.info("This workout is already saved.");
      return;
    }

    setSaved((currentSaved) => [...currentSaved, workoutId]);

    toast.success("Workout saved successfully.");
  };

  /*
   * ==========================
   * Loading State
   * ==========================
   */

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4">
        <p className="text-sm text-zinc-400">
          Loading workout...
        </p>
      </main>
    );
  }

  /*
   * ==========================
   * Error State
   * ==========================
   */

  if (error) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4">
        <p className="text-sm text-red-400">
          {error}
        </p>
      </main>
    );
  }

  /*
   * ==========================
   * Find Workout
   * ==========================
   */

  const workout = workouts.find(
    (item): item is WorkoutType =>
      String(item.id) === did,
  );

  if (!workout) {
    return (
      <main className="flex min-h-[calc(100vh-88px)] flex-col items-center justify-center gap-5 px-4">
        <h1 className="font-oswald text-3xl font-bold uppercase text-white sm:text-4xl">
          Workout not found
        </h1>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-lime-400 transition hover:text-lime-300"
        >
          <FiArrowLeft />
          Back to workouts
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f1014] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-300">

        {/* ==========================
            Back Navigation
        ========================== */}

        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-white"
        >
          <FiArrowLeft />
          Back to workouts
        </Link>

        {/* ==========================
            Main Content
        ========================== */}

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">

          {/* ==========================
              Workout Image
          ========================== */}

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-800 bg-[#14171d] sm:aspect-[16/10] lg:sticky lg:top-6 lg:aspect-auto lg:h-160">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* ==========================
              Workout Content
          ========================== */}

          <div className="flex flex-col">

            {/* Title */}

            <h1 className="font-oswald text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {workout.name}
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
              {workout.description}
            </p>

            {/* ==========================
                Muscle Groups
            ========================== */}

            <div className="mt-6 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-lime-400 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* ==========================
                Workout Details
            ========================== */}

            <div className="mt-7 overflow-hidden rounded-2xl border border-zinc-800 bg-[#14171d]">

              <DetailRow
                label="Equipment"
                value={workout.equipment}
              />

              <DetailRow
                label="Difficulty"
                value={workout.difficulty}
              />

              <DetailRow
                label="Sets"
                value={String(workout.sets)}
              />

              <DetailRow
                label="Reps"
                value={workout.reps}
              />

              <DetailRow
                label="Duration"
                value={`${workout.duration} min`}
              />

              <DetailRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <DetailRow
                label="Rating"
                value={`★ ${workout.rating}`}
              />

            </div>

            {/* ==========================
                Instructions
            ========================== */}

            <div className="mt-8">

              <h2 className="font-oswald text-xl font-bold uppercase tracking-wide text-white">
                Instructions
              </h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={`${workout.id}-${index}`}
                      className="flex gap-4 text-sm leading-7 text-zinc-400 sm:text-base"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-lime-400">
                        {index + 1}
                      </span>

                      <span>{instruction}</span>
                    </li>
                  ),
                )}
              </ol>

            </div>

            {/* ==========================
                Actions
            ========================== */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              {/* Add To Plan */}

              <button
                type="button"
                onClick={handleAddToPlan}
                disabled={isInPlan}
                className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition ${
                  isInPlan
                    ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                    : "bg-lime-400 text-black hover:bg-lime-300"
                }`}
              >
                {isInPlan ? <FiCheck /> : <FiCalendar />}

                {isInPlan
                  ? "Already in plan"
                  : "Add to today's plan"}
              </button>

              {/* Save Workout */}

              <button
                type="button"
                onClick={handleSaveWorkout}
                disabled={isSaved}
                className={`inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition ${
                  isSaved
                    ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                    : "bg-zinc-800 text-white hover:bg-zinc-700"
                }`}
              >
                {isSaved ? <FiCheck /> : <FiBookmark />}

                {isSaved
                  ? "Already saved"
                  : "Save workout"}
              </button>

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

const DetailRow = ({
  label,
  value,
}: DetailRowProps) => {
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 border-b border-zinc-800 px-5 last:border-b-0 sm:px-6">

      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </span>

      <span className="text-sm font-medium text-zinc-200 sm:text-base">
        {value}
      </span>

    </div>
  );
};