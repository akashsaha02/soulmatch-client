import useAxiosSecure from '@/hooks/useAxiosSecure';
import useContactRequest from '@/hooks/useContactRequests';
import { useState } from 'react';

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
  if (isLoading) return <p>Loading...</p>;

  // Render each request row
  const renderRequestRow = (req) => (
    <tr key={req._id}>
      <td className="border px-4 py-2">{req.name}</td>
      <td className="border px-4 py-2">{req.email}</td>
      <td className="border px-4 py-2">{req.biodataId}</td>
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
      <h2 className="text-2xl font-semibold mb-4">Approve Contact Requests</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Biodata ID</th>
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
