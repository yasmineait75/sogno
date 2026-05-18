import React from "react";
import { Link } from "react-router-dom";
import { SOGNO } from "../../lib/sogno-data";

export const SognoFooter = () => {
  return (
    <footer
      data-testid="sogno-footer"
      className="bg-[#0a0908] text-[#fdfbf7] pt-24 pb-12 overflow-hidden border-t border-[#c5a059]/15"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#c5a059]/15 pb-16">
          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-5">— Il Ristorante</p>
            <p className="text-[#fdfbf7]/65 text-sm leading-relaxed max-w-md" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}>
              Sogno, c'est l'Italie qu'on aime — celle de la table partagée, du vin
              généreux et du sourire de la mamma. À deux pas du Trocadéro, depuis 2019.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-5">Indirizzo</p>
            <p className="text-[#fdfbf7]/65 text-sm leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}>
              {SOGNO.address}
              <br />
              {SOGNO.metro}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#c5a059] mb-5">Contatto</p>
            <p className="text-[#fdfbf7]/65 text-sm leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}>
              {SOGNO.phone}
              <br />
              <a
                href={`mailto:${SOGNO.email}`}
                className="hover:text-[#c5a059] transition-colors border-b border-[#fdfbf7]/30"
              >
                {SOGNO.email}
              </a>
            </p>
          </div>
        </div>

        {/* Massive logotype */}
        <div className="pt-20 pb-10 overflow-hidden">
          <p
            data-testid="sogno-footer-logotype"
            className="italic text-[#fdfbf7]/95 leading-[0.85] whitespace-nowrap"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 400,
              fontSize: "clamp(4rem, 17vw, 18rem)",
            }}
          >
            Sogno<span className="text-[#c5a059]">.</span>
          </p>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-[#fdfbf7]/35"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <span>© {new Date().getFullYear()} — Sogno Paris. Tutti i diritti riservati</span>
          <Link to="/" className="hover:text-[#c5a059] transition-colors">
            Visitare Le Jean Michel Breizh ↗
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default SognoFooter;
