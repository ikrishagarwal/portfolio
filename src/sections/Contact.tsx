import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const headingRef = useRef(null);
  const descRef = useRef(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
    });

    const split = new SplitText(headingRef.current, { type: "words" });

    tl.fromTo(
      split.words,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.25,
      }
    );

    tl.fromTo(
      descRef.current,
      {
        x: -20,
      },
      {
        duration: 2.5,
        x: 0,
        scrambleText: {
          text: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out tome via email.",
          chars: "0 1",
          speed: 0.3,
        },
        ease: "power2.out",
      },
      "<.5"
    );

    return () => {
      tl.kill();
      split.revert();
    };
  });
  return (
    <section
      id="contact"
      className="min-h-screen w-full bg-background text-amber-50 px-8 py-20 flex"
    >
      <h1
        ref={headingRef}
        className="text-8xl font-bold mb-4 font-brand text-center flex-4"
      >
        How about we work on something together?
      </h1>
      <div className="max-w-4xl mx-auto mt-20 text-justify text-xl leading-relaxed font-spline-mono font-regular flex-2">
        <div className="flex flex-col items-center">
          <p ref={descRef} className="mb-6 px-4">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions. Feel free to reach out to
            me via email.
          </p>
          <a href="mailto:foronlykrish@gmail.com">
            <button className="cursor-pointer w-full mt-3 px-6 py-3 bg-amber-50 text-background font-spline-mono font-bold rounded-full hover:bg-amber-100 transition-colors">
              Get in Touch
            </button>
          </a>
          <a href="#">
            <button className="cursor-pointer w-full mt-3 px-15 py-3 bg-amber-50 text-background font-spline-mono font-bold rounded-full hover:bg-amber-100 transition-colors">
              Resume
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
