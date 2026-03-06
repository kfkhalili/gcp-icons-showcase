import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GCP Icons",
  description: "Category-based showcase for the gcp-icons npm package.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

