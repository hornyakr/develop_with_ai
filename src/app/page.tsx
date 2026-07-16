import Link from "next/link"

export default function HomePage() {
  return (
    <main className="mx-auto grid min-h-[75vh] max-w-5xl place-items-center px-6 py-16">
      <section className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">Next.js AI Engineering Pro</p>
        <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">Server-first munkatér, mérhető AI-funkciókkal.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          Ez a minimális starter a 84 napos kurzushoz. A termékfunkciókat vertikális szeletekben építsd, explicit adat-, authorization-, cache- és agent-határokkal.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="rounded-md bg-[var(--accent)] px-5 py-3 font-medium text-white" href="/dashboard">Dashboard megnyitása</Link>
          <a className="rounded-md border border-[var(--border)] bg-white px-5 py-3 font-medium" href="/api/health">Health endpoint</a>
        </div>
      </section>
    </main>
  )
}
