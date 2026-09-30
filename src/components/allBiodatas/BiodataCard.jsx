import { Link } from "react-router-dom";
import { Briefcase, Crown, Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import useToggleFavourite from "@/hooks/useToggleFavourite";
import { calculateAge, occupationLabel } from "@/lib/biodata";
import { cn } from "@/lib/utils";

const BiodataCard = ({ biodata, className }) => {
  const age = calculateAge(biodata.dob);
  const { isFavourite, toggle, isPending, isOwn } = useToggleFavourite(biodata);

  return (
    <article className={cn("group relative overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift", className)}>
      <Link to={`/biodatas/${biodata._id}`} className="block focus-visible:outline-none" aria-label={`View ${biodata.name}'s profile`}>
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={biodata.profileImage}
            alt={biodata.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-plum-950/90 via-plum-950/10 to-transparent" />

          <div className="absolute left-4 top-4 flex gap-2">
            {biodata.isPremium && (
              <Badge variant="premium" className="shadow-soft"><Crown /> Premium</Badge>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">ID #{biodata.biodataId}</p>
            <h3 className="mt-1 text-2xl font-medium leading-tight">
              {biodata.name}{age ? <span className="font-light text-white/80">, {age}</span> : null}
            </h3>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/85">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{biodata.permanentDivision}</span>
              {occupationLabel(biodata.occupation) && (
                <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{occupationLabel(biodata.occupation)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {!isOwn && (
        <button
          type="button"
          onClick={toggle}
          disabled={isPending}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? `Remove ${biodata.name} from favourites` : `Save ${biodata.name} to favourites`}
          className={cn(
            "absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95",
            isFavourite ? "bg-primary text-white shadow-glow" : "bg-white/25 text-white hover:bg-white/40"
          )}
        >
          <Heart className={cn("h-[18px] w-[18px] transition-transform", isFavourite && "fill-current")} />
        </button>
      )}
    </article>
  );
};

export const BiodataCardSkeleton = () => (
  <div className="overflow-hidden rounded-3xl bg-card shadow-soft">
    <Skeleton className="aspect-[4/5] w-full rounded-none" />
  </div>
);

export default BiodataCard;
