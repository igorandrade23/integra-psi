import { Camera, Home, Lightbulb, UsersRound } from "lucide-react";

export const appRoutes = [
  {
    href: "/",
    label: "Início",
    icon: Home,
  },
  {
    href: "/#match",
    label: "Propostas",
    icon: Lightbulb,
  },
  {
    href: "/#chapa",
    label: "Chapa",
    icon: UsersRound,
  },
  {
    href: "https://www.instagram.com/capsicobiguacu",
    label: "Instagram",
    icon: Camera,
  },
] as const;
