import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Reset standard window scroll
    window.scrollTo(0, 0);

    // 2. Clear any scrollable containers in the Layouts
    // Since our layout uses <main class="overflow-y-auto">, 
    // window.scrollTo(0,0) has no effect as 'window' isn't what's scrolling.
    const scrollableElements = document.querySelectorAll('main');
    scrollableElements.forEach((el) => {
      el.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Instant reset to avoid weird jumping during transition
      });
    });
  }, [pathname]);

  return null;
}
