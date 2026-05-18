import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Toaster } from "sonner";
import SognoNavbar from "../components/sogno/SognoNavbar";
import SognoHero from "../components/sogno/SognoHero";
import SognoStoria from "../components/sogno/SognoStoria";
import SognoMenu from "../components/sogno/SognoMenu";
import SognoGalleria from "../components/sogno/SognoGalleria";
import SognoReservation from "../components/sogno/SognoReservation";
import SognoFooter from "../components/sogno/SognoFooter";

const SognoPage = () => {
  useEffect(() => {
    document.title = "Sogno — Ristorante Italiano  •  Paris 16e";
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#0a0908";

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  return (
    <div className="bg-[#0a0908] min-h-screen" data-testid="sogno-page">
      <SognoNavbar />
      <main>
        <SognoHero />
        <SognoStoria />
        <SognoMenu />
        <SognoGalleria />
        <SognoReservation />
      </main>
      <SognoFooter />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#141211",
            color: "#fdfbf7",
            border: "1px solid rgba(197,160,89,0.30)",
            borderRadius: 0,
            fontFamily: "Manrope, sans-serif",
            fontSize: "13px",
            letterSpacing: "0.02em",
          },
        }}
      />
    </div>
  );
};

export default SognoPage;
