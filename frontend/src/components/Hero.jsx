import React from "react";
import { motion } from "framer-motion";
import { MEDIA } from "../lib/data";

export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen w-full flex items-end overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${MEDIA.heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/75" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
          className="max-w-4xl"
        >
          <p className="text-overline text-[#F9F6F0]/80 mb-6">
            Crêperie  •  Bistrot Breton  •  Paris 16<sup>e</sup>
          </p>
          <h1
            data-testid="hero-title"
            className="font-serif-display text-[#F9F6F0] text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight"
          >
            L'âme de la <em className="italic text-[#E5C28A]">Bretagne</em>,<br />
            la table d'<em className="italic">Auteuil</em>.
          </h1>

          <p className="mt-8 max-w-xl text-[#F9F6F0]/85 text-base md:text-lg leading-relaxed font-sans-body">
            Sarrasin de Berrien, beurre de Bordier, cidres fermiers du Finistère.
            Une cuisine d'évidence, signée Jean-Michel, au cœur du 16<sup>e</sup>.
          </p>

          <div className="mt-12 flex flex-wrap gap-5 items-center">
            <a
              href="#reserve"
              data-testid="hero-reserve-button"
              className="text-overline px-9 py-4 bg-[#F9F6F0] text-[#1B2A47] hover:bg-[#C27A3E] hover:text-[#F9F6F0] transition-colors duration-300"
            >
              Réserver une table
            </a>
            <a
              href="#menu"
              data-testid="hero-menu-button"
              className="text-overline text-[#F9F6F0] border-b border-[#F9F6F0]/70 pb-1 hover:text-[#E5C28A] hover:border-[#E5C28A] transition-colors"
            >
              Découvrir la carte →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-3">
        <span className="text-overline text-[#F9F6F0]/60 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-16 bg-[#F9F6F0]/40" />
      </div>
    </section>
  );
};

export default Hero;
