import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filters = ({ filters, handleFilterChange, handleRangeChange }) => {
  return (
    <aside className="w-full md:w-1/5 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 playfair md:text-xl 2xl:text-2xl">Filters</h2>

      {/* Age Range Slider */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Age Range:</label>
        <Slider
          min={18}
          max={50}
          step={1}
          range
          value={filters.ageRange}
          onChange={(range) => handleRangeChange(range)}
          trackStyle={[{ backgroundColor: "#4F46E5" }]}
          handleStyle={[
            { borderColor: "#4F46E5", backgroundColor: "#FFFFFF" },
            { borderColor: "#4F46E5", backgroundColor: "#FFFFFF" },
          ]}
          railStyle={{ backgroundColor: "#E5E7EB" }}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{filters.ageRange[0]} years</span>
          <span>{filters.ageRange[1]} years</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {/* Biodata Type Dropdown */}
        <div className="mb-4 ">
          <label className="block font-medium mb-2">Gender</label>
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

        {/* Division Dropdown */}
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
      </div>
    </aside>
  );
};

export default Filters;
