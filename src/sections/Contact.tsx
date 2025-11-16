export function Contact() {
  return (
    <section className="min-h-screen w-full bg-background text-amber-50 px-8 py-20 flex">
      <h1 className="text-8xl font-bold mb-4 font-brand text-center flex-4">
        How about we work on something together?
      </h1>
      <div className="max-w-4xl mx-auto mt-20 text-justify text-xl leading-relaxed font-spline-mono font-regular flex-2">
        <div className="flex flex-col items-center">
          <p className="mb-6 px-4">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions. Feel free to reach out to
            me via email.
          </p>
          <a href="mailto:foronlykrish@gmail.com">
            <button className="cursor-pointer w-full mt-3 px-6 py-3 bg-amber-50 text-background font-spline-mono font-bold rounded-full hover:bg-amber-100 transition-colors">
              Get in Touch
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
