"use client";
import { Suspense, useMemo } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useWorkout } from "@/context/WorkoutContextData";
import SortControl from "@/app/components/myPlanComponent/SortControl";

const MyPlanLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const pathname = usePathname();

  const { workouts, plan, saved } = useWorkout();

  const isTodayPlan = pathname === "/myPlan/todayPlan";
  const isSaved = pathname === "/myPlan/saved";

  /*
   * ==========================
   * Current List
   * ==========================
   */

  /*
   * ==========================
   * Current Workouts
   * ==========================
   */

  const currentWorkouts = useMemo(() => {
    const currentIds = isTodayPlan ? plan : isSaved ? saved : [];

    return workouts.filter((workout) =>
      currentIds.includes(Number(workout.id)),
    );
  }, [workouts, isTodayPlan, isSaved, plan, saved]);

  /*
   * ==========================
   * Stats
   * ==========================
   */

  const totalExercises = currentWorkouts.length;

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + Number(workout.duration),
    0,
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + Number(workout.caloriesBurned),
    0,
  );

  return (
    <main className="min-h-screen bg-[#0f1014] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-375">
        {/* ==========================
            Header
        ========================== */}

        <header>
          <h1 className="font-oswald text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            My Plan
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        {/* ==========================
            Stats
        ========================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-[#14171d]">
          <div className="grid grid-cols-3">
            {/* Exercises */}

            <div className="px-4 py-7 sm:px-7 sm:py-6">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 sm:text-sm">
                Exercises
              </p>

              <p className="mt-2 font-oswald text-4xl font-bold leading-none text-lime-400 sm:text-5xl">
                {totalExercises}
              </p>
            </div>

            {/* Minutes */}

            <div className="border-x border-zinc-800 px-4 py-7 sm:px-7 sm:py-6">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 sm:text-sm">
                Minutes
              </p>

              <p className="mt-2 font-oswald text-4xl font-bold leading-none text-white sm:text-5xl">
                {totalMinutes}
              </p>
            </div>

            {/* Calories */}

            <div className="px-4 py-7 sm:px-7 sm:py-6">
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 sm:text-sm">
                Calories
              </p>

              <p className="mt-2 font-oswald text-4xl font-bold leading-none text-white sm:text-5xl">
                {totalCalories}
              </p>
            </div>
          </div>
        </section>

        {/* ==========================
            Tabs + Sort
        ========================== */}

        <section className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}

          <div className="flex w-fit items-center rounded-xl border border-zinc-800 bg-[#14171d] p-1.5">
            <Link
              href="/myPlan/todayPlan"
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                isTodayPlan
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Today&apos;s Plan
            </Link>

            <Link
              href="/myPlan/saved"
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                isSaved
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Saved
            </Link>
          </div>

          {/* Sort */}

          <Suspense
            fallback={
              <div className="h-10 w-32 animate-pulse rounded-lg bg-zinc-800" />
            }
          >
            <SortControl />
          </Suspense>
        </section>

        {/* ==========================
            Page Content
        ========================== */}

        <section className="mt-6">{children}</section>
      </div>
    </main>
  );
};

export default MyPlanLayout;
