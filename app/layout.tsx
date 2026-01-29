import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/index.css";
import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stealth Payroll",
  description: "Secure, private payroll management using Solana blockchain and end-to-end encryption",
  icons: {
    icon: "/favicon_v2.svg",
    shortcut: "/favicon_v2.svg",
    apple: "/favicon_v2.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#22c55e" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
