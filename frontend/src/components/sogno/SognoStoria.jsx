import React from "react";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";
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
      className="relative bg-[#F9F6F0] text-[#2C3E38] py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[#1F4E5F]/50" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <motion.div className="lg:col-span-6" {...fadeUp}>
          <div className="flex items-center gap-3 mb-8">
            <Waves size={20} className="text-[#1F4E5F]" strokeWidth={1.4} />
            <p
              className="text-[11px] uppercase tracking-[0.32em] text-[#1F4E5F]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              La Storia
            </p>
          </div>
          <h2
            className="leading-[1.02] tracking-tight"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            }}
          >
            Un <em className="italic text-[#1F4E5F]">rêve</em> d'enfant,
            <br /> une <em className="italic" style={{ color: "#5B7B8C" }}>histoire</em> de famille.
          </h2>

          <div
            className="mt-10 space-y-6 text-[#5C6B66] leading-relaxed text-base md:text-lg max-w-xl"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
          >
            <p>
              Avant d'être un restaurant, Sogno était un rêve d'enfant. Celui
              de <strong className="text-[#2C3E38]">Thomas</strong>, originaire
              des Pouilles, bercé par les bras de sa <em>nonna</em> italienne
              et par les dimanches en famille autour de grandes tablées généreuses.
            </p>
            <p>
              Chez sa grand-mère, la cuisine était un langage d'amour. Des
              recettes transmises avec le cœur, des saveurs authentiques et
              cette chaleur unique qui réunit les générations.
            </p>
            <p>
              Aujourd'hui, ce rêve prend vie aux côtés de notre
              chef <strong className="text-[#2C3E38]">Dario</strong>, qui
              donne à chaque assiette précision, passion et savoir-faire — comme
              pour son entrée signature, l'<em>Uovo alla Valtellina</em> :
              œuf parfait au cœur coulant, crème onctueuse de pecorino, speck
              de Valtellina et noisettes torréfiées.
            </p>
            <p className="text-[#1F4E5F] italic">
              « Chaque repas est un voyage, et chaque assiette un souvenir. »
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
            <PersonTag role="Fondateur" name="Thomas" />
            <PersonTag role="Chef" name="Dario" />
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            <Stat value="2019" label="Apertura" />
            <Stat value="36" label="Coperti" />
            <Stat value="120+" label="Etichette di vino" />
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-6 relative h-[560px] md:h-[680px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-[68%] h-[58%] overflow-hidden">
            <img
              src={SOGNO_MEDIA.lemons}
              alt="Citronniers d'Amalfi"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[58%] h-[60%] overflow-hidden border-8 border-[#F9F6F0]">
            <img
              src={SOGNO_MEDIA.wine}
              alt="Vermentino face à la mer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-sm border border-[#E5DFD3] px-5 py-3">
            <p
              className="text-[10px] uppercase tracking-[0.32em] text-[#1F4E5F]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Fondateur & Chef
            </p>
            <p
              className="mt-1 italic text-[#2C3E38]"
              style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.4rem" }}
            >
              Thomas &amp; Dario
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
      className="text-[#1F4E5F]"
      style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "2.5rem", fontWeight: 500 }}
    >
      {value}
    </p>
    <p
      className="text-[10px] uppercase tracking-[0.32em] text-[#5C6B66] mt-2"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {label}
    </p>
  </div>
);

const PersonTag = ({ role, name }) => (
  <div
    data-testid={`sogno-person-${name.toLowerCase()}`}
    className="flex items-baseline gap-3"
  >
    <span
      className="text-[10px] uppercase tracking-[0.32em] text-[#1F4E5F]"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      {role} —
    </span>
    <span
      className="italic text-[#2C3E38]"
      style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.5rem", fontWeight: 500 }}
    >
      {name}
    </span>
  </div>
);

export default SognoStoria;
