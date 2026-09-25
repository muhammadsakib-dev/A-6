"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useWorkout } from "@/context/WorkoutContextData";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  const navItemStyle =
    "btn btn-ghost h-9 min-h-9 rounded-full px-5 text-sm font-medium leading-none  hover:bg-transparent hover:text-white hover:border-lime-400";

  const activeNavStyle =
    "bg-lime-400/20 text-lime-100 hover:border-lime-400 hover:text-lime-400";

  const navItems = (
    <>
      <li>
        <Link
          href="/"
          className={`${navItemStyle} ${
            pathname === "/" ? activeNavStyle : ""
          }`}
        >
          Workouts
        </Link>
      </li>

      <li>
        <Link
          href="/my-plan/today-plan"
          className={`${navItemStyle} ${
            pathname.startsWith("/my-plan") ? activeNavStyle : ""
          }`}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950 text-zinc-400 shadow-md">
      <div className="navbar mx-auto min-h-22 max-w-375 px-4 sm:px-6 lg:px-8">

        {/* Logo / Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open menu"
              className="btn btn-ghost btn-square text-zinc-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-zinc-800 bg-zinc-950 p-2 text-zinc-400 shadow-xl"
            >
              {navItems}
            </ul>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="btn btn-ghost gap-2 px-2 text-xl text-white hover:bg-transparent items-center"
          >
            <Image
              src="/logo.png"
              alt="FITLOG"
              width={30}
              height={30}
              priority
            />

            <span className="font-oswald text-3xl font-bold tracking-wide text-white">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-3 p-0">
            {navItems}
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-1 sm:gap-3">

          {/* Plan */}
          <Link
            href="/my-plan/today-plan"
            className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white sm:px-3"
          >
            <span>Plan</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-lime-400 px-1.5 text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan/saved"
            className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white sm:px-3"
          >
            <span>Saved</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-zinc-700 px-1.5 text-xs text-zinc-400">
              {saved.length}
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;