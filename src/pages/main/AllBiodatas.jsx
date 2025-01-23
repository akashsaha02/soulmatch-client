import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import useBiodatas from "@/hooks/useBiodatas";
import Filters from "@/components/allBiodatas/Filters";
import BiodatasList from "@/components/allBiodatas/BiodataList";
import Loader from "@/components/shared/Loader";
import { Helmet } from "react-helmet";

const BiodatasPage = () => {
  const navigate = useNavigate();
  const initialFilters = {
    ageRange: [18, 50],
    biodataType: "",
    division: "",
    isPremium: false,
  };

  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const { user } = useAuth();
  const [biodatas, loading] = useBiodatas();

  if (loading) return <Loader />;

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRangeChange = (range) => {
    setFilters((prev) => ({
      ...prev,
      ageRange: range,
    }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setSearchQuery("");
    setSortBy("default");
  };

  const filteredBiodatas = biodatas
    .filter((biodata) => {
      const age = new Date().getFullYear() - new Date(biodata.dob).getFullYear();
      return (
        (filters.biodataType === "" || biodata.biodataType === filters.biodataType) &&
        (filters.division === "" || biodata.permanentDivision === filters.division) &&
        (!filters.isPremium || biodata.isPremium) &&
        age >= filters.ageRange[0] &&
        age <= filters.ageRange[1] &&
        (!searchQuery || biodata.name.toLowerCase().includes(searchQuery))
      );
    })
    .sort((a, b) => {
      if (sortBy === "id") return a.id - b.id;
      if (sortBy === "age") {
        const ageA = new Date().getFullYear() - new Date(a.dob).getFullYear();
        const ageB = new Date().getFullYear() - new Date(b.dob).getFullYear();
        return ageA - ageB;
      }
      return 0;
    });

  return (
    <div className="min-h-screen p-4">
      <Helmet>
        <title>All Biodatas | SoulMatch</title>
      </Helmet>
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row gap-2">
        <Filters
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleRangeChange={handleRangeChange}
          handleSearch={handleSearch}
          handleSort={handleSort}
          handleReset={handleReset}
        />
        <BiodatasList biodatas={filteredBiodatas} />
      </div>
    </div>
  );
};

export default BiodatasPage;