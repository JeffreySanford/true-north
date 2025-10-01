import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain the actual app title
  expect(await page.locator('h1').innerText()).toContain('True North Insights');
});

test('should display tactical interface elements', async ({ page }) => {
  await page.goto('/');

  // Check for tactical header
  await expect(page.locator('.tactical-header')).toBeVisible();
  
  // Check for phase status
  await expect(page.locator('.phase-status')).toBeVisible();
  
  // Check for tactical cards (use first() to handle multiple elements)
  await expect(page.locator('.tactical-card').first()).toBeVisible();
  
  // Verify we have multiple tactical cards
  const cardCount = await page.locator('.tactical-card').count();
  expect(cardCount).toBeGreaterThan(0);
});

test('should show Material 3 Expressive toaster notifications', async ({ page }) => {
  await page.goto('/');

  // Check if snackbar/toaster notifications appear
  // The app automatically shows demo notifications on startup
  const snackbar = page.locator('.mat-mdc-snack-bar-container');
  
  // Wait for at least one notification to appear (from demo sequence)
  await expect(snackbar).toBeVisible({ timeout: 15000 });
});

test('should display tactical footer with system information', async ({ page }) => {
  await page.goto('/');

  // Check for tactical footer which contains timestamps
  await expect(page.locator('.tactical-footer')).toBeVisible();
  
  // Check that footer contains system information
  const footerText = await page.locator('.tactical-footer').innerText();
  expect(footerText).toContain('Tactical Interface');
});
