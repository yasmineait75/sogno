import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "L'âme" },
  { href: "#menu", label: "La carte" },
  { href: "#gallery", label: "Atelier" },
  { href: "#reserve", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#F9F6F0]/85 border-b border-[#1A1A1A]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        <a
          href="#top"
          data-testid="nav-logo"
          className={`font-serif-display text-2xl md:text-[1.65rem] leading-none tracking-tight transition-colors ${
            scrolled ? "text-[#1A1A1A]" : "text-[#F9F6F0]"
          }`}
        >
          Le Jean Michel <span className="italic text-cider">Breizh</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.href.replace("#", "")}`}
              className={`text-overline transition-colors hover:text-cider ${
                scrolled ? "text-[#1A1A1A]" : "text-[#F9F6F0]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reserve"
            data-testid="nav-reserve-button"
            className={`text-overline px-6 py-3 border transition-all duration-300 ${
              scrolled
                ? "bg-[#1B2A47] text-[#F9F6F0] border-[#1B2A47] hover:bg-[#C27A3E] hover:border-[#C27A3E]"
                : "border-[#F9F6F0] text-[#F9F6F0] hover:bg-[#F9F6F0] hover:text-[#1B2A47]"
            }`}
          >
            Réserver
          </a>
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((o) => !o)}
          className={`md:hidden ${scrolled ? "text-[#1A1A1A]" : "text-[#F9F6F0]"}`}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#F9F6F0] border-t border-[#1A1A1A]/10" data-testid="nav-mobile-panel">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-overline text-[#1A1A1A] hover:text-cider"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#reserve"
              onClick={() => setOpen(false)}
              data-testid="nav-mobile-reserve"
              className="text-overline bg-[#1B2A47] text-[#F9F6F0] px-6 py-3 text-center mt-2"
            >
              Réserver une table
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
