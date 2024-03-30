import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NPProgresProvider from "@/components/provider/np-progress-provider";
import ThemeProvider from "@/components/provider/theme-provider";
import ReactQueryProvider from "@/components/provider/react-query-provider";
import NextAuthProvider from "@/components/provider/next-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <NPProgresProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ReactQueryProvider>
              <NextAuthProvider>{children}</NextAuthProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </NPProgresProvider>
      </body>
    </html>
  );
}