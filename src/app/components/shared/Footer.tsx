import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex min-h-27.5 max-w-362.5 items-center justify-between px-6 py-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt="FITLOG"
            width={24}
            height={24}
          />

          <span className="font-oswald text-2xl font-bold tracking-wide text-white ">
            FITLOG
          </span>
        </Link>

        <p className="text-right text-sm text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;