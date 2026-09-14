import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Melbourne CBD Real Estate | Commercial Property Specialists",
  description:
    "Trusted specialists in commercial sales, leasing and property management across Melbourne's CBD and surrounding areas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-parchment text-graphite">
        {children}
      </body>
    </html>
  );
}
