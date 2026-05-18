import React from "react";
import { motion } from "framer-motion";
import { SOGNO_MEDIA } from "../../lib/sogno-data";

export const SognoGalleria = () => {
  const items = [
    { src: SOGNO_MEDIA.vongole, alt: "Linguine alle vongole", cls: "col-span-12 md:col-span-7 row-span-2 h-[460px]", caption: "Linguine alle Vongole" },
    { src: SOGNO_MEDIA.burrata, alt: "Burrata", cls: "col-span-12 md:col-span-5 h-[220px]", caption: "Burrata di Puglia" },
    { src: SOGNO_MEDIA.tiramisu, alt: "Tiramisu", cls: "col-span-6 md:col-span-5 h-[220px]", caption: "Tiramisù tradizionale" },
    { src: SOGNO_MEDIA.wine, alt: "Vin rouge", cls: "col-span-6 md:col-span-4 h-[320px]", caption: "La Cantina" },
    { src: SOGNO_MEDIA.hero, alt: "Salle Sogno", cls: "col-span-12 md:col-span-8 h-[320px]", caption: "Sala Principale" },
  ];

  return (
    <section
      id="galleria"
      data-testid="sogno-galleria"
      className="bg-[#0a0908] text-[#fdfbf7] py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p
              className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-6"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              — La Galleria
            </p>
            <h2
              className="leading-[1.02] tracking-tight"
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: 400,
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              }}
            >
              <em className="italic">Bellezza</em> nei dettagli.
            </h2>
          </div>
          <p
            className="text-[#fdfbf7]/55 max-w-sm md:text-right"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
          >
            Tournée comme une scène de Sorrentino — chaque assiette, chaque
            étiquette, chaque éclat de cristal.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 auto-rows-min">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              data-testid={`sogno-gallery-${i}`}
              className={`relative overflow-hidden group ${it.cls}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/85 via-transparent to-transparent opacity-80" />
              <p
                className="absolute bottom-5 left-5 text-[#fdfbf7] italic"
                style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.3rem" }}
              >
                {it.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SognoGalleria;
