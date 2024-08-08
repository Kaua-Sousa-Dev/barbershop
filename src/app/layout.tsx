import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "barbershop",
  description: "As melhores barbearias de 4town",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" className="dark">
      <link rel="shortcut icon" href="IconCabelo.svg" type="image/x-icon" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
