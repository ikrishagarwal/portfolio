import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin, SplitText } from "gsap/all";

gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(SplitText);

export function Hero() {
  const introRef = useRef(null);
  const nameRef = useRef(null);
  const dotRef = useRef(null);
  const explorerRef = useRef(null);

  useGSAP(() => {
    if (!introRef.current) return;

    const tl = gsap.timeline();

    tl.delay(0.5);

    // Animating "Hi! I'm"
    tl.fromTo(
      introRef.current,
      {
        x: -20,
        opacity: 0,
      },
      {
        duration: 1,
        x: 0,
        opacity: 1,
        scrambleText: {
          text: "Hi! I'm",
          chars: "01",
          speed: 0.3,
        },
        ease: "power2.out",
      }
    );

    // Animating "Krish"
    tl.fromTo(
      nameRef.current,
      {
        y: -20,
        opacity: 0,
      },
      {
        duration: 0.75,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Animating the dot
    tl.fromTo(
      dotRef.current,
      {
        opacity: 0,
      },
      {
        duration: 0.35,
        opacity: 1,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Animating the hero text characters
    const split = SplitText.create(".hero-text", { type: "words" });

    tl.fromTo(
      split.words,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.out",
        stagger: 0.25,
      }
    );

    // Animating the explorer description
    tl.fromTo(
      explorerRef.current,
      {
        x: 20,
        opacity: 0,
      },
      {
        duration: 2,
        x: 0,
        opacity: 1,
        scrambleText: {
          text: "An enthusiastic programmer and explorer, who loves to learn and create.",
          chars: "0 1",
          speed: 0.3,
        },
        ease: "power2.out",
      },
      "-=1.75"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center text-amber-50 text-center px-6 py-20 gap-6 border-b border-b-gray-border"
    >
      <div>
        <p>
          <span className="block lg:inline text-sm md:text-lg font-spline-mono pr-7 mb-2 md:mb-0">
            <span
              ref={introRef}
              className="inline-block text-amber-50 opacity-100"
            >
              0101101
            </span>{" "}
            <span
              ref={nameRef}
              className="inline-block bg-amber-200 text-background px-2 py-1 font-bold rounded-xs"
            >
              Krish
            </span>
            <span ref={dotRef}>.</span>
          </span>
          <span className="inline-block hero-text">Software -</span>
        </p>
        <p className="hero-text">Developer</p>
        <div>
          <p className="hero-text">& Explorer</p>
          <span
            ref={explorerRef}
            className="block max-w-md mt-2 md:mt-0 md:ml-auto text-sm md:text-base font-spline-mono leading-relaxed md:text-right"
          >
            An enthusiastic programmer and explorer, who loves to learn and
            create.
          </span>
        </div>
      </div>
    </section>
  );
}
