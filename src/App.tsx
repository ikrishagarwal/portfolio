import { NavBar } from "@/sections/NavBar";
import { Hero } from "@/sections/Hero";
import { Works } from "@/sections/Works";
import { About } from "@/sections/About";

function App() {
  return (
    <section className="min-h-screen w-full bg-background">
      <NavBar />
      <section className="flex h-auto">
        <section className="hidden md:block w-1/12"></section>
        <section className="text-amber-50 border-x border-gray-border border-t-0 flex-1">
          <Hero />
          <Works />
          <About />
        </section>
        <section className="hidden md:block w-1/12"></section>
      </section>
    </section>
  );
}

export default App;
