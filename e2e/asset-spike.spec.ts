import { expect, test } from "@playwright/test";

test.describe("asset spike preview", () => {
  test("renders the isolated start-screen background preview on desktop", async ({ page }) => {
    await page.goto("/?asset-spike=1");

    const game = page.locator("#game");
    await expect(game).toHaveAttribute("data-scene", "asset-spike");
    await expect(game).toHaveAttribute("data-scenario", "forest-rock-water");
    await expect(game.locator("canvas")).toHaveScreenshot("asset-spike-desktop.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.01
    });
  });

  test("renders the isolated preview on a mobile viewport", async ({ page }) => {
    await page.goto("/?asset-spike=1");

    const game = page.locator("#game");
    await expect(game).toHaveAttribute("data-scene", "asset-spike");
    await expect(game).toHaveAttribute("data-scenario", "forest-rock-water");
    await expect(game.locator("canvas")).toHaveScreenshot("asset-spike-mobile.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.01
    });
  });

  test("preserves the start interaction semantics", async ({ page }) => {
    await page.goto("/?asset-spike=1");
    await expect(page.locator("#game")).toHaveAttribute("data-scene", "asset-spike");
    await expect(page.locator("#game")).toHaveAttribute("data-scenario", "forest-rock-water");

    await page.keyboard.press("Space");

    await expect(page.locator("#game")).toHaveAttribute("data-scene", "play");
  });
});
