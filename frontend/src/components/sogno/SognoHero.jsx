import React from "react";
import { motion } from "framer-motion";
import { SOGNO_MEDIA } from "../../lib/sogno-data";

export const SognoHero = () => {
  return (
    <section
      id="top"
      data-testid="sogno-hero"
      className="relative min-h-screen w-full flex items-end overflow-hidden bg-[#F9F6F0]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${SOGNO_MEDIA.hero})` }}
      />
      {/* Soft sun-drenched overlays — keep it bright but ensure text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-[11px] uppercase tracking-[0.32em] text-[#E8B931] mb-10"
          style={{ fontFamily: "'Manrope', sans-serif", textShadow: "0 1px 12px rgba(0,0,0,0.45)" }}
          data-testid="sogno-hero-overline"
        >
          Ristorante  •  Paris 16<sup>e</sup>  •  Dal 2019
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-white leading-[0.85] tracking-tight"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 400,
            fontSize: "clamp(4rem, 13vw, 11rem)",
            textShadow: "0 2px 28px rgba(0,0,0,0.35)",
          }}
          data-testid="sogno-hero-title"
        >
          Sogno
          <span
            className="block italic mt-2"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "0.02em", color: "#E8B931" }}
          >
            di Portofino.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 max-w-xl text-white/90 text-base md:text-lg leading-relaxed"
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300, textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
        >
          La Riviera ligure à deux pas du Trocadéro. Citrons d'Amalfi, vermentinos
          de Sardaigne, lumière dorée et tables ensoleillées — chaque soir,
          la Dolce Vita.
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
            className="text-[11px] uppercase tracking-[0.22em] font-semibold px-10 py-4 bg-[#1F4E5F] text-white hover:bg-[#173B49] transition-colors"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Prenotare un tavolo
          </a>
          <a
            href="#menu"
            data-testid="sogno-hero-menu"
            className="text-[11px] uppercase tracking-[0.22em] text-white border-b border-white pb-1 hover:text-[#E8B931] hover:border-[#E8B931] transition-colors"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Scopri la carta →
          </a>
        </motion.div>
      </div>

      {/* Marker bottom-right */}
      <div className="absolute bottom-10 right-8 z-10 hidden md:flex flex-col items-center gap-3">
        <div className="w-px h-16 bg-white/60" />
        <span
          className="text-[10px] uppercase tracking-[0.32em] text-white/80 [writing-mode:vertical-rl]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Scorri
        </span>
      </div>
    </section>
  );
};

export default SognoHero;
