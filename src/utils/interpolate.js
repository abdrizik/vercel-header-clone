export function interpolateByScroll(scroll, maxScroll, from, to) {
  if (scroll <= 0) return from;
  if (scroll >= maxScroll) return to;
  
  const progress = scroll / maxScroll;
  return from + progress * (to - from);
}
