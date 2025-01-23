import Loader from '@/components/shared/Loader';
import SectionTitleHome from '@/components/shared/SectionTitleHome';
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

    if (isLoading) return <Loader />;



    // console.log(requests)

    return (
        <div className="p-6">
            <SectionTitleHome heading="My Contact Requests" subHeading="Manage your contact requests" />
            <table className="table-auto max-w-5xl mx-auto w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Requested Biodata ID</th>
                        <th className="px-4 py-2">Requested Mobile No</th>
                        <th className="px-4 py-2">Requested Email</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.length > 0 ? requests.map((req) => (
                        <tr key={req._id} className='text-center'>
                            <td className="border px-4 py-2">{req.biodataId}</td>
                            <td className="border px-4 py-2">{req.status === 'approved' ? req.mobileNumber : 'Pending'}</td>
                            <td className="border px-4 py-2">{req.status === 'approved' ? req.email : 'Pending'}</td>
                            <td className="border px-4 py-2 capitalize">{req.status}</td>
                            <td className="border px-4 py-2">
                                <button className="btn btn-danger" onClick={() => handleDelete(req._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )) : <tr >

                        <td className="px-6 py-4 text-me-red">No Contact Requests Found</td>

                    </tr>}
                </tbody>
            </table>
        </div >
    );
};

export default MyContactRequest;
