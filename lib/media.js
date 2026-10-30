export function isMobileViewport(maxWidth = 430) {
  return window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
}
