
import "./Hero.css";
import ImageCarousel from "./ImageCarousel";

import customization from "../images/customization.png";
import autoResize from "../images/auto-resize.png";
import download from "../images/instant-download.png";

export default function Hero() {
  return (
    <section className="hero">
      <ImageCarousel />

      <div className="features">
        <div className="feat">
          <img src={customization} alt="Customization" className="feat-icon" />
          <h3 className="feat-title">Feature 1</h3>
          <p>Customize certificates easily with layout and design tools.</p>
        </div>

        
        <div className="feat">
          <img src={autoResize} alt="Auto Resizing" className="feat-icon" />
          <h3 className="feat-title">Feature 2</h3>
          <p>Choose from beautiful, modern certificate templates.</p>
        </div>

        
        <div className="feat">
          <img src={download} alt="Instant Download" className="feat-icon" />
          <h3 className="feat-title">Feature 3</h3>
          <p>Download high-res certificates in vector/PDF format.</p>
        </div>
      </div>

      <button className="cta">Create Certificate →</button>
    </section>
  );
}