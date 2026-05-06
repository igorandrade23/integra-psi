"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HOME_VIDEO_TAP_EVENT, triggerHomeVideoTap } from "@/shared/lib/home-video-tap";

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number | null>(null);
  const durationRef = useRef(0);
  const seekRafRef = useRef<number | null>(null);
  const videoCardControls = useAnimationControls();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) {
      return;
    }

    const sync = () => {
      const viewportHeight = window.innerHeight;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollRange = Math.max((section.offsetHeight - viewportHeight) * 1.7, 1);
      const rawProgress = (window.scrollY - sectionTop) / scrollRange;
      const nextProgress = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(nextProgress);

      const duration = durationRef.current || video.duration;
      if (!Number.isFinite(duration) || duration <= 0) {
        return;
      }

      targetTimeRef.current = nextProgress * duration;

      if (seekRafRef.current !== null) {
        return;
      }

      seekRafRef.current = window.requestAnimationFrame(() => {
        seekRafRef.current = null;

        const currentVideo = videoRef.current;
        const nextTime = targetTimeRef.current;

        if (!currentVideo || nextTime === null) {
          return;
        }

        const clampedTime = Math.max(
          0,
          Math.min(nextTime, currentVideo.duration || durationRef.current),
        );

        if (typeof currentVideo.fastSeek === "function") {
          currentVideo.fastSeek(clampedTime);
          return;
        }

        currentVideo.currentTime = clampedTime;
      });
    };

    const handleLoadedMetadata = () => {
      durationRef.current = video.duration;
      video.pause();
      video.currentTime = 0;
      sync();
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);

    sync();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);

      if (seekRafRef.current !== null) {
        window.cancelAnimationFrame(seekRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onVideoTap = () => {
      if (reduceMotion) {
        return;
      }

      void videoCardControls.start({
        scale: [1, 0.985, 1],
        y: [0, -1, 0],
        transition: {
          duration: 0.32,
          ease: "easeOut",
        },
      });
    };

    window.addEventListener(HOME_VIDEO_TAP_EVENT, onVideoTap);

    return () => {
      window.removeEventListener(HOME_VIDEO_TAP_EVENT, onVideoTap);
    };
  }, [reduceMotion, videoCardControls]);

  return (
    <section ref={sectionRef} className="relative -mt-4 min-h-[220dvh] md:-mt-5 md:min-h-[260dvh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#f6f2e7]">
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(246,242,231,0.98),rgba(246,242,231,0))] pointer-events-none" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 py-0 md:px-8 md:py-0">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
            <div className="w-full max-w-6xl">
              <motion.div
                className="relative overflow-hidden rounded-[2.25rem] border border-[#e5dfcf] bg-[#f6f2e7] shadow-[0_24px_70px_rgba(31,37,34,0.08)]"
                animate={videoCardControls}
              >
                <video
                  ref={videoRef}
                  className="block aspect-[4/5] w-full object-contain object-center md:aspect-[16/9] lg:aspect-[16/8]"
                  src="/video.scrub.mp4"
                  muted
                  controls={false}
                  disablePictureInPicture
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(246,242,231,0.02),transparent_52%,rgba(246,242,231,0.05)_86%,rgba(246,242,231,0.15))]" />
                <div className="pointer-events-none absolute inset-x-4 bottom-4 h-1.5 overflow-hidden rounded-full bg-[#dcd5c3]/70 md:inset-x-5 md:bottom-5">
                <div
                  className="h-full rounded-full bg-brand-green-dark/60"
                  style={{ width: `${Math.max(progress * 100, 3)}%` }}
                />
              </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-3 flex w-full max-w-3xl flex-col gap-2 sm:flex-row sm:justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <Link
                href="#propostas"
                onClick={triggerHomeVideoTap}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-green-dark px-4 text-sm font-bold text-white shadow-sm shadow-brand-green/20 transition hover:bg-brand-green md:h-12 md:px-5"
              >
                Veja as nossas propostas
                <ArrowRight size={17} />
              </Link>
              <Link
                href="#chapa"
                onClick={triggerHomeVideoTap}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border-soft bg-white/70 px-4 text-sm font-bold text-brand-green-dark transition hover:bg-white md:h-12 md:px-5"
              >
                Conhecer a nossa chapa
              </Link>
            </motion.div>

            <div className="mt-3 h-6 w-full max-w-6xl border-t border-[#e5dfcf] bg-gradient-to-b from-transparent to-[#f6f2e7]" />

            {!reduceMotion ? (
              <motion.a
                href="#propostas"
                aria-label="Continuar rolando para ver o restante da página"
                onClick={triggerHomeVideoTap}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-2 text-[0.7rem] font-semibold tracking-[0.16em] text-brand-green-dark shadow-[0_10px_24px_rgba(31,37,34,0.08)] backdrop-blur-lg"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ opacity: Math.max(0, 1 - progress * 1.1) }}
              >
                <ChevronDown size={15} />
                <span>Continue para baixo</span>
              </motion.a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
