import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#storia", label: "La Storia" },
  { href: "#menu", label: "Il Menu" },
  { href: "#galleria", label: "Galleria" },
  { href: "#prenotare", label: "Contatto" },
];

export const SognoNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="sogno-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0a0908]/80 border-b border-[#c5a059]/15"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <a
          href="#top"
          data-testid="sogno-logo"
          className="font-serif-display text-3xl tracking-[0.18em] text-[#fdfbf7] uppercase"
          style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 500 }}
        >
          So<span className="text-[#c5a059]">g</span>no
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`sogno-nav-${l.href.replace("#", "")}`}
              className="text-[11px] uppercase tracking-[0.22em] font-medium text-[#fdfbf7]/85 hover:text-[#c5a059] transition-colors"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#prenotare"
            data-testid="sogno-nav-reserve"
            className="text-[11px] uppercase tracking-[0.22em] font-semibold px-7 py-3 bg-[#c5a059] text-[#0a0908] hover:bg-[#dfb768] transition-colors"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Prenotare
          </a>
          <Link
            to="/"
            data-testid="sogno-nav-other-site"
            className="text-[11px] uppercase tracking-[0.22em] text-[#fdfbf7]/55 hover:text-[#c5a059] transition-colors border-l border-[#c5a059]/25 pl-6"
            style={{ fontFamily: "'Manrope', sans-serif" }}
            title="Visiter Le Jean Michel Breizh"
          >
            Breizh ↗
          </Link>
        </nav>

        <button
          data-testid="sogno-nav-toggle"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-[#fdfbf7]"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a0908] border-t border-[#c5a059]/20">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-[0.22em] text-[#fdfbf7]/85 hover:text-[#c5a059]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#prenotare"
              onClick={() => setOpen(false)}
              data-testid="sogno-mobile-reserve"
              className="text-[11px] uppercase tracking-[0.22em] bg-[#c5a059] text-[#0a0908] px-6 py-3 text-center mt-2"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Prenotare
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default SognoNavbar;
