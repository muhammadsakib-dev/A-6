import type { WorkoutType } from "@/types/workoutTypes";
import { FaFireFlameSimple } from "react-icons/fa6";
import { FiClock, FiStar } from "react-icons/fi";

import Image from "next/image";
import Link from "next/link";

interface WorkoutCardProps {
  workout: WorkoutType;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const {
    id,
    name,
    image,
    muscleGroups,
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = workout;

  return (
    <Link
      href={`/workout/${id}`}
      className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
    >
      {/* Image */}
      <div className="block">
        <div className="relative aspect-2/1 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-7">
        {/* Muscle Groups */}
        <div className="mb-5 flex flex-wrap gap-2">
          {muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-lime-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <div>
          <h2 className="font-oswald text-2xl font-bold uppercase tracking-wide text-white transition-colors group-hover:text-lime-400">
            {name}
          </h2>
        </div>

        {/* Equipment */}
        <p className="mt-2 text-base text-zinc-400">
          {equipment}
        </p>
      </div>

      {/* Meta */}
      <div className="border-t border-zinc-800 px-8 py-4">
        <div className="flex items-center gap-5 text-sm text-zinc-400">
          {/* Duration */}
          <div className="flex items-center gap-2">
            <FiClock className="text-lg" />
            <span>{duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-2">
            <FaFireFlameSimple className="text-base text-orange-400" />
            <span>{caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="ml-auto flex items-center gap-2">
            <FiStar className="text-lg text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;