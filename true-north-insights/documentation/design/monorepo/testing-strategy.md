# Testing Strategy — Unit, Contract, E2E, Load

## Pyramid
- **Unit:** DTO validators, services, repo adapters (Mongo/SQL).
- **Contract:** Shared DTO/repo interfaces consumed by FE/BE.
- **E2E:** Playwright — login → add time → see summary → view audit.
- **Load (tiny):** spike 100 req/min; WS downsampling verified.

## Examples
```ts
// apps/backend/src/time/time.service.spec.ts
it('rejects minutes > 960', async () => {
  await expect(svc.create({ minutes: 1000, ...ok })).rejects.toThrow();
});
```

```ts
// apps/frontend/e2e/specs/add-time.spec.ts (Playwright)
test('add time and see header summary', async ({ page }) => {
  await login(page);
  await page.click('text=Board');
  await page.click('data-test=card-1');
  await page.fill('data-test=minutes', '30');
  await page.click('data-test=save');
  await expect(page.locator('data-test=header-summary')).toContainText('0:30');
});
```
