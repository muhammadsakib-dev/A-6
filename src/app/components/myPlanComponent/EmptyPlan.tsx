import Link from "next/link";
const EmptyPlan = () => {
  return (
    <div className="flex min-h-95 flex-col items-center justify-center rounded-2xl border border-dashed border-(--color-border) bg-(--color-background) px-6 py-12 text-center">
      <h2 className="font-oswald text-2xl font-bold uppercase text-(--color-text-primary)">
        Your page is empty
      </h2>

      <p className="mt-3 text-sm text-(--color-text-subtle)">
        Browse the workout library and add a lift to get today moving.
      </p>

      <Link
        href="/"
        className="mt-7 inline-flex h-10 items-center rounded-full bg-(--color-primary) px-6 text-sm font-bold text-black transition-colors hover:bg-(--color-primary-light)"
      >
        Go to workouts
      </Link>
    </div>
  );
};

export default EmptyPlan;