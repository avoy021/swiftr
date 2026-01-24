"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Lato, Roboto_Condensed, Barlow, Lobster_Two } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { useEffect } from "react";
import { initializeState } from "@/lib/features/user/userSlice";
import Spinner from "@/Components/Spinner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['100','300','400','700','900']
});

const robotoCondensed = Roboto_Condensed({
  variable: '--font-roboto-condensed',
  subsets: ['latin'],
})

const lobster2 = Lobster_Two({
  variable: "--font-lobster-two",
  subsets: ['latin'],
  weight: ['400','700']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${lato.variable} ${robotoCondensed.variable} ${lobster2.variable}`}
      >
        <Providers>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

const AuthProvider = ({children}:Readonly<{children: React.ReactNode}>) => {
  const {isInitialized} = useSelector((state:RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if(!isInitialized) {
      dispatch(initializeState());
    }
  },[])

  if(!isInitialized) {
    return <Spinner/>
  }
  return (
    <>{children}</>
  )
}
