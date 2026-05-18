import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SOGNO_ANTIPASTI,
  SOGNO_PRIMI,
  SOGNO_SECONDI,
  SOGNO_DOLCI,
  SOGNO_CAVE,
} from "../../lib/sogno-data";

const CATEGORIES = [
  { id: "antipasti", label: "Antipasti", items: SOGNO_ANTIPASTI },
  { id: "primi", label: "Primi Piatti", items: SOGNO_PRIMI },
  { id: "secondi", label: "Secondi", items: SOGNO_SECONDI },
  { id: "dolci", label: "Dolci", items: SOGNO_DOLCI },
  { id: "cave", label: "La Cantina", items: SOGNO_CAVE },
];

const MenuItem = ({ item, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: i * 0.05 }}
    viewport={{ once: true, margin: "-40px" }}
    data-testid={`sogno-dish-${item.name.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40)}`}
    className="group py-7 border-b border-[#c5a059]/15 last:border-b-0"
  >
    <div className="flex items-baseline gap-4 mb-3">
      <h4
        className="text-[#fdfbf7] group-hover:text-[#c5a059] transition-colors"
        style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.6rem", fontWeight: 400 }}
      >
        {item.name}
      </h4>
      <span className="flex-1 mx-2 border-b border-dotted border-[#c5a059]/30 translate-y-[-6px]" />
      <span
        className="text-[#c5a059] tabular-nums"
        style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.4rem", fontWeight: 500 }}
      >
        {item.price}€
      </span>
    </div>
    <p
      className="text-[#fdfbf7]/55 text-sm md:text-[0.95rem] leading-relaxed max-w-2xl"
      style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
    >
      {item.desc}
    </p>
  </motion.div>
);

export const SognoMenu = () => {
  const [active, setActive] = useState("antipasti");
  const current = CATEGORIES.find((c) => c.id === active);

  return (
    <section
      id="menu"
      data-testid="sogno-menu"
      className="bg-[#141211] text-[#fdfbf7] py-32 md:py-40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p
            className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-8"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            — La Carta
          </p>
          <h2
            className="leading-[1.02] tracking-tight"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 400,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            }}
          >
            <em className="italic">Cinque</em> capitoli, un seul <em className="italic text-[#c5a059]">amore</em>.
          </h2>
          <p
            className="mt-6 text-[#fdfbf7]/55 text-base md:text-lg"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
          >
            Tous nos plats sont préparés à la commande, avec des produits frais
            sourcés directement chez nos producteurs italiens.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mb-16 border-b border-[#c5a059]/15 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              data-testid={`sogno-menu-tab-${cat.id}`}
              className={`relative pb-3 text-[11px] uppercase tracking-[0.28em] transition-colors ${
                active === cat.id
                  ? "text-[#c5a059]"
                  : "text-[#fdfbf7]/55 hover:text-[#fdfbf7]"
              }`}
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {cat.label}
              {active === cat.id && (
                <motion.span
                  layoutId="menu-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#c5a059]"
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {current.items.map((item, i) => (
            <MenuItem key={item.name} item={item} i={i} />
          ))}
        </motion.div>

        <p
          className="text-center mt-16 text-[10px] uppercase tracking-[0.32em] text-[#fdfbf7]/40"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Prix nets, service compris  •  Allergènes sur demande
        </p>
      </div>
    </section>
  );
};

export default SognoMenu;
