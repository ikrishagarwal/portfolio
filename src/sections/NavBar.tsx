import { Time } from "@/components/Time";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export function NavBar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!navRef.current) return;

    const navbarTl = gsap.timeline();

    navbarTl.fromTo(
      navRef.current,
      {
        y: -100,
        opacity: 0,
        scaleX: 0.95,
        scaleY: 0.8,
        borderRadius: "8px",
        borderTop: "1px solid #444444",
        borderLeft: "1px solid #444444",
        borderRight: "1px solid #444444",
      },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    navbarTl.to(navRef.current, {
      scaleX: 1,
      scaleY: 1,
      borderRadius: "0px",
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      duration: 0.75,
      ease: "power2.out",
    });

    return () => {
      navbarTl.kill();
    };
  }, []);

  return (
    <header
      ref={navRef}
      className="flex text-slate-50 border-b border-b-gray-border px-6 py-6 items-center sticky"
    >
      <div className="text-2xl font-brand">krish</div>

      <nav className="flex-1 flex justify-center gap-4 font-spline-mono uppercase">
        <a href="#hero">Home</a>
        <a href="#works">Works</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="font-spline-mono text-gray-400">
        <Time />
      </div>
    </header>
  );
}
