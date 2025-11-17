import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function About() {
  const headingRef = useRef(null);

  useGSAP(() => {
    if (!headingRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
    });

    const split = new SplitText(headingRef.current, { type: "chars" });
    tl.fromTo(
      split.chars,
      {
        x: -20,
        opacity: 0,
      },
      {
        duration: 1,
        x: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "back.out",
      }
    );

    const aboutSplit = new SplitText(".about-text", {
      type: "words",
      mask: "words",
    });
    gsap.fromTo(
      aboutSplit.words,
      {
        opacity: 0.3,
      },
      {
        duration: 3,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
        },
      }
    );

    return () => {
      tl.kill();
      aboutSplit.revert();
      split.revert();
    };
  });

  return (
    <section
      id="about"
      className="min-h-screen w-full bg-background text-amber-50 px-8 py-20 border-b border-gray-border"
    >
      <h1
        ref={headingRef}
        className="text-8xl font-bold mb-4 font-brand text-center"
      >
        About Me
      </h1>
      <div className="max-w-4xl mx-auto mt-20 text-justify text-2xl leading-relaxed font-spline-mono font-regular">
        <p className="mb-6 about-text">
          Hello! I'm Krish, a passionate developer with a love for creating
          beautiful and functional web applications. With a strong background in
          JavaScript and React, I enjoy building user-friendly interfaces and
          exploring new technologies. In my free time, I like to contribute to
          open-source projects and learn about the latest trends in web
          development.
        </p>
        <p className="about-text">
          I have worked in various full-stack projects, mobile applications,
          games, bot and automation scripts, and even hardware projects like
          mechanical keyboards. My goal is to continuously improve my skills and
          contribute to meaningful projects that make a difference.
        </p>
      </div>
    </section>
  );
}
