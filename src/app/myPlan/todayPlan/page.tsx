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

const TodayPlanPageContent = () => {
  const searchParams = useSearchParams();
  const sortParam = searchParams.get("sort");

  const sort: SortType =
    sortParam === "calories" ||
    sortParam === "rating" ||
    sortParam === "duration"
      ? sortParam
      : "duration";

  const { workouts, plan, completed, setPlan, setCompleted } = useWorkout();

  const todayWorkouts = useMemo(() => {
    const filteredWorkouts = workouts.filter((workout) =>
      plan.includes(Number(workout.id)),
    );

    return sortWorkouts(filteredWorkouts, sort);
  }, [workouts, plan, sort]);

  const handleRemove = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((planId) => planId !== id),
    );
  };

  const handleComplete = (id: number) => {
    if (completed.includes(id)) {
      return;
    }

    setCompleted((currentCompleted) => [...currentCompleted, id]);
  };

  if (todayWorkouts.length === 0) {
    return <EmptyPlan />;
  }

  return (
    <div className="space-y-2.5">
      {todayWorkouts.map((workout) => {
        const workoutId = Number(workout.id);
        const isCompleted = completed.includes(workoutId);

        return (
          <MyPlanWorkoutCard
            key={workout.id}
            workout={workout}
            type="plan"
            onRemove={() => handleRemove(workoutId)}
            onComplete={() => handleComplete(workoutId)}
            isCompleted={isCompleted}
          />
        );
      })}
    </div>
  );
};

const TodayPlanPage = () => {
  return (
    <Suspense
      fallback={
        <div className="space-y-2.5">
          <div className="h-28 animate-pulse rounded-2xl bg-zinc-900" />
          <div className="h-28 animate-pulse rounded-2xl bg-zinc-900" />
        </div>
      }
    >
      <TodayPlanPageContent />
    </Suspense>
  );
};

export default TodayPlanPage;