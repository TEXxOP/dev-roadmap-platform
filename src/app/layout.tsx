import { Metadata } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { CheckedDataProvider } from "@/context/checkedDataContext";
import { DataCacheProvider } from "@/context/DataCacheContext";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

// Metadata for Dev Roadmap Platform
export const metadata: Metadata = {
  metadataBase: new URL(process.env.DOMAIN || process.env.NEXTAUTH_URL || 'https://harish-dev-roadmap.vercel.app'),
  title: {
    default: "Dev Roadmap Platform - Learn, Practice, Grow",
    template: "%s | Dev Roadmap Platform"
  },
  description:
    "Master programming with interactive roadmaps, AI-powered interviews, and comprehensive learning resources. Built by Harish Saini for developers worldwide.",
  keywords: [
    "programming roadmaps",
    "coding interview practice",
    "web development learning",
    "AI interview simulation",
    "developer career growth",
    "machine learning roadmap",
    "data science learning",
    "software engineering",
    "tech skills development",
    "programming certification"
  ],

  authors: [
    {
      name: "Harish Saini",
      url: "https://harish-saini.vercel.app",
    },
  ],

  creator: "Harish Saini",
  publisher: "Dev Roadmap Platform",
  robots: "index, follow",
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.vercel.app",
    siteName: "Dev Roadmap Platform",
    title: "Dev Roadmap Platform - Learn, Practice, Grow",
    description:
      "Master programming with interactive roadmaps, AI-powered interviews, and comprehensive learning resources. Built by Harish Saini.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dev Roadmap Platform - Interactive Learning Experience",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dev Roadmap Platform - Learn, Practice, Grow",
    description:
      "Master programming with interactive roadmaps, AI-powered interviews, and comprehensive learning resources.",
    images: ["/og-image.png"],
    creator: "@harish_saini_dev",
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",
  
  verification: {
    google: "your-google-verification-code",
  },

  alternates: {
    canonical: "https://your-domain.vercel.app",
  },
};

// Defining the viewport separately to comply with Next.js rules
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

const NotificationIcon = dynamic(() => import("@/components/ui/NotificationIcon"), { ssr: false });
const AIAssistant = dynamic(() => import("@/components/ui/AIAssistant"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Material Symbols for icons */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
      </head>
      <body className={`antialiased notallow`}>
        <DataCacheProvider>
          <CheckedDataProvider>
              <Toaster position="top-right" reverseOrder={false} />
              <NotificationIcon />
              <AIAssistant context="general" />
              {children}
          </CheckedDataProvider>
        </DataCacheProvider>
        <Analytics />
      </body>
    </html>
  );
}
