import SectionTitleHome from '@/components/shared/SectionTitleHome';
import useFavourites from '@/hooks/useFavourites';
import { FaTrashAlt } from 'react-icons/fa';
import React from 'react'
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyFavourites = () => {

  const [favourites, refetch] = useFavourites();

  const axiosSecure = useAxiosSecure();

  const handleDeleteFavourite = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/favourites/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  }
  return (
    <div>
      <SectionTitleHome
        heading='My Favourites'
        subHeading='Liked profiles'
      />

      <div className="">

          <div className="my-10">
            <div className="overflow-x-auto max-w-3xl mx-auto">
              <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                {/* head */}
                <thead>
                  <tr className="text-lg font-semibold bg-indigo-600 text-white">
                    <th className="px-6 py-3 text-left">Biodata Id</th>
                    <th className="px-6 py-3 text-left">Image</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {
                    favourites.map((item, index) => {
                      return (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-700">{item.favouriteBiodataId}</td>
                          <td className="px-6 py-4">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={item.favouriteProfileImage}
                                  alt={item.favouriteName}
                                  className="object-cover w-full h-full rounded-full"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.favouriteName}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteFavourite(item._id)}
                              className="btn btn-ghost btn-md text-red-500 hover:text-red-700">
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>




    </div>

  )
}

export default MyFavourites