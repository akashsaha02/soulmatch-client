import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth"; // Custom hook for authentication
import useBiodatas from "@/hooks/useBiodatas"; // Custom hook for fetching biodatas

const BiodatasPage = () => {
  const [filters, setFilters] = useState({
    ageRange: [18, 50],
    biodataType: "",
    division: "",
  });
  const { user } = useAuth();
  const [biodatas] = useBiodatas();
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleRangeChange = (e) => {
    const { value, name } = e.target;
    setFilters({
      ...filters,
      ageRange: {
        ...filters.ageRange,
        [name]: Number(value),
      },
    });
  };

  const filteredBiodatas = biodatas.filter((biodata) => {
    const age = new Date().getFullYear() - new Date(biodata.dob).getFullYear();
    return (
      (filters.biodataType === "" || biodata.biodataType === filters.biodataType) &&
      (filters.division === "" || biodata.permanentDivision === filters.division) &&
      age >= filters.ageRange[0] &&
      age <= filters.ageRange[1]
    );
  });

  const handleViewProfile = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/biodatas/${id}`);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-6">
        {/* Filter Section */}
        <aside className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block font-medium mb-2">Age Range:</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name="min"
                value={filters.ageRange[0]}
                onChange={handleRangeChange}
                className="w-full border rounded p-2"
                placeholder="Min"
              />
              <span>to</span>
              <input
                type="number"
                name="max"
                value={filters.ageRange[1]}
                onChange={handleRangeChange}
                className="w-full border rounded p-2"
                placeholder="Max"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Biodata Type:</label>
            <select
              name="biodataType"
              value={filters.biodataType}
              onChange={handleFilterChange}
              className="w-full border rounded p-2"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Division:</label>
            <select
              name="division"
              value={filters.division}
              onChange={handleFilterChange}
              className="w-full border rounded p-2"
            >
              <option value="">All</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattagram">Chattagram</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barisal">Barisal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>
        </aside>

        {/* Biodatas Display Section */}
        <section className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">All Biodatas ({biodatas.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBiodatas.slice(0, 20).map((biodata) => {
              const age = new Date().getFullYear() - new Date(biodata.dob).getFullYear();
              return (
                <div
                  key={biodata._id}
                  className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <img
                    src={biodata.profileImage}
                    alt={biodata.name}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2">{biodata.name}</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>Biodata ID: {biodata.biodataId}</li>
                    <li>Biodata Type: {biodata.biodataType}</li>
                    <li>Permanent Division: {biodata.permanentDivision}</li>
                    <li>Age: {age}</li>
                    <li>Occupation: {biodata.occupation}</li>
                  </ul>
                  <button
                    onClick={() => handleViewProfile(biodata._id)}
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded w-full text-center"
                  >
                    View Profile
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BiodatasPage;
