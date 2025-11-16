import { WorkCard } from "@/components/WorkCard";

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

  return (
    <section className="flex h-auto">
      <section className="hidden md:block w-1/12"></section>
      <section className="text-amber-50 px-12 py-20 border border-gray-border border-t-0 flex-1">
        <h2 className="text-8xl font-bold font-brand text-center">
          Notable Works
        </h2>
        <section className="py-20">
          {workCards.map((work, index) => (
            <WorkCard
              key={work.title}
              src={work.src}
              link={work.link}
              title={work.title}
              description={work.description}
              tags={work.tags}
              index={index}
            />
          ))}
        </section>
      </section>
      <section className="hidden md:block w-1/12"></section>
    </section>
  );
}
