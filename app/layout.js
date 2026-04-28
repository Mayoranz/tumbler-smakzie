import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tumbler Smakzie — Stylish, Practical, Made for Your Daily Life",
  description:
    "Tumbler Smakzie — tumbler hitam elegan bertuliskan SMAKZIE. Anti bocor, desain modern, mudah dibawa, ramah lingkungan. Pesan sekarang hanya Rp 45.000.",
  keywords: [
    "tumbler",
    "smakzie",
    "tumbler hitam",
    "tumbler murah",
    "tumbler elegan",
    "tumbler custom",
  ],
  openGraph: {
    title: "Tumbler Smakzie — Stylish, Practical, Made for Your Daily Life",
    description:
      "Tumbler hitam elegan bertuliskan SMAKZIE. Anti bocor, modern, mudah dibawa.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#080c10]">
        {children}
      </body>
    </html>
  );
}
