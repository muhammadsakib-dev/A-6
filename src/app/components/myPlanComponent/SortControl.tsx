"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const SortControl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "duration";

  const handleSortChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-[12px] text-zinc-500">
        Sort By
      </span>

      <select
        value={currentSort}
        onChange={handleSortChange}
        className="h-7 rounded-md border border-zinc-800 bg-[#14171d] px-4 text-[14px] text-zinc-300 outline-none"
      >
        <option value="duration">Duration</option>
        <option  value="calories">Calories</option>
        <option  value="rating">Rating</option>
      </select>
    </div>
  );
};

export default SortControl;