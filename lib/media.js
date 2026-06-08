export function isMobileViewport(maxWidth = 430) {
  return typeof window !== "undefined" && window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
}
