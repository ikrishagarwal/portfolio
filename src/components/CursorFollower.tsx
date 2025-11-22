import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CursorFollower() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const bounceRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    // hide on touch devices early
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      el.style.display = "none";
      return;
    }

    gsap.set(el, {
      top: 0,
      left: 0,
      width: 8,
      height: 8,
      backgroundColor: "#FDE68A",
    });

    gsap.set(inner, {
      width: "100%",
      height: "100%",
      color: "#111827",
    });

    const onMove = (e: MouseEvent) => {
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    };
    document.addEventListener("mousemove", onMove);

    bounceRef.current = gsap.to(el, {
      scale: 1.06,
      duration: 0.9,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // work-card hover behavior
    const cards = Array.from(
      document.querySelectorAll(".work-card")
    ) as HTMLElement[];

    const enterCard = () => {
      gsap.killTweensOf(el);
      gsap.to(el, {
        width: 54,
        height: 54,
        backgroundColor: "#fde171",
        duration: 0.22,
        ease: "power2.out",
      });
      gsap.to(inner, { opacity: 1, duration: 0.15 });
      if (bounceRef.current) bounceRef.current.pause();
      gsap.fromTo(
        el,
        { scale: 0.92 },
        { scale: 1.04, duration: 0.45, ease: "elastic.out(1, 0.45)" }
      );
    };

    const leaveCard = () => {
      gsap.to(inner, { opacity: 0, duration: 0.15 });
      gsap.to(el, {
        width: 8,
        height: 8,
        backgroundColor: "#FDE68A",
        duration: 0.22,
        ease: "power2.out",
        onComplete: () => {
          if (bounceRef.current) bounceRef.current.resume();
        },
      });
    };

    cards.forEach((c) => {
      c.addEventListener("mouseenter", enterCard);
      c.addEventListener("mouseleave", leaveCard);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cards.forEach((c) => {
        c.removeEventListener("mouseenter", enterCard);
        c.removeEventListener("mouseleave", leaveCard);
      });
      if (bounceRef.current) bounceRef.current.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="hidden md:block rounded-full z-9999 pointer-events-none fixed translate-x-[-50%] translate-y-[-50%]"
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="flex justify-center items-center pointer-events-none opacity-0 -rotate-45 scale-150"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black"
        >
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
