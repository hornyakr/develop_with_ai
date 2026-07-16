import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "Atlas Workspace",
  description: "Next.js AI Engineering Pro starter",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body>
        <header className="border-b border-[var(--border)] bg-[var(--surface)]">
          <nav aria-label="Fő navigáció" className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link className="font-semibold" href="/">Atlas Workspace</Link>
            <Link className="rounded-md px-3 py-2 hover:bg-stone-100" href="/dashboard">Dashboard</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
