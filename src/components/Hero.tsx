export function Hero() {
  return (
    <section className="flex h-auto">
      <section className="hidden md:block w-1/12"></section>
      <section className="flex flex-col items-center justify-center text-amber-50 text-center px-6 py-20 gap-6 flex-1 border border-gray-border border-t-0">
        <p>
          <p>
            <span className="text-lg font-spline-mono pr-7">
              Hi, I'm Krish.
            </span>
            <span className="hero-text">Software -</span>
          </p>
          <p>
            <span className="hero-text">Developer</span>
          </p>
          <p>
            <span className="hero-text">& Explorer</span>
            <p className="max-w-md md:ml-auto text-sm md:text-base font-spline-mono leading-relaxed md:text-right">
              An enthusiastic programmer and explorer, who loves to learn and
              create.
            </p>
            {/* <span className="mt-6 text-base font-spline-mono max-w-xl mx-auto">
              An enthusiastic programmer and explorer, who loves to learn and
              create.
            </span> */}
          </p>
        </p>
      </section>
      <section className="hidden md:block w-1/12"></section>
    </section>
  );
}
