import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mehta Insights | 16-Week Live-Mentored Trading Program",
  description:
    "Build a structured understanding of financial markets through the Mehta Insights 16-Week Live-Mentored Trading Program.",
  applicationName: "Mehta Insights",
  openGraph: {
    title: "Mehta Insights | 16-Week Live-Mentored Trading Program",
    description:
      "Build a structured understanding of financial markets through the Mehta Insights 16-Week Live-Mentored Trading Program.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
