import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ReactHotToaster } from "react-hot-toast";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import NextAuthProvider from "@/providers/NextAuthProvider";
import NextTopLoader from "nextjs-toploader";
import ModelProvider from "@/providers/model-provider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/poppins/Poppins-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/poppins/Poppins-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/poppins/Poppins-Black.ttf",
      weight: "800",
    },
    {
      path: "../public/fonts/poppins/Poppins-ExtraBold.ttf",
      weight: "900",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WikiCulture - The Free Culture Encyclopedia",
    template: `%s | WikiCulture`,
  },
  description:
    "WikiCulture is a free culture encyclopedia that anyone can edit. It is a collaborative creation by people all over the world. It is a free content project with the goal of creating a free culture encyclopedia to the highest possible quality. We welcome everyone to contribute to it and help it grow.",
  creator: "Tomdieu Ivan",
  metadataBase: new URL("https://wikiculture.vercel.app"),
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Culture",
  twitter: {
    card: "summary_large_image",
    title: "WikiCulture - The Free Culture Encyclopedia",
    description:
      "WikiCulture is a free culture encyclopedia that anyone can edit. It is a collaborative creation by people all over the world. It is a free content project with the goal of creating a free culture encyclopedia to the highest possible quality. We welcome everyone to contribute to it and help it grow.",

    creator: "@tomdieu ivan",
    images: ["https://wikiculture.vercel.app/wikiculture-favicon-color.png"],
  },
  openGraph: {
    title: "WikiCulture - The Free Culture Encyclopedia",
    siteName: "WikiCulture",
    description:
      "WikiCulture is a free culture encyclopedia that anyone can edit. It is a collaborative creation by people all over the world. It is a free content project with the goal of creating a free culture encyclopedia to the highest possible quality. We welcome everyone to contribute to it and help it grow.",

    images: ["https://wikiculture.vercel.app/wikiculture-favicon-color.png"],
    creators: ["@tomdieu ivan"],
    url: "https://wikiculture.vercel.app",
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "wikiculture-favicon-color.png",
        href: "wikiculture-favicon-color.png",
      },
      {
        media: "(prefers-color-scheme:dark)",
        url: "/wikiculture-favicon-color.png",
        href: "/wikiculture-favicon-color.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      suppressContentEditableWarning
    >
      <NextAuthProvider>
        <body
          suppressHydrationWarning={true}
          className={`${poppins.variable} w-full h-screen p-0 font-poppins`}
          suppressContentEditableWarning
        >
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange={false}
            >
              <NextTopLoader showSpinner={false} />
              <Analytics />
              <Toaster />
              <ReactHotToaster position="top-center" />
              <ModelProvider />
              {children}
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </NextAuthProvider>
    </html>
  );
}
