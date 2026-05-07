"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { UsersRound } from "lucide-react";
import type { Proposal } from "@/modules/proposals/domain/proposal";
import type { TeamMember } from "@/modules/team/domain/team-member";
import { ProposalMatchGame } from "@/modules/proposals/match/proposal-match-game";
import { TeamShowcase } from "@/modules/team/presentation/team-showcase";

type HomeStaticSectionsProps = {
  proposals: Proposal[];
  members: TeamMember[];
};

const SHOW_TEAM_SECTION = true;

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
        id="match"
        className="scroll-mt-24 px-4 py-7 md:px-8 md:py-10"
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
              Propostas
            </p>
            <h2 className="mt-3 flex items-center gap-3 text-2xl font-black font-display tracking-tight md:text-3xl">
              <UsersRound className="text-brand-green" size={28} />
              Conheça nossas propostas
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-muted md:text-base">
              Passe pelas propostas e veja, na prática, quais ideias mais combinam com você.
            </p>
          </motion.div>

          <motion.div {...itemMotionProps}>
            <ProposalMatchGame proposals={proposals} embedded />
          </motion.div>
        </div>
      </motion.section>

      {SHOW_TEAM_SECTION ? (
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
                Conheça nossa Chapa
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
      ) : null}
    </>
  );
}
