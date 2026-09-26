import Image from "next/image";
import Link from "next/link";
import { FaFireFlameSimple } from "react-icons/fa6";
import { FiClock, FiStar } from "react-icons/fi";
import type { WorkoutType } from "@/types/workoutTypes";

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
      className="group overflow-hidden rounded-3xl border border-(--color-border) bg-(--card-background)"
    >
      <div className="relative aspect-2/1 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="px-8 py-7">
        <div className="mb-5 flex flex-wrap gap-2">
          {muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-(--color-primary) px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h2 className="font-oswald text-2xl font-bold uppercase tracking-wide text-(--color-text-primary) transition-colors group-hover:text-(--color-primary)">
          {name}
        </h2>

        <p className="mt-2 text-base text-(--color-text-muted)">
          {equipment}
        </p>
      </div>

      <div className="border-t border-(--color-border) px-8 py-4">
        <div className="flex items-center gap-5 text-sm text-(--color-text-muted)">
          <div className="flex items-center gap-2">
            <FiClock className="text-lg" />
            <span>{duration} min</span>
          </div>

          <div className="flex items-center gap-2">
            <FaFireFlameSimple className="text-base text-(--color-orange)" />
            <span>{caloriesBurned} kcal</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <FiStar className="text-lg text-(--color-yellow)" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;