import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DIVISIONS } from "@/lib/biodata";
import { cn } from "@/lib/utils";

export const AGE_MIN = 18;
export const AGE_MAX = 50;

const Filters = ({ filters, onChange, onReset, className }) => {
  // Keep the slider responsive while dragging; only commit to the URL on release.
  const [ages, setAges] = useState([filters.minAge, filters.maxAge]);
  useEffect(() => setAges([filters.minAge, filters.maxAge]), [filters.minAge, filters.maxAge]);

  return (
    <div className={cn("space-y-7", className)}>
      <div className="space-y-3">
        <Label>Looking for</Label>
        <div className="grid grid-cols-3 gap-1 rounded-full bg-muted p-1" role="radiogroup" aria-label="Gender">
          {[
            { value: "", label: "All" },
            { value: "Female", label: "Brides" },
            { value: "Male", label: "Grooms" },
          ].map((opt) => (
            <button
              key={opt.label}
              type="button"
              role="radio"
              aria-checked={filters.gender === opt.value}
              onClick={() => onChange("gender", opt.value)}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-all",
                filters.gender === opt.value ? "bg-white text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Age</Label>
          <span className="text-sm font-semibold tabular-nums text-primary">
            {ages[0]} – {ages[1]}
          </span>
        </div>
        <Slider
          min={AGE_MIN}
          max={AGE_MAX}
          step={1}
          minStepsBetweenThumbs={1}
          value={ages}
          onValueChange={setAges}
          onValueCommit={([min, max]) => onChange({ minAge: min, maxAge: max })}
          aria-label="Age range"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="filter-division">Division</Label>
        <Select value={filters.division || "any"} onValueChange={(v) => onChange("division", v === "any" ? "" : v)}>
          <SelectTrigger id="filter-division"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">All divisions</SelectItem>
            {DIVISIONS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <label htmlFor="filter-premium" className="flex cursor-pointer items-start gap-3 rounded-2xl border bg-white p-4 transition-colors hover:border-primary/40">
        <Checkbox
          id="filter-premium"
          checked={filters.premium}
          onCheckedChange={(checked) => onChange("premium", checked === true)}
          className="mt-0.5"
        />
        <span>
          <span className="block text-sm font-semibold">Premium members only</span>
          <span className="block text-xs text-muted-foreground">Verified, highly active profiles</span>
        </span>
      </label>

      <Button variant="outline" className="w-full" onClick={onReset}>
        <RotateCcw /> Reset filters
      </Button>
    </div>
  );
};

export default Filters;
