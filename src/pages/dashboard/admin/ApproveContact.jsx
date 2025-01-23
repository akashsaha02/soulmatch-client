import Loader from '@/components/shared/Loader';
import SectionTitleHome from '@/components/shared/SectionTitleHome';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useContactRequest from '@/hooks/useContactRequests';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const ApproveContactRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { requests, refetch, isLoading } = useContactRequest(true);
  const [loadingIds, setLoadingIds] = useState(new Set()); // Track loading states for each request

  // Approving a single contact request
  const handleApprove = async (id, biodataId) => {
    setLoadingIds((prev) => new Set(prev).add(id)); // Add the current ID to the loading state
    try {
      await axiosSecure.patch(`/admin/contact-requests/${id}`, { biodataId });
      await refetch(); // Refresh the data
    } catch (error) {
      console.error('Error approving contact request:', error);
    } finally {
      setLoadingIds((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(id); // Remove the request from the loading state
        return updatedSet;
      });
    }
  };

  // Display loading spinner while fetching data
  if (isLoading) return <Loader />;

  // Render each request row
  const renderRequestRow = (req) => (
    <tr key={req._id} className='text-center'>
      <td className="border px-4 py-2">{req.email}</td>
      <td className="border px-4 py-2">{req.transactionId}</td>
      <td className="border px-4 py-2">{req.biodataId}</td>
      <td className="border px-4 py-2">{req.status}</td>
      <td className="border px-4 py-2">
        {req.status === 'pending' ? (
          <button
            className="btn btn-success"
            onClick={() => handleApprove(req._id, req.biodataId)}
            disabled={loadingIds.has(req._id)}
          >
            {loadingIds.has(req._id) ? 'Approving...' : 'Approve'}
          </button>
        ) : (
          <span className="text-green-600">Approved</span>
        )}
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      <Helmet>
        <title>Approve Contact | Dashboard</title>
      </Helmet>
      <SectionTitleHome heading={'Approve Contact Requests'} subHeading={'Contact Information Requests'} />
      <table className="table-auto w-full max-w-6xl mx-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Transaction Id</th>
            <th className="px-4 py-2">Requested Biodata ID</th>
            <th className="px-4 py-2">Request Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(renderRequestRow)}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveContactRequest;
