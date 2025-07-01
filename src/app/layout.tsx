import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutWrapper from "../app/(landing)/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECZA-JET",
  description: "Sağlığa en yakın adım",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body
        className={`${inter.className} min-h-screen flex flex-col   bg-[#F6F6F6]`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
