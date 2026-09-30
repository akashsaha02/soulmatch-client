import { HeartCrack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import BiodataCard, { BiodataCardSkeleton } from "./BiodataCard";

const BiodatasList = ({ biodatas, isLoading, isFetching, page, totalPages, onPageChange, onReset }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => <BiodataCardSkeleton key={i} />)}
      </div>
    );
  }

  if (!biodatas.length) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-dashed bg-white px-6 py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-secondary">
          <HeartCrack className="h-7 w-7 text-primary" />
        </span>
        <h3 className="mt-5 text-2xl font-medium">No matches found</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Try widening the age range or choosing a different division. Your person might be just one filter away.
        </p>
        <Button className="mt-6" onClick={onReset}>Reset filters</Button>
      </div>
    );
  }

  return (
    <div>
      <div className={cn("grid grid-cols-1 gap-5 transition-opacity sm:grid-cols-2 xl:grid-cols-3", isFetching && "opacity-60")}>
        {biodatas.map((biodata) => (
          <BiodataCard key={biodata._id} biodata={biodata} />
        ))}
      </div>
      <Pagination className="mt-12" page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default BiodatasList;
