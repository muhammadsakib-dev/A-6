
interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <div className="flex min-h-14 items-center justify-between gap-4 border-b border-zinc-800 px-5 last:border-b-0 sm:px-6">
      <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <span className="text-sm font-medium text-zinc-200 sm:text-base">
        {value}
      </span>
    </div>
  );
};

export default DetailRow;

