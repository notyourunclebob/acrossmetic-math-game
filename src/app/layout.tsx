import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acrossmetic",
  description: "A cross arithmetic puzzle game",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
