import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Integra Psi | CA Silvia Lane",
    template: "%s | Integra Psi",
  },
  description:
    "Website mobile first da chapa Integra Psi para o Centro Acadêmico Silvia Lane da Univali.",
  openGraph: {
    title: "Integra Psi | CA Silvia Lane",
    description: "Conheça a chapa, integrantes e propostas da Integra Psi.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className="h-full scroll-smooth antialiased"
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
