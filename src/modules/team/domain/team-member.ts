export type TeamMember = {
  id: string;
  name: string;
  role: string;
  group: "coordenação" | "gestão" | "comunicação" | "eventos";
  bio: string;
};
