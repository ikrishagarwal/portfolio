export function Footer() {
  return (
    <footer className="mx-0 lg:mx-20 px-15 pt-10 border border-gray-border rounded-0 lg:rounded-t-3xl">
      <div className="font-brand text-amber-50 text-lg border-b border-dashed border-gray-500">
        <span>krish agarwal</span>
        <span className="float-right hidden md:block">
          let's build something together
        </span>
      </div>
      {/* Make 3 sections, links, socials, connect */}
      <div className="flex flex-col md:flex-row justify-between py-8 gap-6">
        <div>
          <h3 className="text-gray-400 mb-4 uppercase font-brand border-b-2 border-gray-500">
            Links
          </h3>
          <div className="font-spline-mono text-amber-50">
            <a href="#hero" className="block mb-2 hover:underline">
              Home
            </a>
            <a href="#works" className="block mb-2 hover:underline">
              Works
            </a>
            <a href="#about" className="block mb-2 hover:underline">
              About
            </a>
            <a href="#contact" className="block mb-2 hover:underline">
              Contact
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-gray-400 mb-4 uppercase font-brand border-b-2 border-gray-500">
            Socials
          </h3>
          <div className="font-spline-mono text-amber-50">
            <a
              href="https://github.com/ikrishagarwal"
              className="block mb-2 hover:underline"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/ikrishagarwal"
              className="block mb-2 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/coffee.to.code.machine"
              className="block mb-2 hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-gray-400 mb-4 uppercase font-brand border-b-2 border-gray-500">
            Connect
          </h3>
          <div className="font-spline-mono text-amber-50">
            <a
              href="mailto:foronlykrish@gmail.com"
              className="block mb-2 hover:underline"
            >
              Mail
            </a>
          </div>
        </div>
      </div>
      <div className="text-gray-400 px-8 py-6 text-center font-spline-mono">
        © {new Date().getFullYear()} Krish Agarwal. All rights reserved.
      </div>
    </footer>
  );
}
