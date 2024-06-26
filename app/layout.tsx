import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import {Toaster} from "sonner"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion",
  description: "Where creativity becomes easy",
  icons:{
    icon:[
      {
        media:"(prefers-color-scheme:light)",
        url:"/logo.svg",
        href:"/logo.svg"
      },
      {
        media:"(prefers-color-scheme:dark)",
        url:"/logo-dark.png",
        href:"/logo-dark.png"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange storageKey="notion-theme-2">
        <Toaster position="bottom-center"/>
        {children}
        </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
