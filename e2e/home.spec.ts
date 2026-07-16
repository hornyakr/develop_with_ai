import { expect, test } from "@playwright/test"

test("public home and dashboard are reachable", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Server-first")
  await page.getByRole("link", { name: "Dashboard megnyitása" }).click()
  await expect(page.getByRole("heading", { name: "Kurzus starter dashboard" })).toBeVisible()
})

test("the client island is keyboard-operable", async ({ page }) => {
  await page.goto("/dashboard")
  const button = page.getByRole("button", { name: "Növelés" })
  await button.focus()
  await page.keyboard.press("Enter")
  await expect(page.getByText("1", { exact: true })).toBeVisible()
})
