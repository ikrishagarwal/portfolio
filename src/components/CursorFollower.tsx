import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CursorFollower() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const bounceRef = useRef<gsap.core.Tween | null>(null);
  const enterTimeoutRef = useRef<number | null>(null);
  const leaveTimeoutRef = useRef<number | null>(null);
  const lastMouseXRef = useRef(0);
  const lastMouseYRef = useRef(0);
  const isHoveringCardRef = useRef(false);

  // constants
  const defaultSize = 38;
  // const expandedSize = defaultSize * 5;
  const debounceMs = 80;

  useEffect(() => {
    const el = rootRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    // hide on touch devices early
    if (
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      el.style.display = "none";
      return;
    }

    gsap.set(el, {
      top: 0,
      left: 0,
      width: defaultSize,
      height: defaultSize,
      backgroundColor: "var(--color-accent)",
      opacity: 0.8,
    });

    const innerDefaultScale = 4;

    gsap.set(inner, {
      width: "100%",
      height: "100%",
      scale: innerDefaultScale,
      transformOrigin: "center center",
    });

    const onMove = (e: MouseEvent) => {
      lastMouseXRef.current = e.clientX;
      lastMouseYRef.current = e.clientY;
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.85,
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

    // work-card hover behavior - per-card listeners
    const cards = Array.from(
      document.querySelectorAll(".work-card"),
    ) as HTMLElement[];

    const enterCard = (card: HTMLElement) => {
      isHoveringCardRef.current = true;
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = window.setTimeout(() => {
        if (!isHoveringCardRef.current) return;
        gsap.killTweensOf(el, { x: true, y: true });
        gsap.to(el, {
          scale: 5,
          duration: 0.6,
          ease: "back.inOut(1.7)",
        });
        gsap.to(inner, {
          scale: 2,
          opacity: 0.8,
          duration: 0.5,
          ease: "power2.out",
        });
        if (bounceRef.current) bounceRef.current.pause();
        gsap.to(card, {
          scale: 0.97,
          borderWidth: "1px",
          duration: 0.3,
          ease: "power2.out",
        });
      }, debounceMs);
    };

    const leaveCard = (card: HTMLElement) => {
      isHoveringCardRef.current = false;
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = window.setTimeout(() => {
        if (isHoveringCardRef.current) return;
        gsap.to(inner, {
          scale: innerDefaultScale,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(el, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            if (bounceRef.current) bounceRef.current.resume();
            gsap.to(el, {
              x: lastMouseXRef.current,
              y: lastMouseYRef.current,
              duration: 0.3,
              ease: "power3.out",
            });
          },
        });
        gsap.to(card, {
          scale: 1,
          borderWidth: "0px",
          duration: 0.3,
          ease: "power2.out",
        });
      }, debounceMs);
    };

    cards.forEach((c) => {
      c.addEventListener("mouseenter", () => enterCard(c));
      c.addEventListener("mouseleave", () => leaveCard(c));
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cards.forEach((c) => {
        c.removeEventListener("mouseenter", () => enterCard(c));
        c.removeEventListener("mouseleave", () => leaveCard(c));
      });
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      if (bounceRef.current) bounceRef.current.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="hidden md:block rounded-full z-9999 pointer-events-none fixed  translate-x-[-50%] translate-y-[-50%]"
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="flex justify-center items-center pointer-events-none opacity-0 -rotate-45"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-background"
        >
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            // strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
