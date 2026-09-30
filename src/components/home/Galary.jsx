import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Expand } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";

const images = [
  { src: "https://images.unsplash.com/photo-1521764397424-0df202eec9ac?q=80&w=1600&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1602605786056-da87eadb5126?q=80&w=1600&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1600&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?q=80&w=1600&auto=format&fit=crop" },
  { src: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1600&auto=format&fit=crop" },
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="section container-page">
      <SectionHeading eyebrow="Gallery" title="Moments from our couples" />

      <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {images.map((image, index) => (
          <Reveal key={image.src} delay={(index % 3) * 0.08} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => {
                setCurrentIndex(index);
                setOpen(true);
              }}
              className="group relative block w-full overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Open photo ${index + 1}`}
            >
              <img
                src={image.src}
                alt={`Couple photo ${index + 1}`}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${index % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
              />
              <div className="absolute inset-0 grid place-items-center bg-plum-950/0 transition-colors duration-300 group-hover:bg-plum-950/35">
                <Expand className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox open={open} close={() => setOpen(false)} slides={images} index={currentIndex} />
    </section>
  );
};

export default Gallery;
