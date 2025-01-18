import useAxiosSecure from '@/hooks/useAxiosSecure';
import useContactRequest from '@/hooks/useContactRequests';

const MyContactRequest = () => {
    const axiosSecure = useAxiosSecure();

    const { requests, refetch, isLoading } = useContactRequest();

   
    const handleDelete = async (id) => {
        try {
            const res = await axiosSecure.delete(`/contact-requests/${id}`);

            if (res.status === 200) {
                alert('Request deleted successfully');
                refetch();
            }
        } catch (error) {
            console.error('Error deleting contact request:', error);
        }
    };

    if (isLoading) return <p>Loading...</p>;



    // console.log(requests)

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">My Contact Requests</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Biodata ID</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Mobile No</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req._id}>
                            <td className="border px-4 py-2">{req.name || "N/A"}</td>
                            <td className="border px-4 py-2">{req.biodataId}</td>
                            <td className="border px-4 py-2">{req.status}</td>
                            <td className="border px-4 py-2">{req.status === 'approved' ? req.mobileNumber : 'N/A'}</td>
                            <td className="border px-4 py-2">{req.status === 'approved' ? req.email : 'N/A'}</td>
                            <td className="border px-4 py-2">
                                <button className="btn btn-danger" onClick={() => handleDelete(req._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyContactRequest;
