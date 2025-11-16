import { Time } from "@/components/Time";

export function NavBar() {
  return (
    <header className="flex text-slate-50 border-b border-b-gray-border px-6 py-6 items-center sticky">
      <div className="text-2xl font-brand">krish</div>

      <nav className="flex-1 flex justify-center gap-4 font-spline-mono uppercase">
        <a href="#hero">Home</a>
        <a href="#works">Works</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="font-spline-mono text-gray-400">{Time()}</div>
    </header>
  );
}
