"use client"

import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <section aria-labelledby="counter-title" className="rounded-xl border border-[var(--border)] bg-white p-6">
      <h2 id="counter-title" className="text-xl font-semibold">Klienssziget</h2>
      <p aria-live="polite" className="my-6 text-4xl font-semibold">{count}</p>
      <button className="rounded-md bg-[var(--accent)] px-4 py-2 font-medium text-white" onClick={() => setCount((value) => value + 1)} type="button">
        Növelés
      </button>
    </section>
  )
}
