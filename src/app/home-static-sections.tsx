"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Heart, UsersRound } from "lucide-react";
import type { Proposal } from "@/modules/proposals/domain/proposal";
import type { TeamMember } from "@/modules/team/domain/team-member";
import { TeamShowcase } from "@/modules/team/presentation/team-showcase";
import { triggerHomeVideoTap } from "@/shared/lib/home-video-tap";

type HomeStaticSectionsProps = {
  proposals: Proposal[];
  members: TeamMember[];
};

const sectionViewport = {
  once: true,
  amount: 0.28,
} as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
    },
  },
};

export function HomeStaticSections({ proposals, members }: HomeStaticSectionsProps) {
  const reduceMotion = useReducedMotion();

  const sectionMotionProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: sectionViewport,
        variants: containerVariants,
      };

  const itemMotionProps = reduceMotion
    ? {}
    : {
        variants: itemVariants,
      };

  return (
    <>
      <motion.section
        id="propostas"
        className="scroll-mt-24 px-4 py-7 md:px-8 md:py-10"
        {...sectionMotionProps}
      >
        <motion.div
          className="mb-5 flex items-end justify-between gap-4"
          {...itemMotionProps}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-green">
              Nossas propostas
            </p>
          </div>
        </motion.div>

        <motion.div className="grid gap-3 md:grid-cols-2" {...sectionMotionProps}>
          {proposals.map((proposal, index) => (
            <motion.article
              key={proposal.slug}
              className="group rounded-lg border border-border-soft bg-surface-strong p-4 shadow-sm transition duration-300 md:p-5"
              style={{ transformOrigin: "center top" }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -4,
                      scale: 1.01,
                    }
              }
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              {...itemMotionProps}
            >
              <motion.div
                aria-hidden="true"
                className="mb-4 h-1.5 w-12 rounded-full bg-brand-green/35"
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={reduceMotion ? undefined : { scaleX: 1 }}
                transition={{ delay: 0.05 * index, duration: 0.45, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
              <h3 className="mt-1 text-lg font-black font-display tracking-tight text-foreground md:text-xl">
                {proposal.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-muted">
                {proposal.summary}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="px-4 py-7 md:px-8 md:py-10"
        {...sectionMotionProps}
      >
        <motion.div
          className="rounded-lg border border-brand-green/20 bg-gradient-to-br from-brand-green-dark to-brand-green p-5 text-white md:p-7"
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -3,
                }
          }
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          {...itemMotionProps}
        >
          <h2 className="text-2xl font-black font-display tracking-tight">
            Conte para gente quais propostas você mais gostou
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/80">
            Queremos ouvir você! <br /><br />
            Clique no botão abaixo para abrir o match de propostas e nos contar quais
            são as propostas que mais chamaram a sua atenção. <br /><br />Sua opinião é muito importante para nós!
          </p>
          <Link
            href="/match"
            onClick={triggerHomeVideoTap}
            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-white px-4 text-sm font-bold text-brand-green-dark transition hover:-translate-y-0.5 hover:bg-white/95"
          >
            Abrir match de propostas
            <Heart size={18} />
          </Link>
        </motion.div>
      </motion.section>

      <motion.section
        id="chapa"
        className="scroll-mt-24 px-4 pb-10 md:px-8"
        {...sectionMotionProps}
      >
        <div className="space-y-5">
          <motion.div
            className="rounded-[2rem] border border-border-soft bg-surface-strong p-5 shadow-sm md:p-8"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -3,
                  }
            }
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            {...itemMotionProps}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-green">
              Chapa
            </p>
            <h2 className="mt-3 flex items-center gap-3 text-2xl font-black font-display tracking-tight md:text-3xl">
              <UsersRound className="text-brand-green" size={28} />
              Integra Psi
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-muted md:text-base">
              Conheça as pessoas que compõem a chapa para o CA Silvia Lane.
            </p>
          </motion.div>

          <motion.div {...itemMotionProps}>
            <TeamShowcase members={members} />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
