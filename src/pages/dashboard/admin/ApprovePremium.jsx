import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, Crown, Trash2 } from "lucide-react";
import usePremiumReq from "@/hooks/usePremiumRequests";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { confirmAction } from "@/lib/confirm";
import { statusBadgeVariant } from '@/lib/utils';
import { DashboardPage, EmptyState, Panel } from "@/components/dashboard/DashboardKit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ApprovePremium = () => {
  const { premiumReq, loading, refetchPremiumReq } = usePremiumReq();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const handleApprove = async (req) => {
    const ok = await confirmAction({ title: `Approve ${req.userName}?`, text: "Their biodata will be featured as premium.", confirmText: "Approve", icon: "question" });
    if (!ok) return;
    try {
      await axiosSecure.patch(`/admin/premium-requests/${req._id}/approve`, { userEmail: req.userEmail });
      toast.success(`${req.userName} is now premium`);
      refetchPremiumReq();
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    } catch {
      toast.error("Failed to approve request.");
    }
  };

  const handleDelete = async (req) => {
    const ok = await confirmAction({ title: "Delete this request?", text: `${req.userName}'s premium request will be removed.`, confirmText: "Delete" });
    if (!ok) return;
    try {
      const res = await axiosSecure.delete(`/admin/premium-requests/${req._id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Request deleted");
        refetchPremiumReq();
      }
    } catch {
      toast.error("Failed to delete request.");
    }
  };

  const pending = premiumReq.filter((r) => r.status === "pending").length;

  return (
    <DashboardPage title="Premium requests" description={`${pending} awaiting review`}>
      <Panel>
        {loading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-xl" />)}</div>
        ) : premiumReq.length === 0 ? (
          <EmptyState icon={Crown} title="No premium requests" description="New requests from members will appear here." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Biodata</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {premiumReq.map((req) => (
                <TableRow key={req._id}>
                  <TableCell>
                    <p className="font-semibold">{req.userName}</p>
                    <p className="text-xs text-muted-foreground">{req.userEmail}</p>
                  </TableCell>
                  <TableCell className="font-medium">#{req.biodataId}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant[req.status] || "secondary"} className="capitalize">{req.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      {req.status === "pending" && (
                        <Button size="sm" onClick={() => handleApprove(req)}><Check /> Approve</Button>
                      )}
                      <Button variant="ghost" size="icon" aria-label="Delete request" onClick={() => handleDelete(req)} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Panel>
    </DashboardPage>
  );
};

export default ApprovePremium;
