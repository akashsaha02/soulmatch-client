import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import {
  ArrowLeft, Briefcase, CakeSlice, Crown, Heart, Lock, Mail, MapPin, Phone, Ruler, Users,
} from 'lucide-react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import usePremium from '@/hooks/usePremium';
import useToggleFavourite from '@/hooks/useToggleFavourite';
import Loader from '@/components/shared/Loader';
import Reveal from '@/components/shared/Reveal';
import BiodataRecomendation from '@/components/allBiodatas/BiodataRecomendation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { calculateAge, occupationLabel } from '@/lib/biodata';
import { cn } from '@/lib/utils';

const valueOf = (v) => (v && typeof v === 'object' ? v.value ?? v.label : v);

const InfoCard = ({ title, icon: Icon, rows, delay }) => (
  <Reveal delay={delay} className="rounded-3xl bg-card p-6 shadow-soft md:p-8">
    <h2 className="flex items-center gap-3 text-xl font-medium">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary">
        <Icon className="h-4 w-4 text-primary" />
      </span>
      {title}
    </h2>
    <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
      {rows.filter((r) => r.value !== undefined && r.value !== null && r.value !== '').map((row) => (
        <div key={row.label}>
          <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{row.label}</dt>
          <dd className="mt-1 font-medium">{row.value}</dd>
        </div>
      ))}
    </dl>
  </Reveal>
);

const BiodataDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isPremium] = usePremium();

  const { data: biodata, isLoading } = useQuery({
    queryKey: ['biodata', id],
    queryFn: async () => (await axiosSecure.get(`/biodatas/details/${id}`)).data,
  });

  const { isFavourite, toggle, isPending, isOwn } = useToggleFavourite(biodata);

  if (isLoading) return <Loader />;

  if (!biodata) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-light">Profile not found</h1>
        <p className="mt-2 text-muted-foreground">This biodata may have been removed.</p>
        <Button asChild className="mt-6"><Link to="/biodatas">Browse profiles</Link></Button>
      </div>
    );
  }

  const {
    _id, name, profileImage, biodataType, dob, fatherName, motherName, height, weight, occupation,
    partnerAge, partnerHeight, partnerWeight, permanentDivision, presentDivision, mobileNumber,
    biodataId, race, userEmail,
  } = biodata;
  const age = calculateAge(dob);

  return (
    <div className="pb-24">
      <Helmet>
        <title>{name} | SoulMatch</title>
      </Helmet>

      <div className="container-page pt-8">
        <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground">
          <Link to="/biodatas"><ArrowLeft /> Back to profiles</Link>
        </Button>
      </div>

      <div className="container-page mt-4 grid gap-8 lg:grid-cols-[380px_1fr] lg:gap-12">
        {/* Sticky profile + action card */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="overflow-hidden rounded-[2rem] bg-card shadow-lift">
            <div className="relative aspect-[4/5]">
              <img src={profileImage} alt={name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-plum-950/80 via-transparent to-transparent" />
              <div className="absolute left-5 top-5 flex gap-2">
                <Badge variant="glass">ID #{biodataId}</Badge>
                {biodata.isPremium && <Badge variant="premium"><Crown /> Premium</Badge>}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h1 className="text-3xl font-medium md:text-4xl">
                  {name}{age ? <span className="font-light text-white/80">, {age}</span> : null}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-white/85">
                  <MapPin className="h-4 w-4" /> {permanentDivision}
                  {occupationLabel(occupation) && <><span className="mx-1.5">·</span><Briefcase className="h-4 w-4" /> {occupationLabel(occupation)}</>}
                </p>
              </div>
            </div>

            <div className="space-y-3 p-5">
              {isOwn ? (
                <Button asChild variant="soft" size="lg" className="w-full">
                  <Link to="/dashboard/manage-biodata">This is your profile — edit it</Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant={isFavourite ? 'soft' : 'default'}
                  className="w-full"
                  onClick={toggle}
                  disabled={isPending}
                  aria-pressed={isFavourite}
                >
                  <Heart className={cn(isFavourite && 'fill-current')} />
                  {isFavourite ? 'Saved to favourites' : 'Add to favourites'}
                </Button>
              )}
            </div>
          </Reveal>
        </aside>

        {/* Details */}
        <div className="space-y-6">
          <InfoCard
            title="About"
            icon={Users}
            rows={[
              { label: 'Gender', value: biodataType },
              { label: 'Date of birth', value: dob && new Date(dob).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) },
              { label: 'Occupation', value: occupationLabel(occupation) },
              { label: 'Race', value: race },
              { label: 'Present division', value: presentDivision },
              { label: 'Permanent division', value: permanentDivision },
            ]}
          />

          <InfoCard
            title="Family & appearance"
            icon={Ruler}
            delay={0.05}
            rows={[
              { label: "Father's name", value: fatherName },
              { label: "Mother's name", value: motherName },
              { label: 'Height', value: valueOf(height) },
              { label: 'Weight', value: valueOf(weight) && `${valueOf(weight)} kg` },
            ]}
          />

          <InfoCard
            title="Partner expectations"
            icon={CakeSlice}
            delay={0.1}
            rows={[
              { label: 'Preferred age', value: valueOf(partnerAge) && `${valueOf(partnerAge)} years` },
              { label: 'Preferred height', value: valueOf(partnerHeight) },
              { label: 'Preferred weight', value: valueOf(partnerWeight) && `${valueOf(partnerWeight)} kg` },
            ]}
          />

          {/* Contact information: visible to premium members, otherwise locked behind a request */}
          <Reveal delay={0.15} className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-soft md:p-8">
            <h2 className="flex items-center gap-3 text-xl font-medium">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary">
                <Phone className="h-4 w-4 text-primary" />
              </span>
              Contact information
            </h2>

            <div className={cn('mt-6 grid gap-5 sm:grid-cols-2', !(isPremium || isOwn) && 'select-none blur-sm')} aria-hidden={!(isPremium || isOwn)}>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Mobile</p>
                <p className="mt-1 flex items-center gap-2 font-medium"><Phone className="h-4 w-4 text-muted-foreground" />{isPremium || isOwn ? mobileNumber : '+880 1XXX-XXXXXX'}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="mt-1 flex items-center gap-2 font-medium"><Mail className="h-4 w-4 text-muted-foreground" />{isPremium || isOwn ? userEmail : 'hidden@example.com'}</p>
              </div>
            </div>

            {!(isPremium || isOwn) && (
              <div className="absolute inset-0 top-16 flex flex-col items-center justify-center gap-3 bg-white/40 px-6 text-center">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-plum-900 text-white"><Lock className="h-5 w-5" /></span>
                <p className="max-w-sm text-sm text-muted-foreground">Contact details are private. Request access for a one-time $5 fee, or go premium.</p>
                <Button asChild>
                  <Link to={`/checkout/${biodataId}`}>Request contact information</Link>
                </Button>
              </div>
            )}
          </Reveal>
        </div>
      </div>

      <BiodataRecomendation type={biodataType} excludeId={_id} />
    </div>
  );
};

export default BiodataDetails;
