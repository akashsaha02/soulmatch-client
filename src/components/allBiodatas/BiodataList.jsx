import BiodataCard from "./BiodataCard";

const BiodatasList = ({ biodatas, handleViewProfile }) => {
  return (
    <section className="flex-1 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">All Biodatas ({biodatas.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {biodatas.slice(0, 20).map((biodata) => (
          <BiodataCard
            key={biodata._id}
            biodata={biodata}
            handleViewProfile={handleViewProfile}
          />
        ))}
      </div>
    </section>
  );
};

export default BiodatasList;
