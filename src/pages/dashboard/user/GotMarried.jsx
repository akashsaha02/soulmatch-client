import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Gem, Loader2, Star } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useMyBiodata from "@/hooks/useMyBiodata";
import { DashboardPage, EmptyState, Panel } from "@/components/dashboard/DashboardKit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const Field = ({ label, htmlFor, error, className, children }) => (
  <div className={cn("space-y-2", className)}>
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
    {error && <p className="text-xs text-destructive">{error.message}</p>}
  </div>
);

// 5-star picker; stored as a score out of 10 to match existing stories.
const StarRating = ({ value = 0, onChange }) => {
  const [hover, setHover] = useState(0);
  const stars = Math.round(value / 2);
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={stars === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n * 2)}
          className="rounded-md p-0.5 transition-transform hover:scale-110"
        >
          <Star className={cn("h-8 w-8 transition-colors", n <= (hover || stars) ? "fill-gold-400 text-gold-400" : "text-border")} />
        </button>
      ))}
    </div>
  );
};

const GotMarried = () => {
  const axiosSecure = useAxiosSecure();
  const [myBiodata, loading] = useMyBiodata();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { rating: 10 } });

  useEffect(() => {
    if (myBiodata) setValue("selfBiodataId", myBiodata.biodataId);
  }, [myBiodata, setValue]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.post("/success-stories", data);
      toast.success("Congratulations! 🎉", { description: "Your success story has been shared." });
      reset({ selfBiodataId: myBiodata?.biodataId, rating: 10 });
    } catch (error) {
      toast.error(error.response?.status === 404 ? "We couldn't find that partner biodata ID." : "Failed to submit your story.");
    }
  };

  if (!loading && !myBiodata) {
    return (
      <DashboardPage title="Got married">
        <Panel>
          <EmptyState
            icon={Gem}
            title="Create your biodata first"
            description="You need a biodata before you can share a success story."
            action={<Button asChild><Link to="/dashboard/manage-biodata">Create biodata</Link></Button>}
          />
        </Panel>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage title="Got married?" description="Congratulations! Share your story to inspire others on their journey.">
      <Panel bodyClassName="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
          <Field label="Your biodata ID" htmlFor="selfBiodataId">
            <Input id="selfBiodataId" readOnly className="bg-muted" {...register("selfBiodataId")} />
          </Field>
          <Field label="Partner's biodata ID" htmlFor="partnerBiodataId" error={errors.partnerBiodataId}>
            <Input id="partnerBiodataId" inputMode="numeric" placeholder="e.g. 42" {...register("partnerBiodataId", { required: "Partner biodata ID is required" })} />
          </Field>
          <Field label="Marriage date" htmlFor="marriageDate" error={errors.marriageDate}>
            <Input type="date" id="marriageDate" max={new Date().toISOString().split("T")[0]} {...register("marriageDate", { required: "Marriage date is required" })} />
          </Field>
          <Field label="Couple photo URL" htmlFor="coupleImage" error={errors.coupleImage}>
            <Input type="url" id="coupleImage" placeholder="https://…" {...register("coupleImage", { required: "Image URL is required" })} />
          </Field>
          <Field label="Your story" htmlFor="successStory" error={errors.successStory} className="md:col-span-2">
            <Textarea id="successStory" rows={5} placeholder="How did you meet? What made you say yes?" {...register("successStory", { required: "Success story is required" })} />
          </Field>
          <Field label="How was your experience with SoulMatch?" className="md:col-span-2">
            <Controller name="rating" control={control} render={({ field }) => <StarRating value={field.value} onChange={field.onChange} />} />
          </Field>
          <div className="md:col-span-2">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Gem />} Share our story
            </Button>
          </div>
        </form>
      </Panel>
    </DashboardPage>
  );
};

export default GotMarried;
