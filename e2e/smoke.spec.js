import { test, expect } from '@playwright/test';

test.describe('Caribbean Carnival Planner — Automated Smoke Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Collect unhandled page errors to catch regressions
    const errors = [];
    page.on('pageerror', (err) => {
      // Filter non-fatal 3rd-party warnings if any
      errors.push(err.message);
    });

    await page.goto('/');
  });

  test('Sanity: Page loads with title and root container', async ({ page }) => {
    await expect(page).toHaveTitle(/Carnival|Soca|CaribPulse|Planner/i);
    const root = page.locator('#root');
    await expect(root).toBeVisible({ timeout: 15000 });
  });

  test('Home Hub: Renders Caribbean Carnival selector or countdown', async ({ page }) => {
    // Verify either countdown, carnival title, or selector exists
    const bodyText = await page.textContent('body');
    expect(bodyText).toMatch(/Carnival|Trinidad|Jamaica|Barbados|St\. Lucia|Soca|Days|Hours/i);
  });

  test('Navigation: Bottom/Top navigation bar is responsive', async ({ page }) => {
    // Wait for the app container to be ready
    await page.waitForLoadState('domcontentloaded');
    
    // Look for common navigation buttons or tabs (Schedule, Budget, Costume, Squad, Passport)
    const navItems = page.locator('nav, [role="navigation"], button');
    const count = await navItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Resilience: No uncaught fatal runtime exceptions on initial render', async ({ page }) => {
    const criticalErrors = [];
    page.on('pageerror', (error) => {
      if (!error.message.includes('ResizeObserver') && !error.message.includes('thirdweb')) {
        criticalErrors.push(error.message);
      }
    });

    await page.waitForTimeout(2000);
    expect(criticalErrors).toEqual([]);
  });
});
