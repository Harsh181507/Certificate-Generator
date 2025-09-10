// src/components/ImageCarousel.js
import { useState, useEffect, useRef } from "react";
import "./ImageCarousel.css";

export default function ImageCarousel() {
 const slides = [
  { src: "/certificate2.png", alt: "Certificate" }
];

  const [idx, setIdx] = useState(0);
  const allowClick = useRef(true);

  const prev = () => {
    if (!allowClick.current) return;
    allowClick.current = false;
    setIdx((p) => (p === 0 ? slides.length - 1 : p - 1));
    setTimeout(() => (allowClick.current = true), 280);
  };

  const next = () => {
    if (!allowClick.current) return;
    allowClick.current = false;
    setIdx((p) => (p === slides.length - 1 ? 0 : p + 1));
    setTimeout(() => (allowClick.current = true), 280);
  };

  // auto-play every 4s
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((p) => (p === slides.length - 1 ? 0 : p + 1));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="ggc-wrap">
      <button className="ggc-arrow" onClick={prev} aria-label="Previous">
        <span className="ggc-chevron ggc-left" />
      </button>

      <div className="ggc-card">
        <div className="ggc-slide-wrap">
          <img
            className="ggc-image"
            key={idx}
            src={slides[idx].src}
            alt={slides[idx].caption}
            draggable="false"
          />
        </div>
      </div>

      <button className="ggc-arrow" onClick={next} aria-label="Next">
        <span className="ggc-chevron ggc-right" />
      </button>
    </div>
  );
}
