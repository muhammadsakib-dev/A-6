"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { useWorkout } from "@/context/WorkoutContextData";
import MyPlanWorkoutCard from "@/app/components/myPlanComponent/MyPlanWorkoutCard";
import EmptyPlan from "@/app/components/myPlanComponent/EmptyPlan";
import {
  sortWorkouts,
  type SortType,
} from "@/app/components/myPlanComponent/sortWorkouts";

const TodayPlanPage = () => {
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
    setPlan((currentPlan) => currentPlan.filter((planId) => planId !== id));
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
      {todayWorkouts.map((workout) => (
        <MyPlanWorkoutCard
          key={workout.id}
          workout={workout}
          type="plan"
          onRemove={() => handleRemove(Number(workout.id))}
          onComplete={() => handleComplete(Number(workout.id))}
          isCompleted={completed.includes(Number(workout.id))}
        />
      ))}
    </div>
  );
};

export default TodayPlanPage;