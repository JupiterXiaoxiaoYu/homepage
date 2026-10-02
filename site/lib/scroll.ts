import type Lenis from "lenis";

let lenis: Lenis | null = null;
export function setLenis(l: Lenis | null) {
  lenis = l;
}
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.4, offset: -20 });
  else el.scrollIntoView({ behavior: "smooth" });
}
