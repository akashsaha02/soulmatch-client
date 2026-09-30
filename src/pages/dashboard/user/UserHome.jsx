import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BookHeart, Crown, Hourglass, Loader2, MailQuestion, PencilLine, Sparkles, UserRoundPlus } from "lucide-react";
import useMyBiodata from "@/hooks/useMyBiodata";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import useFavourites from "@/hooks/useFavourites";
import useContactRequest from "@/hooks/useContactRequests";
import { DashboardPage, EmptyState, Panel, StatCard } from "@/components/dashboard/DashboardKit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateAge, occupationLabel } from "@/lib/biodata";

const valueOf = (v) => (v && typeof v === "object" ? v.value ?? v.label : v);

const UserHome = () => {
  const { user } = useAuth();
  const [myBiodata, loading] = useMyBiodata();
  const [favourites] = useFavourites();
  const { requests } = useContactRequest();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: premiumRequests = [] } = useQuery({
    queryKey: ["my-premium-request", user?.email],
    enabled: !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/request-premium/${user.email}`)).data,
  });
  const pendingPremium = premiumRequests.some((r) => r.status === "pending");

  const requestPremium = useMutation({
    mutationFn: (id) => axiosSecure.post(`/request-premium/${id}`),
    onSuccess: () => {
      toast.success("Premium request sent", { description: "An admin will review it shortly." });
      queryClient.invalidateQueries({ queryKey: ["my-premium-request", user?.email] });
    },
    onError: (err) => toast.error(err.response?.data?.message || "You've already requested premium."),
  });

  if (loading) {
    return (
      <DashboardPage title="Overview">
        <div className="grid gap-4 sm:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-3xl" />)}</div>
        <Skeleton className="mt-6 h-80 rounded-3xl" />
      </DashboardPage>
    );
  }

  if (!myBiodata) {
    return (
      <DashboardPage title="Overview" description="Let's get your profile ready.">
        <Panel>
          <EmptyState
            icon={UserRoundPlus}
            title="You haven't created a biodata yet"
            description="Your biodata is how others discover you. It only takes a few minutes to complete."
            action={<Button asChild size="lg"><Link to="/dashboard/manage-biodata">Create biodata</Link></Button>}
          />
        </Panel>
      </DashboardPage>
    );
  }

  const {
    _id, name, profileImage, biodataType, dob, fatherName, motherName, height, weight, occupation,
    partnerAge, partnerHeight, partnerWeight, permanentDivision, presentDivision, mobileNumber, race,
    userEmail, isPremium, biodataId,
  } = myBiodata;

  const sections = [
    {
      title: "Personal",
      rows: [
        ["Gender", biodataType],
        ["Date of birth", dob && new Date(dob).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })],
        ["Occupation", occupationLabel(occupation)],
        ["Race", race],
        ["Height", valueOf(height)],
        ["Weight", valueOf(weight) && `${valueOf(weight)} kg`],
        ["Father's name", fatherName],
        ["Mother's name", motherName],
      ],
    },
    {
      title: "Location & contact",
      rows: [
        ["Present division", presentDivision],
        ["Permanent division", permanentDivision],
        ["Mobile", mobileNumber],
        ["Email", userEmail],
      ],
    },
    {
      title: "Partner expectations",
      rows: [
        ["Age", valueOf(partnerAge) && `${valueOf(partnerAge)} years`],
        ["Height", valueOf(partnerHeight)],
        ["Weight", valueOf(partnerWeight) && `${valueOf(partnerWeight)} kg`],
      ],
    },
  ];

  return (
    <DashboardPage
      title="Overview"
      description="Your biodata at a glance."
      actions={<Button asChild variant="outline"><Link to="/dashboard/manage-biodata"><PencilLine /> Edit biodata</Link></Button>}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={BookHeart} label="Favourites" value={favourites.length} />
        <StatCard icon={MailQuestion} label="Contact requests" value={requests.length} tone="plum" delay={0.05} />
        <StatCard icon={Crown} label="Membership" value={isPremium ? "Premium" : "Free"} tone="gold" delay={0.1} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <Panel>
            <div className="relative aspect-[4/5]">
              <img src={profileImage} alt={name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/85 via-transparent to-transparent" />
              {isPremium && <Badge variant="premium" className="absolute left-4 top-4"><Crown /> Premium</Badge>}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">ID #{biodataId}</p>
                <h2 className="mt-1 text-2xl font-medium">{name}{calculateAge(dob) ? `, ${calculateAge(dob)}` : ""}</h2>
              </div>
            </div>
          </Panel>

          {!isPremium && (
            <div className="relative overflow-hidden rounded-3xl bg-plum-950 p-6 text-white">
              <Sparkles className="absolute -right-2 -top-2 h-24 w-24 text-white/5" />
              <h3 className="text-xl font-medium">Go premium</h3>
              <p className="mt-2 text-sm text-plum-300">Get featured on the home page and stand out in search results.</p>
              {pendingPremium ? (
                <p className="mt-5 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm">
                  <Hourglass className="h-4 w-4 text-gold-300" /> Request pending review
                </p>
              ) : (
                <Button
                  className="mt-5 w-full bg-gradient-to-r from-gold-300 to-gold-500 text-plum-950 hover:opacity-90"
                  onClick={() => requestPremium.mutate(_id)}
                  disabled={requestPremium.isPending}
                >
                  {requestPremium.isPending ? <Loader2 className="animate-spin" /> : <Crown />} Request premium
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {sections.map((section) => (
            <Panel key={section.title} title={section.title} bodyClassName="p-6">
              <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {section.rows.filter(([, v]) => v).map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
                    <dd className="mt-1 break-words font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          ))}
        </div>
      </div>
    </DashboardPage>
  );
};

export default UserHome;
