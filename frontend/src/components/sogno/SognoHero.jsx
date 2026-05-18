import React from "react";
import { motion } from "framer-motion";
import { SOGNO_MEDIA } from "../../lib/sogno-data";

export const SognoHero = () => {
  return (
    <section
      id="top"
      data-testid="sogno-hero"
      className="relative min-h-screen w-full flex items-end overflow-hidden bg-[#0a0908]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${SOGNO_MEDIA.hero})` }}
      />
      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908]/40 via-[#0a0908]/30 to-[#0a0908]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0908_85%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-10"
          style={{ fontFamily: "'Manrope', sans-serif" }}
          data-testid="sogno-hero-overline"
        >
          Ristorante  •  Paris 16<sup>e</sup>  •  Dal 2019
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-[#fdfbf7] leading-[0.85] tracking-tight"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 400,
            fontSize: "clamp(4rem, 13vw, 11rem)",
          }}
          data-testid="sogno-hero-title"
        >
          Sogno
          <span className="block italic text-[#c5a059] mt-2" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "0.02em" }}>
            d'Italia.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 max-w-xl text-[#fdfbf7]/75 text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
        >
          La Dolce Vita à deux pas du Trocadéro. Une cuisine italienne d'auteur,
          un sommelier passionné, et la promesse d'un soir suspendu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <a
            href="#prenotare"
            data-testid="sogno-hero-reserve"
            className="text-[11px] uppercase tracking-[0.22em] font-semibold px-10 py-4 bg-[#c5a059] text-[#0a0908] hover:bg-[#dfb768] transition-colors"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Prenotare un tavolo
          </a>
          <a
            href="#menu"
            data-testid="sogno-hero-menu"
            className="text-[11px] uppercase tracking-[0.22em] text-[#fdfbf7] border-b border-[#c5a059] pb-1 hover:text-[#c5a059] transition-colors"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Scopri la carta →
          </a>
        </motion.div>
      </div>

      {/* Marker bottom-left */}
      <div className="absolute bottom-10 right-8 z-10 hidden md:flex flex-col items-center gap-3">
        <div className="w-px h-16 bg-[#c5a059]/50" />
        <span
          className="text-[10px] uppercase tracking-[0.32em] text-[#c5a059]/70 [writing-mode:vertical-rl]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Scorri
        </span>
      </div>
    </section>
  );
};

export default SognoHero;
