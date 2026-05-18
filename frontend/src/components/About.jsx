import React from "react";
import { motion } from "framer-motion";
import { MEDIA } from "../lib/data";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] },
  viewport: { once: true, margin: "-100px" },
};

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative bg-cream py-24 md:py-36 overflow-hidden ermine-pattern"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Text */}
          <motion.div className="lg:col-span-6 lg:pr-8" {...fadeUp}>
            <p className="text-overline text-cider mb-8">— Notre maison</p>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#1A1A1A]">
              Une crêperie qui pense comme un <em className="italic text-navy">bistrot</em>,
              et qui cuisine comme une <em className="italic text-navy">grand-mère</em> de Quimper.
            </h2>
            <div className="mt-10 space-y-6 font-sans-body text-[#1A1A1A]/75 text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                Jean-Michel a quitté le port de Concarneau pour Paris en 2018,
                avec une seule idée en tête : faire goûter aux Parisiens du sarrasin
                qui croustille, du beurre qui chante et du cidre qui rit.
              </p>
              <p>
                Rue Gros, derrière la façade discrète d'une ancienne mercerie, la salle
                respire la Bretagne sans en faire trop. Ardoise, lin écru, granit poli —
                et dans la cuisine ouverte, une billig en fonte chauffée à 230 °C.
              </p>
              <p>
                La farine de blé noir vient de Berrien. Le beurre demi-sel, de chez
                Bordier. Les pommes à cidre, du Manoir du Kinkiz. Tout le reste
                se travaille à la minute, devant vous.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <Stat value="2018" label="Ouverture" />
              <Stat value="100%" label="Sarrasin breton" />
              <Stat value="14" label="Cidres au verre" />
            </div>
          </motion.div>

          {/* Bento Images */}
          <motion.div
            className="lg:col-span-6 grid grid-cols-6 grid-rows-6 gap-4 h-[520px] sm:h-[640px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="col-span-4 row-span-4 overflow-hidden">
              <img
                src={MEDIA.interior1}
                alt="Salle du bistrot"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden">
              <img
                src={MEDIA.galette1}
                alt="Galette de sarrasin"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden bg-[#1B2A47] flex items-center justify-center p-6 text-center">
              <div>
                <p className="text-overline text-[#E5C28A] mb-3">Chef</p>
                <p className="font-serif-display text-2xl text-[#F9F6F0] italic">
                  Jean-Michel <br /> Le Goff
                </p>
              </div>
            </div>
            <div className="col-span-3 row-span-2 overflow-hidden">
              <img
                src={MEDIA.oceanRocks}
                alt="Granit breton"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-3 row-span-2 overflow-hidden">
              <img
                src={MEDIA.galette2}
                alt="Crêpe au beurre salé"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ value, label }) => (
  <div data-testid={`about-stat-${label.toLowerCase().replace(/\s/g, "-")}`}>
    <p className="font-serif-display text-3xl md:text-4xl text-navy">{value}</p>
    <p className="text-overline text-[#1A1A1A]/60 mt-2">{label}</p>
  </div>
);

export default About;
