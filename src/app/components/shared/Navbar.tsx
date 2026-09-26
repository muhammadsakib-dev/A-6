"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContextData";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  const navItemStyle =
    "btn btn-ghost h-9 min-h-9 rounded-full px-5 text-sm font-medium leading-none transition-colors";

  const activeNavStyle =
    "border border-(--color-primary)/30 bg-(--color-primary)/20 text-(--color-primary-light)";

  const isMyPlan = pathname.startsWith("/my-plan");

  const navItems = (
    <>
      <li>
        <Link
          href="/"
          className={`${navItemStyle} ${
            pathname === "/"
              ? activeNavStyle
              : "text-(--color-text-muted) hover:border-(--color-primary)/30 hover:bg-transparent hover:text-(--color-text-primary)"
          }`}
        >
          Workouts
        </Link>
      </li>

      <li>
        <Link
          href="/my-plan/today-plan"
          className={`${navItemStyle} ${
            isMyPlan
              ? activeNavStyle
              : "text-(--color-text-muted) hover:border-(--color-primary)/30 hover:bg-transparent hover:text-(--color-text-primary)"
          }`}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-(--navbar-border)
        bg-(--navbar-background)
        text-(--color-text-muted)
        shadow-md
      "
    >
      <div className="navbar mx-auto min-h-22 max-w-375 px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open menu"
              className="
                btn btn-ghost btn-square
                text-(--color-text-muted)
                hover:bg-transparent
                hover:text-(--color-text-primary)
              "
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
              className="
                menu dropdown-content z-50 mt-3 w-52 rounded-box
                border border-(--navbar-border)
                bg-(--navbar-background)
                p-2
                text-(--color-text-muted)
                shadow-xl
              "
            >
              {navItems}
            </ul>
          </div>

          <Link
            href="/"
            className="
              btn btn-ghost
              items-center gap-2 px-2
              text-xl
              text-(--color-text-primary)
              hover:bg-transparent
            "
          >
            <Image
              src="/logo.png"
              alt="FITLOG"
              width={30}
              height={30}
              priority
            />

            <span className="font-oswald text-3xl font-bold tracking-wide">
              FITLOG
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-3 p-0">
            {navItems}
          </ul>
        </div>

        <div className="navbar-end gap-1 sm:gap-3">
          <Link
            href="/my-plan/today-plan"
            className="
              flex items-center gap-2
              px-2 py-2 sm:px-3
              text-sm font-medium
              text-(--color-text-muted)
              transition-colors
              hover:text-(--color-text-primary)
            "
          >
            <span>Plan</span>

            <span
              className="
                flex h-6 min-w-6
                items-center justify-center
                rounded-full
                bg-(--badge-background)
                px-1.5
                text-xs font-bold
                text-(--badge-text)
              "
            >
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan/saved"
            className="
              flex items-center gap-2
              px-2 py-2 sm:px-3
              text-sm font-medium
              text-(--color-text-muted)
              transition-colors
              hover:text-(--color-text-primary)
            "
          >
            <span>Saved</span>

            <span
              className="
                flex h-6 min-w-6
                items-center justify-center
                rounded-full
                border border-(--color-border-light)
                px-1.5
                text-xs
                text-(--color-text-muted)
              "
            >
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;