import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.defaultTitle, template: "%s | DREADMOOR Wiki" },
  description: site.defaultDescription,
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#081419",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <GoogleAnalytics />
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
