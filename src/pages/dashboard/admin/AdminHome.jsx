import { useQuery } from '@tanstack/react-query';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Crown, DollarSign, Heart, MailQuestion, ScrollText, UserRound, UserRoundCheck, Users } from 'lucide-react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { DashboardPage, Panel, StatCard } from '@/components/dashboard/DashboardKit';
import { Skeleton } from '@/components/ui/skeleton';

const CHART_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { data, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => (await axiosSecure.get('/admin/stats')).data,
    });

    if (isLoading || !data) {
        return (
            <DashboardPage title="Overview">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-3xl" />)}
                </div>
            </DashboardPage>
        );
    }

    const revenue = (data.totalRevenue / 100).toLocaleString(undefined, { style: 'currency', currency: 'USD' });

    const stats = [
        { label: "Total biodatas", value: data.biodatas, icon: ScrollText },
        { label: "Total users", value: data.users, icon: Users, tone: "plum" },
        { label: "Premium biodatas", value: data.premiumBiodatas, icon: Crown, tone: "gold" },
        { label: "Revenue", value: revenue, icon: DollarSign, tone: "sage" },
        { label: "Brides", value: data.femaleBiodataCount, icon: UserRoundCheck },
        { label: "Grooms", value: data.maleBiodataCount, icon: UserRound, tone: "sky" },
        { label: "Contact requests", value: data.contactRequests, icon: MailQuestion, tone: "plum" },
        { label: "Success stories", value: data.successStories, icon: Heart },
    ];

    // Premium is a subset of all biodatas, so split into male / female / premium share for the chart.
    const genderData = [
        { name: "Brides", value: data.femaleBiodataCount },
        { name: "Grooms", value: data.maleBiodataCount },
    ];
    const premiumData = [
        { name: "Premium", value: data.premiumBiodatas },
        { name: "Free", value: Math.max(data.biodatas - data.premiumBiodatas, 0) },
    ];

    const Donut = ({ data: rows, colors }) => (
        <div className="h-72">
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={rows} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="85%" paddingAngle={3} stroke="none">
                        {rows.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid hsl(var(--border))', boxShadow: '0 8px 24px -6px rgba(46,26,40,.12)' }} />
                    <Legend iconType="circle" verticalAlign="bottom" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );

    return (
        <DashboardPage title="Overview" description="How SoulMatch is doing today.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <StatCard key={stat.label} {...stat} delay={i * 0.04} />
                ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <Panel title="Biodatas by gender" description={`${data.biodatas} biodatas in total`} bodyClassName="p-4">
                    <Donut data={genderData} colors={CHART_COLORS} />
                </Panel>
                <Panel title="Premium share" description={`${data.premiumRequests} premium requests received`} bodyClassName="p-4">
                    <Donut data={premiumData} colors={[CHART_COLORS[2], 'hsl(var(--muted))']} />
                </Panel>
            </div>
        </DashboardPage>
    );
};

export default AdminHome;
