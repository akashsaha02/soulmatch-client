import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Search, SlidersHorizontal, X } from "lucide-react";
import useBiodataSearch from "@/hooks/useBiodataSearch";
import Filters, { AGE_MAX, AGE_MIN } from "@/components/allBiodatas/Filters";
import BiodatasList from "@/components/allBiodatas/BiodataList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const SORTS = [
  { value: "newest", label: "Newest first" },
  { value: "ageAsc", label: "Age: youngest first" },
  { value: "ageDesc", label: "Age: oldest first" },
  { value: "id", label: "Biodata ID" },
];

const clampAge = (value, fallback) => {
  const n = parseInt(value);
  return Number.isNaN(n) ? fallback : Math.min(Math.max(n, AGE_MIN), AGE_MAX);
};

const BiodatasPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // The URL is the single source of truth for filters, so results are shareable and the hero search can deep-link here.
  const filters = useMemo(() => ({
    gender: searchParams.get("gender") || "",
    division: searchParams.get("division") || "",
    premium: searchParams.get("premium") === "true",
    minAge: clampAge(searchParams.get("minAge"), AGE_MIN),
    maxAge: clampAge(searchParams.get("maxAge"), AGE_MAX),
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "newest",
    page: Math.max(parseInt(searchParams.get("page")) || 1, 1),
  }), [searchParams]);

  const { data, isLoading, isFetching, isError } = useBiodataSearch({
    page: filters.page,
    sort: filters.sort,
    ...(filters.gender && { gender: filters.gender }),
    ...(filters.division && { division: filters.division }),
    ...(filters.premium && { premium: true }),
    ...(filters.search && { search: filters.search }),
    ...(filters.minAge !== AGE_MIN && { minAge: filters.minAge }),
    ...(filters.maxAge !== AGE_MAX && { maxAge: filters.maxAge }),
  });

  // Accepts (key, value) or an object of updates. Any filter change resets to page 1.
  const updateParams = (keyOrUpdates, value) => {
    const updates = typeof keyOrUpdates === "string" ? { [keyOrUpdates]: value } : keyOrUpdates;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([k, v]) => {
        const isDefault =
          v === "" || v === false || v == null ||
          (k === "minAge" && v === AGE_MIN) || (k === "maxAge" && v === AGE_MAX) ||
          (k === "sort" && v === "newest") || (k === "page" && v === 1);
        if (isDefault) next.delete(k);
        else next.set(k, String(v));
      });
      if (!("page" in updates)) next.delete("page");
      return next;
    }, { replace: !("page" in updates) });
  };

  const resetFilters = () => {
    setSearchInput("");
    setSearchParams({});
  };

  // Debounced name search
  const [searchInput, setSearchInput] = useState(filters.search);
  useEffect(() => setSearchInput(filters.search), [filters.search]);
  useEffect(() => {
    if (searchInput === filters.search) return;
    const id = setTimeout(() => updateParams("search", searchInput.trim()), 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const changePage = (page) => {
    updateParams("page", page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chips = [
    filters.gender && { key: "gender", label: filters.gender === "Female" ? "Brides" : "Grooms" },
    filters.division && { key: "division", label: filters.division },
    filters.premium && { key: "premium", label: "Premium only" },
    (filters.minAge !== AGE_MIN || filters.maxAge !== AGE_MAX) && {
      key: "age",
      label: `Age ${filters.minAge}–${filters.maxAge}`,
      clear: { minAge: AGE_MIN, maxAge: AGE_MAX },
    },
    filters.search && { key: "search", label: `“${filters.search}”` },
  ].filter(Boolean);

  const filterPanel = <Filters filters={filters} onChange={updateParams} onReset={resetFilters} />;

  return (
    <div className="pb-24">
      <Helmet>
        <title>Browse profiles | SoulMatch</title>
      </Helmet>

      <header className="bg-rose-glow">
        <div className="container-page pb-10 pt-12 md:pt-16">
          <p className="eyebrow">Browse</p>
          <h1 className="mt-3 text-4xl font-light md:text-6xl">
            Discover your <em className="text-primary">match</em>
          </h1>
          <p className="mt-3 text-muted-foreground">
            {data ? `${data.total.toLocaleString()} ${data.total === 1 ? "profile" : "profiles"} match your preferences` : "Finding profiles…"}
          </p>
        </div>
      </header>

      <div className="container-page grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-3xl bg-card p-6 shadow-soft">
            <h2 className="mb-6 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Filters</h2>
            {filterPanel}
          </div>
        </aside>

        <section aria-label="Results" className="min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name"
                aria-label="Search by name"
                className="rounded-full pl-11"
              />
            </div>
            <div className="flex gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-11 flex-1 lg:hidden">
                    <SlidersHorizontal /> Filters{chips.length ? ` (${chips.length})` : ""}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[88%] overflow-y-auto rounded-r-3xl sm:max-w-sm">
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="font-display text-2xl font-medium">Filters</SheetTitle>
                  </SheetHeader>
                  {filterPanel}
                </SheetContent>
              </Sheet>
              <Select value={filters.sort} onValueChange={(v) => updateParams("sort", v)}>
                <SelectTrigger className="h-11 w-auto min-w-[190px] flex-1 rounded-full" aria-label="Sort by">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  {SORTS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {chips.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <Badge key={chip.key} variant="secondary" className="gap-1.5 py-1 pl-3 pr-1.5 text-sm font-medium">
                  {chip.label}
                  <button
                    type="button"
                    aria-label={`Remove ${chip.label} filter`}
                    onClick={() => {
                      if (chip.key === "search") setSearchInput("");
                      updateParams(chip.clear || { [chip.key]: "" });
                    }}
                    className="grid h-5 w-5 place-items-center rounded-full hover:bg-primary/10"
                  >
                    <X className="!size-3" />
                  </button>
                </Badge>
              ))}
              <button type="button" onClick={resetFilters} className="ml-1 text-sm font-medium text-primary hover:underline">
                Clear all
              </button>
            </div>
          )}

          <div className="mt-8">
            {isError ? (
              <p className="rounded-3xl bg-destructive/5 p-8 text-center text-destructive">
                We couldn&apos;t load profiles right now. Please refresh and try again.
              </p>
            ) : (
              <BiodatasList
                biodatas={data?.biodatas || []}
                isLoading={isLoading}
                isFetching={isFetching}
                page={filters.page}
                totalPages={data?.totalPages || 0}
                onPageChange={changePage}
                onReset={resetFilters}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BiodatasPage;
