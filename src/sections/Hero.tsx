export function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center text-amber-50 text-center px-6 py-20 gap-6 border-b border-b-gray-border"
    >
      <div>
        <p>
          <span className="text-lg font-spline-mono pr-7">Hi, I'm Krish.</span>
          <span className="hero-text">Software -</span>
        </p>
        <p>
          <span className="hero-text">Developer</span>
        </p>
        <p>
          <span className="hero-text">& Explorer</span>
          <span className="block max-w-md md:ml-auto text-sm md:text-base font-spline-mono leading-relaxed md:text-right">
            An enthusiastic programmer and explorer, who loves to learn and
            create.
          </span>
        </p>
      </div>
    </section>
  );
}
