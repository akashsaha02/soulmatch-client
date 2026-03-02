"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import SectionTitleHome from "../shared/SectionTitleHome";

const images = [
  { src: "https://images.unsplash.com/photo-1521764397424-0df202eec9ac?q=80&w=2070&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1602605786056-da87eadb5126?q=80&w=2127&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?q=80&w=2024&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1974&auto=format&fit=crop" },
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="container mx-auto p-6">
      <SectionTitleHome heading="Gallery" subHeading="Our Memories" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl shadow-lg group ${index % 3 === 0 ? "col-span-2 row-span-2" : ""}`}
          >
            <img
              src={image.src}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
              onClick={() => {
                setCurrentIndex(index);
                setOpen(true);
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all" />
          </div>
        ))}
      </div>
      <Lightbox open={open} close={() => setOpen(false)} slides={images} index={currentIndex} />
    </div>
  );
}
