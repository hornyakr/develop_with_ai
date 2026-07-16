import { describe, expect, it } from "vitest"
import { can } from "@/lib/permissions"

describe("project permission policy", () => {
  it("defaults a viewer to read-only", () => {
    expect(can("viewer", "project:read")).toBe(true)
    expect(can("viewer", "project:update")).toBe(false)
    expect(can("viewer", "project:archive")).toBe(false)
  })

  it("allows a member to update but not archive", () => {
    expect(can("member", "project:update")).toBe(true)
    expect(can("member", "project:archive")).toBe(false)
  })
})
