import BiodataCard from "./BiodataCard";

const BiodatasList = ({ biodatas }) => {
  return (
    <section className="flex-1 p-4">
      <h2 className="text-xl font-bold mb-4 playfair uppercase">All Biodatas ({biodatas.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {biodatas.slice(0, 20).map((biodata) => (
          <BiodataCard
            key={biodata._id}
            biodata={biodata}
          />
        ))}
      </div>
    </section>
  );
};

export default BiodatasList;
