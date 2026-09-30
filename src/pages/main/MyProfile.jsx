import { Link } from "react-router-dom";
import { CalendarDays, Crown, Mail, ShieldCheck } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAdmin from "@/hooks/useAdmin";
import usePremium from "@/hooks/usePremium";
import { DashboardPage, Panel } from "@/components/dashboard/DashboardKit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { initials } from "@/lib/utils";

const MyProfile = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isPremium] = usePremium();

  const role = isAdmin ? "Admin" : isPremium ? "Premium member" : "Member";
  const joined = user?.metadata?.creationTime && new Date(user.metadata.creationTime).toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <DashboardPage title="My profile" description="Your account details.">
      <Panel>
        <div className="h-32 bg-gradient-to-r from-primary via-plum-700 to-plum-900" />
        <div className="px-6 pb-8">
          <div className="-mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <Avatar className="h-28 w-28 ring-4 ring-white shadow-lift">
              <AvatarImage src={user?.photoURL} alt={user?.displayName} />
              <AvatarFallback className="text-2xl">{initials(user?.displayName)}</AvatarFallback>
            </Avatar>
            {!isAdmin && (
              <Button asChild variant="outline">
                <Link to="/dashboard/manage-biodata">Edit biodata</Link>
              </Button>
            )}
          </div>
          <h2 className="mt-5 text-3xl font-light">{user?.displayName || "Unnamed member"}</h2>
          <Badge variant={isAdmin ? "secondary" : isPremium ? "premium" : "outline"} className="mt-2">
            {isAdmin ? <ShieldCheck /> : isPremium ? <Crown /> : null} {role}
          </Badge>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-muted/60 p-4">
              <Mail className="h-5 w-5 text-primary" />
              <div className="min-w-0">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Email</dt>
                <dd className="truncate font-medium">{user?.email}</dd>
              </div>
            </div>
            {joined && (
              <div className="flex items-center gap-3 rounded-2xl bg-muted/60 p-4">
                <CalendarDays className="h-5 w-5 text-primary" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Member since</dt>
                  <dd className="font-medium">{joined}</dd>
                </div>
              </div>
            )}
          </dl>
        </div>
      </Panel>
    </DashboardPage>
  );
};

export default MyProfile;
