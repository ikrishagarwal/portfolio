import { useRef } from "react";
import { WorkCard } from "@/components/WorkCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export function Works() {
  const workCards = [
    {
      src: "/images/kwiz.png",
      link: "https://github.com/ikrishagarwal/kwiz",
      title: "Kwiz - A live quiz platform",
      description:
        "Kwiz is a modern quiz website designed to help professors quickly organize live quiz sessions with their students. With a real-time leaderboard and seamless user experience, Kwiz makes learning fun and engaging.",
      tags: ["react", "tailwind", "websockets", "nodejs"],
    },
    {
      src: "/images/keeb.png",
      link: "https://github.com/ikrishagarwal/Seed75",
      title: "Seed75 - A handcrafted mechanical keyboard",
      description:
        "A completely hand made 75% mechanical keyboard from PCB to case, even the firmware. Designed using KiCad and built using the KMK firmware framework.",
      tags: ["keyboard", "KiCad", "CAD", "KMK"],
    },
    {
      src: "/images/silly-swap.png",
      link: "https://github.com/ikrishagarwal/silly-swap",
      title: "Silly Swap - Another swapping algorithm",
      description:
        "Made my own algorithm to swap two variables without another variable or any arithmetic or XOR operations. It relies on binary shifting of numbers.",
      tags: ["algorithms", "C", "bitwise", "binary"],
    },
  ];

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

    // Animating the cards
    gsap.set(".work-card", { scale: 0.9 });

    // create a ScrollTrigger for each card
    gsap.utils.toArray(".work-card").forEach((card, i) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: card as Element,
            start: "top 80%",
            once: true,
          },
        })
        .fromTo(
          card as Element,
          {
            x: i & 1 ? -300 : 300,
            opacity: 0,
          },
          {
            duration: 0.75,
            x: 0,
            opacity: 1,
            stagger: 0.5,
            ease: "power2.out",
          }
        )
        .to(
          card as Element,
          {
            scale: 1,
            stagger: 0.5,
            ease: "back.out(1.7)",
          },
          "<0.75"
        );
    });

    return () => {
      tl.kill();
    };
  });

  return (
    <section
      id="works"
      className="text-amber-50 px-12 pt-20 border-b border-gray-border border-t-0 flex-1"
    >
      <h2
        ref={headingRef}
        className="text-8xl font-bold font-brand text-center"
      >
        Notable Works
      </h2>
      <section className="py-20 overflow-x-hidden">
        {workCards.map((work, index) => (
          <div className="work-card" key={index}>
            <WorkCard
              key={work.title}
              src={work.src}
              link={work.link}
              title={work.title}
              description={work.description}
              tags={work.tags}
              index={index}
            />
          </div>
        ))}
      </section>
    </section>
  );
}
