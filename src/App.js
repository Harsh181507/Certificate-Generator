// src/App.js
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

/* Import component css (Navbar imported inside itself; Hero imports its css; Carousel imports its css) */

export default function App(){
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}
