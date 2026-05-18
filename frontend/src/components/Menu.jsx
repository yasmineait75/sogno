import React from "react";
import { motion } from "framer-motion";
import { SAVORY_GALETTES, SWEET_CREPES, DRINKS } from "../lib/data";

const MenuItem = ({ item, idx }) => (
  <motion.div
    data-testid={`menu-item-${item.name.toLowerCase().replace(/\s/g, "-")}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: idx * 0.06 }}
    viewport={{ once: true, margin: "-50px" }}
    className="group flex items-start justify-between gap-6 py-6 border-b border-[#1A1A1A]/12 last:border-b-0 hover:bg-[#EAE4D9]/40 transition-colors px-2 -mx-2"
  >
    <div className="flex-1">
      <h4 className="font-serif-display text-2xl md:text-[1.65rem] text-[#1A1A1A] leading-tight">
        {item.name}
      </h4>
      <p className="mt-2 font-sans-body text-sm md:text-[0.95rem] text-[#1A1A1A]/65 leading-relaxed">
        {item.desc}
      </p>
    </div>
    <div className="flex items-baseline gap-1 shrink-0 pt-2">
      <span className="font-serif-display text-2xl text-navy">{item.price}</span>
      <span className="font-accent text-sm text-[#1A1A1A]/50">€</span>
    </div>
  </motion.div>
);

export const Menu = () => {
  return (
    <section
      id="menu"
      data-testid="menu-section"
      className="bg-cream-2 py-24 md:py-36 ermine-pattern"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-overline text-cider mb-6">— La carte</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-[#1A1A1A]">
            Trois familles, <em className="italic">une obsession</em> : le bon produit.
          </h2>
          <p className="mt-6 font-sans-body text-[#1A1A1A]/65 text-base md:text-lg">
            Carte renouvelée au fil des saisons. Tous nos plats sont préparés à la
            commande, devant vous, sur notre billig en fonte.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20">
          <div>
            <div className="flex items-end justify-between mb-8 pb-6 border-b-2 border-[#1B2A47]">
              <h3 className="font-serif-display text-3xl md:text-4xl text-navy">
                Galettes de sarrasin
              </h3>
              <p className="text-overline text-[#1A1A1A]/60">salées</p>
            </div>
            {SAVORY_GALETTES.map((it, i) => (
              <MenuItem key={it.name} item={it} idx={i} />
            ))}
          </div>
          <div>
            <div className="flex items-end justify-between mb-8 pb-6 border-b-2 border-[#1B2A47]">
              <h3 className="font-serif-display text-3xl md:text-4xl text-navy">
                Crêpes de froment
              </h3>
              <p className="text-overline text-[#1A1A1A]/60">sucrées</p>
            </div>
            {SWEET_CREPES.map((it, i) => (
              <MenuItem key={it.name} item={it} idx={i} />
            ))}
          </div>
        </div>

        {/* Drinks */}
        <div className="mt-24">
          <div className="flex items-end justify-between mb-8 pb-6 border-b-2 border-[#1B2A47]">
            <h3 className="font-serif-display text-3xl md:text-4xl text-navy">
              Cidres & spiritueux bretons
            </h3>
            <p className="text-overline text-[#1A1A1A]/60">à la bolée</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            {DRINKS.map((it, i) => (
              <MenuItem key={it.name} item={it} idx={i} />
            ))}
          </div>
        </div>

        <p className="text-center mt-16 text-overline text-[#1A1A1A]/50">
          Prix nets, service compris. Allergènes sur demande.
        </p>
      </div>
    </section>
  );
};

export default Menu;
