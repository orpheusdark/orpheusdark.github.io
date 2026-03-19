import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nirant Chavda – Systems Thinker & Security Engineer",
  description:
    "Building secure systems and exploring real-world challenges. Computer Engineering student focused on cybersecurity, fraud detection, and real-world problem solving.",
  keywords: [
    "Nirant Chavda",
    "cybersecurity",
    "fraud detection",
    "computer engineering",
    "portfolio",
  ],
  authors: [{ name: "Nirant Chavda" }],
  openGraph: {
    title: "Nirant Chavda – Systems Thinker & Security Engineer",
    description: "Building secure systems and exploring real-world challenges.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
