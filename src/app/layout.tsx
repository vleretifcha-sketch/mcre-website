import type { Metadata } from "next";
import { heroImages } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Melbourne CBD Real Estate | Commercial Property Specialists",
  description:
    "Trusted specialists in commercial sales, leasing and property management across Melbourne's CBD and surrounding areas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="preload"
          as="image"
          href={heroImages[0].src}
          fetchPriority="high"
        />
        <link rel="preload" as="image" href="/hero/office-interior.jpg" />
      </head>
      <body className="flex min-h-full flex-col bg-parchment text-graphite">
        {children}
      </body>
    </html>
  );
}
