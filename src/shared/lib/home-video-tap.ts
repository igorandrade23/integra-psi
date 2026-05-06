export const HOME_VIDEO_TAP_EVENT = "home-video-tap";

export function triggerHomeVideoTap() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(HOME_VIDEO_TAP_EVENT));
}
