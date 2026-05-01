"use client";

import { useEffect } from "react";

const storageKey = "integra-psi:explored-proposals";

type MarkProposalExploredProps = {
  slug: string;
};

export function MarkProposalExplored({ slug }: MarkProposalExploredProps) {
  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);
    const current = raw ? (JSON.parse(raw) as string[]) : [];

    if (!current.includes(slug)) {
      window.localStorage.setItem(storageKey, JSON.stringify([...current, slug]));
    }
  }, [slug]);

  return null;
}
