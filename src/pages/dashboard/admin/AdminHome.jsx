import Loader from '@/components/shared/Loader';
import SectionTitleHome from '@/components/shared/SectionTitleHome';
import { axiosSecure } from '@/hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminHome = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        biodatas: 0,
        contactRequests: 0,
        premiumRequests: 0,
        successStories: 0,
        users: 0,
        maleBiodataCount: 0,
        femaleBiodataCount: 0,
        premiumBiodatas: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        async function fetchData() {
            const response = await axiosSecure.get('/admin/stats');
            if (response.data) {
                setData(response.data);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return <Loader/>

    const stats = [
        { label: "All Biodatas", value: data.biodatas, icon: "📝" },
        { label: "Contact Requests", value: data.contactRequests, icon: "📞" },
        { label: "Premium Requests", value: data.premiumRequests, icon: "⭐" },
        { label: "Success Stories", value: data.successStories, icon: "🎉" },
        { label: "Total Users", value: data.users, icon: "👥" },
        { label: "Premium Biodatas", value: data.premiumBiodatas, icon: "👑" },
        { label: "Male Biodata", value: data.maleBiodataCount, icon: "👨" },
        { label: "Female Biodata", value: data.femaleBiodataCount, icon: "👩" },
        { label: "Total Revenue", value: (data.totalRevenue / 100).toFixed(2), icon: "💵" },
    ];

    // Pie chart data for biodata
    const biodataChartData = [
        { name: "Total Biodatas", value: data.biodatas },
        { name: "Male Biodatas", value: data.maleBiodataCount },
        { name: "Female Biodatas", value: data.femaleBiodataCount },
        { name: "Premium Biodatas", value: data.premiumBiodatas },
        { name: "Total Revenue", value: data.totalRevenue / 100 },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Helmet>
                <title>Admin Home | Dashboard</title>
            </Helmet>

            <SectionTitleHome heading="Admin Home" subHeading="View all the details" />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center bg-gray-200 shadow-lg rounded-lg p-6 text-black transform transition-transform hover:scale-105"
                    >
                        <div className="text-5xl mb-4">{stat.icon}</div>
                        <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Pie Chart Section */}
            <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center mb-6 cinzel">Biodata and Revenue Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Biodata Pie Chart */}
                    <div className="w-full h-72">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={biodataChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {biodataChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                        <p className="text-center mt-4">Biodata Distribution</p>
                    </div>

                    {/* Revenue Chart */}
                    <div className="w-full h-80">
                        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-500 to-green-400 rounded-lg text-white shadow-md">
                            <p className="text-3xl font-bold mb-2">💵</p>
                            <h3 className="text-xl font-semibold">Total Revenue</h3>
                            <p className="text-2xl mt-2">${(data.totalRevenue / 100).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
