import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "A Valentine's Day Scavenger Hunt",
  icons: {
    icon: [
      {url: "/favicon.ico"},
      {url: "/favicon-32x32.png", sizes: "32x32", type: "image/png"},
      {url: "/favicon-16x16.png", sizes: "16x16", type: "image/png"},
      {url: "/favicon-180x180.png", sizes: "180x180", type: "image/png"},
      {url: "/favicon-192x192.png", sizes: "192x192", type: "image/png"},
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",


  },
  description: "A special journey through our memories",
    generator: 'valentines day scavenger hunt'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/images/valentines/rat-chef.jpg" type="image/jpeg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'