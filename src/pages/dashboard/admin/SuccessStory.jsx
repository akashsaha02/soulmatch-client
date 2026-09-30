import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Eye, Heart, Star } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { DashboardPage, EmptyState, Panel } from "@/components/dashboard/DashboardKit";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const AdminSuccessStory = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedStory, setSelectedStory] = useState(null);

  const { data: successStories = [], isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: async () => (await axiosSecure.get("/success-stories")).data,
  });

  const couple = (s) => `${s.selfDetails?.name?.split(" ")[0] ?? "—"} & ${s.partnerDetails?.name?.split(" ")[0] ?? "—"}`;

  return (
    <DashboardPage title="Success stories" description={`${successStories.length} couples have shared their story`}>
      <Panel>
        {isLoading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}</div>
        ) : successStories.length === 0 ? (
          <EmptyState icon={Heart} title="No stories yet" description="Stories shared by married members will appear here." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Couple</TableHead>
                <TableHead>Biodata IDs</TableHead>
                <TableHead>Married</TableHead>
                <TableHead className="text-right">Story</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {successStories.map((story) => (
                <TableRow key={story._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={story.coupleImage} alt="" className="h-10 w-10 rounded-xl object-cover" />
                      <span className="font-semibold">{couple(story)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">#{story.selfBiodataId} · #{story.partnerBiodataId}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {story.marriageDate ? new Date(story.marriageDate).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="soft" size="sm" onClick={() => setSelectedStory(story)}><Eye /> View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Panel>

      <Dialog open={!!selectedStory} onOpenChange={(open) => !open && setSelectedStory(null)}>
        <DialogContent className="max-w-xl p-0">
          {selectedStory && (
            <>
              {selectedStory.coupleImage && (
                <img src={selectedStory.coupleImage} alt="" className="aspect-[16/9] w-full rounded-t-3xl object-cover" />
              )}
              <div className="space-y-4 p-6 pt-2">
                <DialogHeader>
                  <DialogTitle>{couple(selectedStory)}</DialogTitle>
                  <DialogDescription>
                    Biodata #{selectedStory.selfBiodataId} & #{selectedStory.partnerBiodataId}
                    {selectedStory.marriageDate && ` · Married ${new Date(selectedStory.marriageDate).toLocaleDateString()}`}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-1" aria-label={`Rated ${Math.round(selectedStory.rating / 2)} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("h-4 w-4", i < Math.round(selectedStory.rating / 2) ? "fill-gold-400 text-gold-400" : "text-border")} />
                  ))}
                </div>
                <p className="font-display text-lg leading-relaxed text-foreground/90">{selectedStory.successStory}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardPage>
  );
};

export default AdminSuccessStory;
