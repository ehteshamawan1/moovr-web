import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Moovr Admin Panel',
  description: 'Created by Uzair S.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
