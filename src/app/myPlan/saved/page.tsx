"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import EmptyPlan from "@/app/components/myPlanComponent/EmptyPlan";
import MyPlanWorkoutCard from "@/app/components/myPlanComponent/MyPlanWorkoutCard";
import {
  sortWorkouts,
  type SortType,
} from "@/app/components/myPlanComponent/sortWorkouts";
import { useWorkout } from "@/context/WorkoutContextData";

const SavedPageContent = () => {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort");

  const sort: SortType =
    sortParam === "calories" ||
    sortParam === "rating" ||
    sortParam === "duration"
      ? sortParam
      : "duration";

  const { workouts, saved, setSaved } = useWorkout();

  const savedWorkouts = useMemo(() => {
    const filteredWorkouts = workouts.filter((workout) =>
      saved.includes(Number(workout.id)),
    );

    return sortWorkouts(filteredWorkouts, sort);
  }, [workouts, saved, sort]);

  const handleRemove = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter((savedId) => savedId !== id),
    );
  };

  if (savedWorkouts.length === 0) {
    return <EmptyPlan />;
  }

  return (
    <div className="space-y-2.5">
      {savedWorkouts.map((workout) => (
        <MyPlanWorkoutCard
          key={workout.id}
          workout={workout}
          type="saved"
          onRemove={() => handleRemove(Number(workout.id))}
        />
      ))}
    </div>
  );
};

const SavedPage = () => {
  return (
    <Suspense
      fallback={
        <div className="space-y-2.5">
          <div className="h-28 animate-pulse rounded-2xl bg-zinc-900" />
          <div className="h-28 animate-pulse rounded-2xl bg-zinc-900" />
        </div>
      }
    >
      <SavedPageContent />
    </Suspense>
  );
};

export default SavedPage;