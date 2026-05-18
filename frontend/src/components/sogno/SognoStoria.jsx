import React from "react";
import { motion } from "framer-motion";
import { SOGNO_MEDIA } from "../../lib/sogno-data";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.2, 0.7, 0.2, 1] },
  viewport: { once: true, margin: "-100px" },
};

export const SognoStoria = () => {
  return (
    <section
      id="storia"
      data-testid="sogno-storia"
      className="relative bg-[#0a0908] text-[#fdfbf7] py-32 md:py-44 overflow-hidden"
    >
      {/* subtle gold horizontal line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[#c5a059]/40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <motion.div className="lg:col-span-6" {...fadeUp}>
          <p
            className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-8"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            — La Storia
          </p>
          <h2
            className="leading-[1.02] tracking-tight"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            }}
          >
            Un <em className="italic text-[#c5a059]">rêve</em> de la cuisine
            <br />
            italienne <em className="italic">d'auteur</em>.
          </h2>

          <div
            className="mt-10 space-y-6 text-[#fdfbf7]/75 leading-relaxed text-base md:text-lg max-w-xl"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
          >
            <p>
              Né d'une amitié entre Milan et Paris, Sogno est l'histoire d'un fils
              de Naples qui a appris la pâte fraîche dans la cuisine de sa nonna,
              et d'un sommelier vénitien obsédé par les Nebbiolo des Langhe.
            </p>
            <p>
              À deux pas du Trocadéro, dans une salle de bois sombre patiné, de
              laiton vieilli et de velours profond, nous servons une cuisine
              italienne d'auteur : burratas voyagent depuis les Pouilles, le
              prosciutto vient de Parme, et les pâtes sont étirées chaque matin.
            </p>
            <p className="text-[#c5a059] italic">
              « La vita è bella — surtout à table. »
            </p>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            <Stat value="2019" label="Apertura" />
            <Stat value="36" label="Coperti" />
            <Stat value="120+" label="Etichette di vino" />
          </div>
        </motion.div>

        {/* Asymmetric images */}
        <motion.div
          className="lg:col-span-6 relative h-[560px] md:h-[680px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-[68%] h-[58%] overflow-hidden">
            <img
              src={SOGNO_MEDIA.burrata}
              alt="Burrata di Puglia"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[58%] h-[60%] overflow-hidden border-8 border-[#0a0908]">
            <img
              src={SOGNO_MEDIA.wine}
              alt="Vin italien"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          {/* Floating tag */}
          <div className="absolute top-6 left-6 z-10 bg-[#0a0908]/85 backdrop-blur-sm border border-[#c5a059]/30 px-5 py-3">
            <p
              className="text-[10px] uppercase tracking-[0.32em] text-[#c5a059]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Chef
            </p>
            <p
              className="text-[#fdfbf7] mt-1 italic"
              style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.4rem" }}
            >
              Lorenzo Russo
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }) => (
  <div data-testid={`sogno-stat-${label.toLowerCase()}`}>
    <p
      className="text-[#c5a059]"
      style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "2.5rem", fontWeight: 500 }}
    >
      {value}
    </p>
    <p
      className="text-[10px] uppercase tracking-[0.32em] text-[#fdfbf7]/55 mt-2"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {label}
    </p>
  </div>
);

export default SognoStoria;
