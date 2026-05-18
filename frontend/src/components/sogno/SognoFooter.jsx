import React from "react";
import { Link } from "react-router-dom";
import { SOGNO } from "../../lib/sogno-data";

export const SognoFooter = () => {
  return (
    <footer
      data-testid="sogno-footer"
      className="bg-[#F9F6F0] text-[#2C3E38] pt-24 pb-12 overflow-hidden border-t border-[#E5DFD3]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#E5DFD3] pb-16">
          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#1F4E5F] mb-5">— Il Ristorante</p>
            <p
              className="text-[#5C6B66] text-sm leading-relaxed max-w-md"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
            >
              Sogno, c'est la Riviera ligure transportée à Paris — terrasse
              ensoleillée, parasols rayés, citrons d'Amalfi et vermentinos
              de Sardaigne. Depuis 2019, à deux pas du Trocadéro.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#1F4E5F] mb-5">Indirizzo</p>
            <p
              className="text-[#5C6B66] text-sm leading-relaxed"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
            >
              {SOGNO.address}
              <br />
              {SOGNO.metro}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#1F4E5F] mb-5">Contatto</p>
            <p
              className="text-[#5C6B66] text-sm leading-relaxed"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
            >
              {SOGNO.phone}
              <br />
              <a
                href={`mailto:${SOGNO.email}`}
                className="hover:text-[#1F4E5F] transition-colors border-b border-[#E5DFD3]"
              >
                {SOGNO.email}
              </a>
            </p>
          </div>
        </div>

        <div className="pt-20 pb-10 overflow-hidden">
          <p
            data-testid="sogno-footer-logotype"
            className="italic leading-[0.85] whitespace-nowrap text-[#2C3E38]"
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontWeight: 400,
              fontSize: "clamp(4rem, 17vw, 18rem)",
            }}
          >
            Sogno<span className="text-[#E8B931]">.</span>
          </p>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-[#5C6B66]"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          <span>© {new Date().getFullYear()} — Sogno Paris. Tutti i diritti riservati</span>
          <Link to="/" className="hover:text-[#1F4E5F] transition-colors">
            Visitare Le Jean Michel Breizh ↗
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default SognoFooter;
