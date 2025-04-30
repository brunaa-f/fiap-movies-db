import { expect, test } from "@playwright/test";

test.describe("Buscar por um filme", () => {
    test("deve buscar um filme por título", async ({ page }) => {
        await page.goto("/");

        const movieName = "Inception"

        await page.getByPlaceholder("Search for movies by title or genre...").fill(movieName)

        await page.getByRole("button", { name: "Search now" }).click()
        await page.waitForTimeout(1000)

        await expect(page.getByText(`Search Results for "${movieName}"`)).toBeVisible();
        
        await expect(page.getByText(movieName, {exact: true})).toBeVisible();
        
        await page.getByPlaceholder("Search for movies by title or genre...").fill("")

        await page.getByRole("button", { name: "Search now" }).click()

        await expect(page.getByText(`Popular Movies`)).toBeVisible();
    })
})