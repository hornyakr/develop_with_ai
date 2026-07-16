import Counter from "@/components/counter"

const principles = [
  "Server Component alapértelmezés; klienshatár csak interakcióhoz.",
  "Authorization az adathoz és művelethez közel, nem csak navigációban.",
  "Egy worktree, egy writer; minden változás reprodukálható handoffal.",
]

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Kurzus starter dashboard</h1>
      <p className="mt-3 text-[var(--muted)]">A statikus lista Server Component. Csak a számláló kerül kliensbundle-ba.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_18rem]">
        <section aria-labelledby="principles" className="rounded-xl border border-[var(--border)] bg-white p-6">
          <h2 id="principles" className="text-xl font-semibold">Projektinvariánsok</h2>
          <ul className="mt-4 space-y-3">
            {principles.map((principle) => <li className="rounded-md bg-stone-50 p-3" key={principle}>{principle}</li>)}
          </ul>
        </section>
        <Counter />
      </div>
    </main>
  )
}
