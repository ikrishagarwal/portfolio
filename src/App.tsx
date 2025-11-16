import { NavBar } from "@/sections/NavBar";
import { Hero } from "@/sections/Hero";
import { Works } from "@/sections/Works";

function App() {
  return (
    <section className="min-h-screen w-full bg-background">
      <NavBar />
      <Hero />
      <Works />
    </section>
  );
}

export default App;
