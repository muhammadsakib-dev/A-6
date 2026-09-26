"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { ReactNode } from "react";
import { useMemo } from "react";

import { useWorkout } from "@/context/WorkoutContextData";

import SortControl from "@/app/components/myPlanComponent/SortControl";

const MyPlanLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const pathname = usePathname();

  const {
    workouts,
    plan,
    saved,
  } = useWorkout();

  const isTodayPlan =
    pathname === "/my-plan/today-plan";

  const isSaved =
    pathname === "/my-plan/saved";

  /**
   * ==========================
   * Current List
   * ==========================
   */

  const currentIds =
    isTodayPlan
      ? plan
      : isSaved
        ? saved
        : [];

  /**
   * ==========================
   * Current Workouts
   * ==========================
   */

  const currentWorkouts = useMemo(() => {
    return workouts.filter((workout) =>
      currentIds.includes(Number(workout.id)),
    );
  }, [workouts, currentIds]);

  /**
   * ==========================
   * Stats
   * ==========================
   */

  const totalExercises =
    currentWorkouts.length;

  const totalMinutes =
    currentWorkouts.reduce(
      (total, workout) =>
        total + Number(workout.duration),
      0,
    );

  const totalCalories =
    currentWorkouts.reduce(
      (total, workout) =>
        total +
        Number(workout.caloriesBurned),
      0,
    );

  return (
    <main className="min-h-screen bg-[#0f1014] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-375">

        {/* Header */}

        <header>
          <h1 className="font-oswald text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            My Plan
          </h1>

          <p className="mt-1 text-[10px] text-zinc-500 sm:text-xs">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        {/* Stats */}

        <section className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-[#14171d]">
          <div className="grid grid-cols-3">

            <div className="px-4 py-10 sm:px-6">
              <p className="text-[12px] uppercase tracking-wide text-zinc-500">
                Exercises
              </p>

              <p className="mt-1 font-oswald text-2xl font-bold leading-none text-lime-400 sm:text-5xl">
                {totalExercises}
              </p>
            </div>

            <div className="border-x border-zinc-800 px-4 py-10 sm:px-6">
              <p className="text-[12px] uppercase tracking-wide text-zinc-500">
                Minutes
              </p>

              <p className="mt-1 font-oswald text-2xl font-bold leading-none text-white sm:text-5xl">
                {totalMinutes}
              </p>
            </div>

            <div className="px-4 py-10 sm:px-6">
              <p className="text-[12px] uppercase tracking-wide text-zinc-500">
                Calories
              </p>

              <p className="mt-1 font-oswald text-2xl font-bold leading-none text-white sm:text-5xl">
                {totalCalories}
              </p>
            </div>

          </div>
        </section>

        {/* Tabs + Sort */}

        <section className="mt-4 flex flex-wrap items-center justify-between gap-3">

          {/* Tabs */}

          <div className="flex items-center rounded-lg border border-zinc-800 bg-[#14171d] p-2">

            <Link
              href="/my-plan/today-plan"
              className={`rounded-md px-3 py-1.5 text-[14px] font-medium transition ${
                isTodayPlan
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Today&apos;s Plan
            </Link>

            <Link
              href="/my-plan/saved"
              className={`rounded-md px-3 py-1.5 text-[14px] font-medium transition ${
                isSaved
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Saved
            </Link>

          </div>

          {/* Sort */}

          <SortControl />

        </section>

        {/* Page Content */}

        <section className="mt-4">
          {children}
        </section>

      </div>
    </main>
  );
};

export default MyPlanLayout;