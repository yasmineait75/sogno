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
          ? "backdrop-blur-xl bg-[#F9F6F0]/85 border-b border-[#E5DFD3]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <a
          href="#top"
          data-testid="sogno-logo"
          className={`tracking-[0.18em] uppercase transition-colors ${scrolled ? "text-[#2C3E38]" : "text-white"}`}
          style={{ fontFamily: "'Bodoni Moda', serif", fontWeight: 500, fontSize: "1.75rem", letterSpacing: "0.18em" }}
        >
          So<span className="text-[#E8B931]">g</span>no
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`sogno-nav-${l.href.replace("#", "")}`}
              className={`text-[11px] uppercase tracking-[0.22em] font-medium transition-colors hover:text-[#1F4E5F] ${
                scrolled ? "text-[#2C3E38]" : "text-white"
              }`}
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#prenotare"
            data-testid="sogno-nav-reserve"
            className={`text-[11px] uppercase tracking-[0.22em] font-semibold px-7 py-3 transition-colors ${
              scrolled
                ? "bg-[#1F4E5F] text-white hover:bg-[#173B49]"
                : "bg-white text-[#2C3E38] hover:bg-[#1F4E5F] hover:text-white"
            }`}
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Prenotare
          </a>
          <Link
            to="/"
            data-testid="sogno-nav-other-site"
            className={`text-[11px] uppercase tracking-[0.22em] transition-colors border-l pl-6 ${
              scrolled
                ? "text-[#5C6B66] hover:text-[#1F4E5F] border-[#E5DFD3]"
                : "text-white/70 hover:text-white border-white/40"
            }`}
            style={{ fontFamily: "'Manrope', sans-serif" }}
            title="Visiter Le Jean Michel Breizh"
          >
            Breizh ↗
          </Link>
        </nav>

        <button
          data-testid="sogno-nav-toggle"
          onClick={() => setOpen((o) => !o)}
          className={scrolled ? "md:hidden text-[#2C3E38]" : "md:hidden text-white"}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#F9F6F0] border-t border-[#E5DFD3]">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[11px] uppercase tracking-[0.22em] text-[#2C3E38] hover:text-[#1F4E5F]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#prenotare"
              onClick={() => setOpen(false)}
              data-testid="sogno-mobile-reserve"
              className="text-[11px] uppercase tracking-[0.22em] bg-[#1F4E5F] text-white px-6 py-3 text-center mt-2"
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
