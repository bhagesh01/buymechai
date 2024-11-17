import Header from "@/components/shared/Header";
import {authOptions} from "@/lib/authOptions";
import type { Metadata } from "next";
import {getServerSession} from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuyMeChai",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header session={session} />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}