import React from "react";
import { RESTAURANT } from "../lib/data";

export const Footer = () => {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#14171A] text-[#EAE4D9] pt-20 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#EAE4D9]/15 pb-16">
          <div>
            <p className="text-overline text-[#C27A3E] mb-5">Le bistrot</p>
            <p className="font-sans-body text-[#EAE4D9]/80 text-sm leading-relaxed">
              Crêperie & bistrot breton, niché dans le 16<sup>e</sup>, où sarrasin de
              Berrien et cidres fermiers s'écrivent en lettres françaises.
            </p>
          </div>
          <div>
            <p className="text-overline text-[#C27A3E] mb-5">Adresse</p>
            <p className="font-sans-body text-[#EAE4D9]/80 text-sm leading-relaxed">
              {RESTAURANT.address}<br />
              {RESTAURANT.metro}
            </p>
          </div>
          <div>
            <p className="text-overline text-[#C27A3E] mb-5">Contact</p>
            <p className="font-sans-body text-[#EAE4D9]/80 text-sm leading-relaxed">
              {RESTAURANT.phone}<br />
              <a href={`mailto:${RESTAURANT.email}`} className="hover:text-[#C27A3E] transition-colors border-b border-[#EAE4D9]/30">
                {RESTAURANT.email}
              </a>
            </p>
          </div>
        </div>

        {/* Massive logotype */}
        <div className="pt-16 pb-8 overflow-hidden">
          <p
            className="font-serif-display italic text-[#EAE4D9]/95 leading-[0.9] whitespace-nowrap"
            style={{ fontSize: "clamp(3rem, 13vw, 14rem)" }}
            data-testid="footer-logotype"
          >
            Le Jean Michel Breizh
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-overline text-[#EAE4D9]/50">
          <span>© {new Date().getFullYear()} — Tous droits réservés</span>
          <span>Fait avec ❤ à Paris  •  Inspiré par Concarneau</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
