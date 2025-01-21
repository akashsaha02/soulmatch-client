import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useBiodatas from "@/hooks/useBiodatas";
import Filters from "@/components/allBiodatas/Filters";
import BiodatasList from "@/components/allBiodatas/BiodataList";
import Loader from "@/components/shared/Loader";


const BiodatasPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    ageRange: [18, 50],
    biodataType: "",
    division: "",
  });
  const { user } = useAuth();
  const [biodatas, loading] = useBiodatas();

  if (loading) return <Loader />

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleRangeChange = (range) => {
    setFilters((prev) => ({
      ...prev,
      ageRange: range,
    }));
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

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row gap-2">
        <Filters
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleRangeChange={handleRangeChange}
        />
        <BiodatasList
          biodatas={filteredBiodatas}
        />
      </div>
    </div>
  );
};

export default BiodatasPage;
