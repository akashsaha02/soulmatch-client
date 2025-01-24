import Loader from "@/components/shared/Loader";
import SectionTitleHome from "@/components/shared/SectionTitleHome";
import usePremiumReq from "@/hooks/usePremiumRequests";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const ApprovePremium = () => {
  const {
    premiumReq,
    loading,
    myPremiumReq,
    refetchPremiumReq,
    refetchMyPremiumReq,
  } = usePremiumReq();
  const axiosSecure = useAxiosSecure();

  // Approve Request Handler
  const handleApprove = async (id, userEmail) => {
    try {
      // await axiosSecure.patch(`/admin/premium-requests/${id}/approve`, {
      //   userEmail,
      // });
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve!"
      }).then(async (result) => {
        if (result.isConfirmed) {

          const res = await axiosSecure.patch(`/admin/premium-requests/${id}/approve`, {
            userEmail,
          });

          if (res.data) {
            Swal.fire({
              title: "Approved!",
              text: "Request has been approved.",
              icon: "success"
            });
          }
        }
      });

      refetchPremiumReq(); // Call as a function
      refetchMyPremiumReq(); // Call as a function
    } catch (error) {
      console.error("Error approving request:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to approve request.",
        icon: "error"
      })
    };
  }

  // Delete Request Handler
  const handleDelete = async (id) => {
    try {
      // await axiosSecure.delete(`/admin/premium-requests/${id}`);


      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axiosSecure.delete(`/admin/premium-requests/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Request has been deleted.",
              icon: "success"
            });


            refetchPremiumReq(); // Call as a function
            refetchMyPremiumReq(); // Call as a function
          }
        }
      })
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Approve Premium | Dashboard</title>
      </Helmet>
      <SectionTitleHome heading="Approve Premium Biodata" subHeading='Premium User Requests' />

      {loading ? (
        <Loader />
      ) : premiumReq.length > 0 ? (
        <table className="table-auto w-full border max-w-6xl mx-auto border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Biodata ID</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {premiumReq.map((req) => (
              <tr key={req._id} className="text-center">
                <td className="border px-4 py-2">{req.biodataId}</td>
                <td className="border px-4 py-2">{req.userName}</td>
                <td className="border px-4 py-2">{req.userEmail}</td>
                <td className="border px-4 py-2 capitalize">{req.status}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleApprove(req._id, req.userEmail)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(req._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No premium requests</p>
      )}
    </div>
  );
};

export default ApprovePremium;
