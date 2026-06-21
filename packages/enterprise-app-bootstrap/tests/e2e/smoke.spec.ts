import { expect, test } from "@playwright/test";

test("affiche le tableau de bord et navigue vers les données", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: "Vue d’ensemble" })).toBeVisible();
  await page.getByRole("link", { name: "Données" }).click();
  await expect(page.getByRole("heading", { name: "Données métier" })).toBeVisible();
});
