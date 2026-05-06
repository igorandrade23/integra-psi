import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Integra Psi | CA Silvia Lane",
    template: "%s | Integra Psi",
  },
  description:
    "Website mobile first da chapa Integra Psi para o Centro Acadêmico Silvia Lane da Univali.",
  icons: {
    icon: "/icon.png",
    apple: "/logo.jpeg",
  },
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
      className={`${bodyFont.variable} ${displayFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
