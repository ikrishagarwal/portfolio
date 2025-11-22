import { Time } from "@/components/Time";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin);

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

  const nameRef = useRef(null);
  let nameAnimation: gsap.core.Tween | null = null;

  const animateName = () => {
    if (!nameRef.current) return;
    if (nameAnimation) nameAnimation.kill();

    nameAnimation = gsap.to(nameRef.current, {
      opacity: 0.7,
      duration: 1.5,
      ease: "power2.out",
      scrambleText: {
        text: "agarwal",
        chars: "01",
        speed: 0.3,
      },
    });
  };

  const revertName = () => {
    if (!nameRef.current) return;
    if (nameAnimation) nameAnimation.kill();

    gsap.to(nameRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(nameRef.current, { opacity: 0 });
      },
    });
  };

  useEffect(() => {
    gsap.utils.toArray(".nav-links").forEach((rawLink, i) => {
      const link = rawLink as HTMLElement;

      const underline = //
        gsap.utils.toArray(".nav-underline")[i] as HTMLElement | null;
      const navText = gsap.utils.toArray(".nav-text")[i] as HTMLElement;

      const tl = gsap.timeline({ paused: true });
      (link as any).tl = tl;

      if (underline) {
        tl.add("start");

        tl.fromTo(
          underline,
          {
            width: "0%",
            left: "0%",
          },
          {
            width: "100%",
            duration: 0.5,
          }
        );

        tl.to(
          navText,
          {
            scrambleText: {
              text: navText.textContent || "",
              chars: "01",
              // speed: 0.01,
            },
            duration: 0.8,
            ease: "power2.out",
          },
          "start"
        );

        tl.add("midway");

        tl.fromTo(
          underline,
          {
            width: "100%",
            left: "0%",
          },
          {
            width: "0%",
            left: "100%",
            duration: 0.5,
            immediateRender: false,
          }
        );
      }

      // Mouseenter
      link.addEventListener("mouseenter", () => {
        (link as any).tl.tweenFromTo(0, "midway");
      });

      // Mouseleave
      link.addEventListener("mouseleave", () => {
        (link as any).tl.play();
      });
    });
  }, []);

  return (
    <header
      ref={navRef}
      className="flex text-slate-50 border-b border-b-gray-border px-6 py-6 items-center sticky"
    >
      <div
        className="text-2xl font-brand flex-1 lg:flex-none cursor-pointer"
        onMouseEnter={animateName}
        onMouseLeave={revertName}
      >
        krish{" "}
        <span ref={nameRef} className="hidden md:inline opacity-0 absolute">
          agarwal
        </span>
      </div>

      <div className="flex-1 hidden lg:block">
        <nav className="flex justify-center gap-4 font-spline-mono uppercase">
          <a href="#home" className="nav-links">
            <span className="nav-text">Home</span>
            <span className="nav-underline"></span>
          </a>
          <a href="#works" className="nav-links">
            <span className="nav-text">Works</span>
            <span className="nav-underline"></span>
          </a>
          <a href="#about" className="nav-links">
            <span className="nav-text">About</span>
            <span className="nav-underline"></span>
          </a>
          <a href="#contact" className="nav-links">
            <span className="nav-text">Contact</span>
            <span className="nav-underline"></span>
          </a>
        </nav>
      </div>

      <div className="font-spline-mono text-gray-400">
        <Time />
      </div>
    </header>
  );
}
