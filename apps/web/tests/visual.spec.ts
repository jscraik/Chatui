import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

test.describe("@visual", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  const disableAnimations = async (page: Page) => {
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          caret-color: transparent !important;
        }
      `,
    });
  };

  test("chat page visual baseline @visual", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("[data-testid='chat-ui-root']");
    await disableAnimations(page);
    await expect(page).toHaveScreenshot("chat-page.png", { fullPage: true });
  });

  test("widget harness visual baseline @visual", async ({ page }) => {
    await page.goto("/harness");
    await page.waitForSelector("text=Widget Gallery");
    await disableAnimations(page);
    await expect(page).toHaveScreenshot("widget-harness.png", { fullPage: true });
  });
});
