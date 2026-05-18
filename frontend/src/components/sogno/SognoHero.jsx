import React from "react";
import { motion } from "framer-motion";
import { SOGNO_MEDIA } from "../../lib/sogno-data";

export const SognoHero = () => {
  return (
    <section
      id="top"
      data-testid="sogno-hero"
      className="relative min-h-screen w-full flex items-end overflow-hidden bg-[#0E1A14]"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${SOGNO_MEDIA.hero})`,
          backgroundSize: "140%",
          backgroundPosition: "62% 78%",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Cinematic gradient — keep food visible top-right, text legible bottom-left */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/35 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="uppercase tracking-[0.32em] text-[#E8B931] mb-10"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(0.85rem, 1vw, 1rem)",
            fontWeight: 500,
            textShadow: "0 1px 12px rgba(0,0,0,0.5)",
          }}
          data-testid="sogno-hero-overline"
        >
          Restaurant  •  Paris 16<sup>e</sup>  •  Depuis 2019
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-white leading-[0.85] tracking-tight flex items-baseline gap-6 flex-wrap"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 400,
            textShadow: "0 2px 28px rgba(0,0,0,0.45)",
          }}
          data-testid="sogno-hero-title"
        >
          <span style={{ fontSize: "clamp(5.5rem, 17vw, 16rem)" }}>SOGNO</span>
          <span
            className="italic"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              color: "#E8B931",
              letterSpacing: "0.04em",
              textShadow: "0 2px 14px rgba(0,0,0,0.6)",
            }}
          >
            Paris.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-8 text-white italic"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 400,
            fontSize: "clamp(1.85rem, 3.2vw, 2.75rem)",
            textShadow: "0 2px 14px rgba(0,0,0,0.6)",
          }}
        >
          Par magie culinaire, voyagez du 16<sup>e</sup> à Portofino.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 max-w-3xl text-white/90 leading-relaxed"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(1.15rem, 1.5vw, 1.4rem)",
            textShadow: "0 1px 12px rgba(0,0,0,0.6)",
          }}
        >
          Une cuisine italienne d'auteur signée par notre chef Dario et imaginée par
          Thomas, originaire des Pouilles. Pâtes fraîches du matin, burratas
          des Pouilles, vermentinos de Sardaigne — à deux pas du Trocadéro.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <a
            href="#prenotare"
            data-testid="sogno-hero-reserve"
            className="text-[11px] uppercase tracking-[0.22em] font-semibold px-10 py-4 bg-[#1F4E5F] text-white hover:bg-[#173B49] transition-colors"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Réserver une table
          </a>
          <a
            href="#menu"
            data-testid="sogno-hero-menu"
            className="text-[11px] uppercase tracking-[0.22em] text-white border-b border-white pb-1 hover:text-[#E8B931] hover:border-[#E8B931] transition-colors"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Découvrir la carte →
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 right-8 z-10 hidden md:flex flex-col items-center gap-3">
        <div className="w-px h-16 bg-white/60" />
        <span
          className="text-[10px] uppercase tracking-[0.32em] text-white/70 [writing-mode:vertical-rl]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Défiler
        </span>
      </div>
    </section>
  );
};

export default SognoHero;
