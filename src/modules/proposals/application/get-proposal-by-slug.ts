import { proposals } from "@/modules/proposals/infra/proposals";

export function getProposalBySlug(slug: string) {
  return proposals.find((proposal) => proposal.slug === slug);
}
