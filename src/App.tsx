import gsap from "gsap";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { NavBar } from "@/sections/NavBar";
import { Hero } from "@/sections/Hero";
import { Works } from "@/sections/Works";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { CursorFollower } from "@/components/CursorFollower";

function App() {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <section id="home" className="min-h-screen w-full bg-background">
      <CursorFollower />
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <NavBar />
      <section className="flex h-auto">
        <section className="hidden lg:block w-1/12"></section>
        <section className="text-amber-50 border-x border-gray-border border-t-0 flex-1 overflow-x-hidden">
          <Hero />
          <Works />
          <About />
          <Contact />
        </section>
        <section className="hidden lg:block w-1/12"></section>
      </section>
      <Footer />
    </section>
  );
}

export default App;
