import { NavBar } from "@/sections/NavBar";
import { Hero } from "@/sections/Hero";
import { Works } from "@/sections/Works";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

function App() {
  return (
    <section className="min-h-screen w-full bg-background">
      <NavBar />
      <section className="flex h-auto">
        <section className="hidden lg:block w-1/12"></section>
        <section className="text-amber-50 border-x border-gray-border border-t-0 flex-1 overflow-x-hidden">
          <Hero />
          <Works />
          <About />
          <Contact />
        </section>
        <section className="hidden lg:block w-1/12"></section>
      </section>
      <Footer />
    </section>
  );
}

export default App;
