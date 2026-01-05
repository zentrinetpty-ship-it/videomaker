import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Story Studio - Story to Video Pipeline",
  description: "Transform story ideas into beautiful videos using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
