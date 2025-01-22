import SectionTitleHome from '@/components/shared/SectionTitleHome';
import { axiosSecure } from '@/hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const AdminHome = () => {
    const [data, setData] = useState({
        biodatas: 0,
        contactRequests: 0,
        premiumRequests: 0,
        successStories: 0,
        users: 0,
    });

    useEffect(() => {
        async function fetchData() {
            const response = await axiosSecure.get('/admin/stats');
            if (response.data) {
                setData(response.data);
            }
        }
        fetchData();
    }, []);

    const stats = [
        { label: "All Biodatas", value: data.biodatas, icon: "📝" },
        { label: "Contact Requests", value: data.contactRequests, icon: "📞" },
        { label: "Premium Requests", value: data.premiumRequests, icon: "⭐" },
        { label: "Success Stories", value: data.successStories, icon: "🎉" },
        { label: "Total Users", value: data.users, icon: "👥" },
        { label: "Premium Users", value: data.premiumUsers, icon: "👑" },
        { label: "Male Biodata", value: data.maleBiodataCount, icon: "👨" },
        { label: "Female Biodata", value: data.femaleBiodataCount, icon: "👩" },
        { label: "Total Revenue", value: (data.totalRevenue / 100).toFixed(2), icon: "💵" },
    ];

    return (
        <div className="max-w-5xl mx-auto p-4">
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
        </div>
    );
};

export default AdminHome;
