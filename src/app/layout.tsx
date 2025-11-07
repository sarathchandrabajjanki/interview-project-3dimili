import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3DIMLI - Your One-Stop Digital Platform for 3D Models",
  description: "Join our community of creators and collectors today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

