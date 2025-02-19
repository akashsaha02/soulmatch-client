import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const images = [
  { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=1200&q=80" },
  { src: "https://images.unsplash.com/photo-1588186941799-f9a4fc54ff1e?w=1200&h=1200&q=80" },
  { src: "https://images.unsplash.com/photo-1593409981958-562665d407cb?w=1200&h=1200&q=80" },
  { src: "https://images.unsplash.com/photo-1587538639284-aec1076ba9c2?w=1200&h=1200&q=80" },
  { src: "https://images.unsplash.com/photo-1526178612777-6c7321a0b11f?w=1200&h=1200&q=80" },
  { src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1200&h=1200&q=80" },
  { src: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&h=1200&q=80" },
  { src: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=1200&h=1200&q=80" },
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Image Gallery</h2>
      
      {/* Modern Asymmetric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl shadow-lg group ${
              index % 3 === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <img
              src={image.src}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onClick={() => {
                setCurrentIndex(index);
                setOpen(true);
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all"></div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={currentIndex}
      />
    </div>
  );
};

export default Gallery;
