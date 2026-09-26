"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiClock, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

import type { WorkoutType } from "@/types/workoutTypes";

interface MyPlanWorkoutCardProps {
  workout: WorkoutType;
  type: "plan" | "saved";
  onRemove: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
}

const MyPlanWorkoutCard = ({
  workout,
  type,
  onRemove,
  onComplete,
  isCompleted = false,
}: MyPlanWorkoutCardProps) => {
  const handleRemove = () => {
    onRemove();
    toast.error(`${workout.name} removed successfully.`);
  };

  const handleComplete = () => {
    onComplete?.();
    toast.success(`${workout.name} marked as completed.`);
  };

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-[#14171d] p-4 transition hover:border-zinc-700 sm:flex-row sm:items-center">
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-36">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="144px"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-oswald text-lg font-bold uppercase tracking-wide text-white">
          {workout.name}
        </h3>

        <p className="mt-1 text-xs text-zinc-500">{workout.equipment}</p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <FiClock className="text-sm text-lime-400" />
            {workout.duration} min
          </span>

          <span className="text-lime-400">•</span>
          <span>{workout.caloriesBurned} kcal</span>

          <span className="text-lime-400">•</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="inline-flex h-10 items-center rounded-full border border-zinc-700 px-4 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          View Details
        </Link>

        {type === "plan" && onComplete && (
          <button
            type="button"
            onClick={handleComplete}
            disabled={isCompleted}
            className={`inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition ${
              isCompleted
                ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
                : "bg-lime-400 text-black hover:bg-lime-300"
            }`}
          >
            <FiCheck />
            {isCompleted ? "Completed" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
        >
          <FiX />
        </button>
      </div>
    </article>
  );
};

export default MyPlanWorkoutCard;