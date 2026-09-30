import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { MailQuestion, Trash2 } from 'lucide-react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useContactRequest from '@/hooks/useContactRequests';
import { confirmAction } from '@/lib/confirm';
import { statusBadgeVariant } from '@/lib/utils';
import { DashboardPage, EmptyState, Panel } from '@/components/dashboard/DashboardKit';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const MyContactRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { requests, refetch, isLoading } = useContactRequest();

    const handleDelete = async (id) => {
        const ok = await confirmAction({ title: 'Delete this request?', text: 'Your payment is not refunded when a request is deleted.', confirmText: 'Delete' });
        if (!ok) return;
        try {
            const res = await axiosSecure.delete(`/contact-requests/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success('Request deleted');
                refetch();
            }
        } catch {
            toast.error("Couldn't delete the request.");
        }
    };

    return (
        <DashboardPage title="Contact requests" description="Contact details appear here once an admin approves your request.">
            <Panel>
                {isLoading ? (
                    <div className="space-y-3 p-6">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 rounded-xl" />)}</div>
                ) : requests.length === 0 ? (
                    <EmptyState
                        icon={MailQuestion}
                        title="No requests yet"
                        description="Found someone special? Request their contact details from their profile page."
                        action={<Button asChild><Link to="/biodatas">Browse profiles</Link></Button>}
                    />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Biodata</TableHead>
                                <TableHead>Mobile</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((req) => {
                                const approved = req.status === 'approved';
                                return (
                                    <TableRow key={req._id}>
                                        <TableCell className="font-semibold">
                                            #{req.biodataId}
                                            {req.name && <span className="block text-xs font-normal text-muted-foreground">{req.name}</span>}
                                        </TableCell>
                                        <TableCell className={approved ? '' : 'text-muted-foreground'}>{approved ? req.mobileNumber : 'Hidden until approved'}</TableCell>
                                        <TableCell className={approved ? '' : 'text-muted-foreground'}>{approved ? (req.contactEmail || '—') : '—'}</TableCell>
                                        <TableCell>
                                            <Badge variant={statusBadgeVariant[req.status] || 'secondary'} className="capitalize">{req.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" aria-label="Delete request" onClick={() => handleDelete(req._id)} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                                                <Trash2 />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </Panel>
        </DashboardPage>
    );
};

export default MyContactRequest;
