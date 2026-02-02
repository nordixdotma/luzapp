import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { PersistentLayout } from "@/components/layouts/persistent-layout"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Luz",
  description: "By nordix",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <PersistentLayout>{children}</PersistentLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
