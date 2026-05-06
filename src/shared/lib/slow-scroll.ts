import type { MouseEvent } from "react";

const DEFAULT_DURATION = 900;
const DEFAULT_OFFSET = 84;

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export function slowScrollToHash(hash: string, options?: { offset?: number; duration?: number }) {
  if (typeof window === "undefined") {
    return;
  }

  const sectionId = hash.replace("#", "");
  const target = document.getElementById(sectionId);

  if (!target) {
    return;
  }

  const offset = options?.offset ?? DEFAULT_OFFSET;
  const duration = options?.duration ?? DEFAULT_DURATION;
  const startY = window.scrollY;
  const targetY = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - offset,
  );
  const distance = targetY - startY;

  if (Math.abs(distance) < 1) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    return;
  }

  const startTime = performance.now();

  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo({ top: startY + distance * eased, behavior: "auto" });

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

export function handleSlowScrollClick(
  event: MouseEvent<HTMLElement>,
  hash: string,
  options?: { offset?: number; duration?: number },
) {
  event.preventDefault();
  slowScrollToHash(hash, options);
}
