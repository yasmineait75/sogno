import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SOGNO_MEDIA } from "../../lib/sogno-data";

const GALLERY_ITEMS = [
  { src: SOGNO_MEDIA.dishes.palourdes, alt: "Linguine alle vongole", cls: "col-span-12 md:col-span-7 row-span-2 h-[460px]", caption: "Linguine alle Vongole" },
  { src: SOGNO_MEDIA.dishes.vitello, alt: "Vitello tonnato", cls: "col-span-12 md:col-span-5 h-[220px]", caption: "Vitello tonnato" },
  { src: SOGNO_MEDIA.dishes.uovo, alt: "Uovo alla Valtellina", cls: "col-span-12 md:col-span-5 h-[220px]", caption: "Uovo alla Valtellina" },
  { src: SOGNO_MEDIA.dishes.crevette, alt: "Gamberi alla 'nduja", cls: "col-span-6 md:col-span-4 h-[300px]", caption: "Gamberi alla 'nduja" },
  { src: SOGNO_MEDIA.dishes.lasagne, alt: "Lasagna al ragù", cls: "col-span-6 md:col-span-4 h-[300px]", caption: "Lasagna al ragù" },
  { src: SOGNO_MEDIA.dishes.poulet, alt: "Suprema di pollo al tartufo", cls: "col-span-12 md:col-span-4 h-[300px]", caption: "Suprema al tartufo" },
];

const SWIPE_THRESHOLD = 50;

const Lightbox = ({ index, onClose, onPrev, onNext }) => {
  const item = GALLERY_ITEMS[index];
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > SWIPE_THRESHOLD) onPrev();
    else if (dx < -SWIPE_THRESHOLD) onNext();
    touchStartX.current = null;
  };

  return (
    <motion.div
      key="lightbox"
      data-testid="sogno-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
    >
      {/* Counter */}
      <p
        data-testid="sogno-lightbox-counter"
        className="absolute top-6 right-20 text-white/60 text-[11px] uppercase tracking-[0.28em] tabular-nums"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        {String(index + 1).padStart(2, "0")} / {String(GALLERY_ITEMS.length).padStart(2, "0")}
      </p>

      {/* Close */}
      <button
        data-testid="sogno-lightbox-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Fermer"
        className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors p-2"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      {/* Prev */}
      <button
        data-testid="sogno-lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Précédent"
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3"
      >
        <ChevronLeft size={44} strokeWidth={1.5} />
      </button>

      {/* Next */}
      <button
        data-testid="sogno-lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Suivant"
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3"
      >
        <ChevronRight size={44} strokeWidth={1.5} />
      </button>

      {/* Image + caption */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center justify-center max-w-[90vw] max-h-[90vh]"
      >
        <img
          src={item.src}
          alt={item.alt}
          data-testid="sogno-lightbox-image"
          className="max-w-[90vw] max-h-[82vh] object-contain"
          draggable={false}
        />
        <p
          data-testid="sogno-lightbox-caption"
          className="text-white italic mt-6 text-center"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
            fontWeight: 400,
            letterSpacing: "0.01em",
          }}
        >
          {item.caption}
        </p>
      </motion.div>
    </motion.div>
  );
};

export const SognoGalleria = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isOpen = selectedIndex !== null;

  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(
    () => setSelectedIndex((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)),
    []
  );
  const next = useCallback(
    () => setSelectedIndex((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length)),
    []
  );

  // Keyboard + scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, prev, next]);

  return (
    <section
      id="galleria"
      data-testid="sogno-galleria"
      className="bg-[#F9F6F0] text-[#2C3E38] py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p
              className="text-[11px] uppercase tracking-[0.32em] text-[#1F4E5F] mb-6"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              — Galerie
            </p>
            <h2
              className="leading-[1.02] tracking-tight"
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontWeight: 400,
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              }}
            >
              <em className="italic">Bellezza</em> nei dettagli.
            </h2>
          </div>
          <p
            className="text-[#5C6B66] max-w-sm md:text-right"
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
          >
            Tournée comme une carte postale italienne — chaque assiette dressée à
            la minute, chaque produit choisi à la main par notre chef.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4 auto-rows-min">
          {GALLERY_ITEMS.map((it, i) => (
            <motion.button
              type="button"
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => setSelectedIndex(i)}
              data-testid={`sogno-gallery-${i}`}
              aria-label={`Agrandir ${it.caption}`}
              className={`relative overflow-hidden group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4E5F] ${it.cls}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />
              <p
                className="absolute bottom-5 left-5 text-white italic text-left"
                style={{ fontFamily: "'Bodoni Moda', serif", fontSize: "1.3rem", textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
              >
                {it.caption}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Lightbox
            index={selectedIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default SognoGalleria;
