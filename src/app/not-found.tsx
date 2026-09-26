import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="font-oswald text-7xl font-bold text-(--primary-color)">
          404
        </p>

        <h1 className="mt-4 font-oswald text-2xl uppercase text-white">
          Page Not Found
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-(--primary-color) px-6 py-3 text-sm font-bold uppercase text-black transition hover:brightness-90"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
};

export default NotFound;