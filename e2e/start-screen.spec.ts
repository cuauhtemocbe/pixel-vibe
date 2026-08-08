import { expect, test } from "@playwright/test";

test.describe("start screen", () => {
  test("renders the desktop visual baseline", async ({ page }) => {
    await page.goto("/");

    const game = page.locator("#game");
    const canvas = game.locator("canvas");

    await expect(game).toHaveAttribute("data-scene", "start");
    await expect(canvas).toBeVisible();
    await expect(canvas).toHaveScreenshot("start-screen-desktop.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.01
    });
  });

  test("renders correctly on a mobile viewport", async ({ page }) => {
    await page.goto("/");

    const game = page.locator("#game");
    const canvas = game.locator("canvas");

    await expect(game).toHaveAttribute("data-scene", "start");
    await expect(canvas).toBeVisible();
    await expect(canvas).toHaveScreenshot("start-screen-mobile.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.01
    });
  });

  test("starts gameplay when the user presses a key", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#game")).toHaveAttribute("data-scene", "start");

    await page.keyboard.press("Space");

    await expect(page.locator("#game")).toHaveAttribute("data-scene", "play");
    await expect(page.locator("#game canvas")).toHaveScreenshot("play-screen-desktop.png", {
      animations: "disabled",
      maxDiffPixelRatio: 0.01
    });
  });
});
