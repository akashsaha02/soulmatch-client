import { useState } from 'react';
import { toast } from 'sonner';
import { Check, Loader2, MailCheck } from 'lucide-react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useContactRequest from '@/hooks/useContactRequests';
import { confirmAction } from '@/lib/confirm';
import { statusBadgeVariant } from '@/lib/utils';
import { DashboardPage, EmptyState, Panel } from '@/components/dashboard/DashboardKit';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ApproveContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { requests, refetch, isLoading } = useContactRequest(true);
  const [approvingId, setApprovingId] = useState(null);

  const handleApprove = async (req) => {
    const ok = await confirmAction({
      title: 'Approve this request?',
      text: `${req.email} will see the contact details for biodata #${req.biodataId}.`,
      confirmText: 'Approve',
      icon: 'question',
    });
    if (!ok) return;
    setApprovingId(req._id);
    try {
      await axiosSecure.patch(`/admin/contact-requests/${req._id}`, { biodataId: req.biodataId });
      toast.success('Request approved');
      await refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve request.');
    } finally {
      setApprovingId(null);
    }
  };

  const pending = requests.filter((r) => r.status === 'pending').length;

  return (
    <DashboardPage title="Contact requests" description={`${pending} awaiting review`}>
      <Panel>
        {isLoading ? (
          <div className="space-y-3 p-6">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-xl" />)}</div>
        ) : requests.length === 0 ? (
          <EmptyState icon={MailCheck} title="No contact requests" description="Paid requests from members will appear here." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requested by</TableHead>
                <TableHead>Biodata</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req._id}>
                  <TableCell className="font-medium">{req.email}</TableCell>
                  <TableCell className="font-semibold">#{req.biodataId}</TableCell>
                  <TableCell><code className="rounded-md bg-muted px-2 py-1 text-xs">{req.transactionId}</code></TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant[req.status] || 'secondary'} className="capitalize">{req.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {req.status === 'pending' ? (
                      <Button size="sm" onClick={() => handleApprove(req)} disabled={approvingId === req._id}>
                        {approvingId === req._id ? <Loader2 className="animate-spin" /> : <Check />} Approve
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">Done</span>
                    )}
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

export default ApproveContactRequest;
