import React from "react";
import { motion } from "framer-motion";
import { MEDIA } from "../lib/data";

export const Gallery = () => {
  const items = [
    { src: MEDIA.interior2, alt: "Table dressée", cls: "col-span-12 md:col-span-8 row-span-2 h-[460px]" },
    { src: MEDIA.galette1, alt: "Galette dorée", cls: "col-span-12 md:col-span-4 h-[220px]" },
    { src: MEDIA.oceanRocks, alt: "Granit & océan", cls: "col-span-12 md:col-span-4 h-[220px]" },
    { src: MEDIA.galette2, alt: "Crêpe à l'œuf", cls: "col-span-6 md:col-span-4 h-[340px]" },
    { src: MEDIA.interior1, alt: "Salle de service", cls: "col-span-6 md:col-span-4 h-[340px]" },
    { src: MEDIA.granite, alt: "Texture granit", cls: "col-span-12 md:col-span-4 h-[340px]" },
  ];

  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="bg-cream py-24 md:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-overline text-cider mb-6">— Atelier visuel</p>
            <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-[#1A1A1A]">
              Matières, lumières, <em className="italic">terroir</em>.
            </h2>
          </div>
          <p className="font-sans-body text-[#1A1A1A]/65 max-w-sm md:text-right">
            Un fil rouge visuel entre le granit du Finistère et la pierre de taille parisienne —
            avec, au milieu, le grésillement du blé noir sur la billig.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 auto-rows-min">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
              data-testid={`gallery-item-${i}`}
              className={`relative overflow-hidden ${it.cls}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
