import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { BookHeart, Trash2 } from 'lucide-react';
import useFavourites from '@/hooks/useFavourites';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { confirmAction } from '@/lib/confirm';
import { DashboardPage, EmptyState, Panel } from '@/components/dashboard/DashboardKit';
import Reveal from '@/components/shared/Reveal';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const MyFavourites = () => {
  const [favourites, refetch, isLoading] = useFavourites();
  const axiosSecure = useAxiosSecure();

  const handleDeleteFavourite = async (item) => {
    const ok = await confirmAction({ title: `Remove ${item.favouriteName}?`, text: 'They will be removed from your favourites.', confirmText: 'Remove' });
    if (!ok) return;
    try {
      const res = await axiosSecure.delete(`/favourites/${item._id}`);
      if (res.data.deletedCount > 0) {
        toast.success('Removed from favourites');
        refetch();
      }
    } catch {
      toast.error("Couldn't remove this favourite.");
    }
  };

  return (
    <DashboardPage title="Favourites" description="Profiles you've saved to revisit.">
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-3xl" />)}
        </div>
      ) : favourites.length === 0 ? (
        <Panel>
          <EmptyState
            icon={BookHeart}
            title="No favourites yet"
            description="Tap the heart on any profile to save it here."
            action={<Button asChild><Link to="/biodatas">Browse profiles</Link></Button>}
          />
        </Panel>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favourites.map((item, i) => (
            <Reveal key={item._id} delay={i * 0.04} className="group flex items-center gap-4 rounded-3xl bg-card p-4 shadow-soft transition hover:shadow-lift">
              <Link to={`/biodatas/${item.favouriteId}`} className="flex min-w-0 flex-1 items-center gap-4">
                <img src={item.favouriteProfileImage} alt={item.favouriteName} className="h-20 w-16 shrink-0 rounded-2xl object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-medium group-hover:text-primary">{item.favouriteName}</p>
                  <p className="text-sm text-muted-foreground">Biodata #{item.favouriteBiodataId}</p>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Remove ${item.favouriteName} from favourites`}
                onClick={() => handleDeleteFavourite(item)}
                className="shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 />
              </Button>
            </Reveal>
          ))}
        </div>
      )}
    </DashboardPage>
  )
}

export default MyFavourites
