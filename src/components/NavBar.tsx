export function NavBar() {
  return (
    <header className="flex text-slate-50 border-b border-b-gray-border px-6 py-6 items-center">
      <div className="text-2xl font-brand">krish</div>

      <nav className="flex-1 flex justify-center gap-4 font-spline-mono uppercase">
        <a href="#">Home</a>
        <a href="#">Works</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>

      <div>12:55 PM</div>
    </header>
  );
}
