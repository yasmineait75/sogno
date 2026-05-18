import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Toaster } from "sonner";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Menu from "../components/Menu";
import Gallery from "../components/Gallery";
import Reservation from "../components/Reservation";
import Footer from "../components/Footer";

const BreizhPage = () => {
  useEffect(() => {
    document.title = "Le Jean Michel Breizh — Crêperie & Bistrot  •  Paris 16e";
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#F9F6F0";

    const lenis = new Lenis({
      duration: 1.2,
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
    <div className="bg-cream min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Reservation />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1D2125",
            color: "#F9F6F0",
            border: "1px solid rgba(234,228,217,0.15)",
            borderRadius: 0,
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />
    </div>
  );
};

export default BreizhPage;
