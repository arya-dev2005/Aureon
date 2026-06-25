import { expect, test, type Page } from "@playwright/test";

async function collectBrowserErrors(page: Page) {
  const errors: string[] = [];

  page.on("pageerror", error => {
    errors.push(error.message);
  });
  page.on("console", message => {
    if (message.type() === "error") {
      if (message.text().includes("net::ERR_NETWORK_ACCESS_DENIED")) {
        return;
      }
      errors.push(message.text());
    }
  });

  return errors;
}

test.describe("Aureon storefront", () => {
  test("loads core public routes without browser errors", async ({ page }) => {
    const errors = await collectBrowserErrors(page);
    const routes = [
      "/",
      "/products",
      "/products/1",
      "/cart",
      "/login",
      "/register",
      "/about",
      "/contact",
      "/faq",
      "/shipping",
      "/trust",
      "/membership",
      "/vendor/dashboard",
      "/admin/dashboard",
    ];

    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByRole("link", { name: /Aureon home/i }).first()).toBeVisible();
    }

    expect(errors).toEqual([]);
  });

  test("searches from the header and opens a product detail page", async ({ page }) => {
    await page.goto("/");

    if ((page.viewportSize()?.width ?? 0) < 768) {
      await page.goto("/products?q=chronograph");
    } else {
      await page.getByPlaceholder("Search premium products...").fill("chronograph");
      await page.keyboard.press("Enter");
    }

    await expect(page).toHaveURL(/\/products\?q=chronograph/);
    await expect(page.getByRole("heading", { name: "Our Collection" })).toBeVisible();
    await expect(page.getByText("Carbon Fibre Chronograph Elite").first()).toBeVisible();

    await page.getByText("Carbon Fibre Chronograph Elite").first().click();
    await expect(page).toHaveURL(/\/products\/1/);
    await expect(page.getByRole("heading", { name: "Carbon Fibre Chronograph Elite" })).toBeVisible();
  });

  test("adds a product to cart and proceeds to checkout", async ({ page }) => {
    await page.goto("/products/1");

    await page.getByRole("button", { name: /Add to Cart/i }).click();
    await expect(page.getByText(/Added to Cart/i)).toBeVisible();

    await page.goto("/cart");
    await expect(page.getByRole("heading", { name: "Shopping Cart" })).toBeVisible();
    await expect(page.getByText("Carbon Fibre Chronograph Elite").first()).toBeVisible();

    await page.getByRole("button", { name: /Proceed to Checkout/i }).click();
    await expect(page).toHaveURL(/\/checkout/);
  });

  test("logs in through the API integration", async ({ page }) => {
    await page.route("**/api/auth/login", async route => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          token: "e2e-token",
          user: { id: "user_1", email: "member@aureon.test", name: "Aureon Member" },
        }),
      });
    });

    await page.goto("/login");
    await page.getByPlaceholder("your@email.com").fill("member@aureon.test");
    await page.getByPlaceholder(/.+/).last().fill("correct-password");
    await page.getByRole("button", { name: /Sign In to Aureon/i }).click();

    await expect(page).toHaveURL(/\/account/);
    await expect.poll(() => page.evaluate(() => localStorage.getItem("aureon_token"))).toBe("e2e-token");
  });

  test("shows registration validation and successful account creation", async ({ page }) => {
    await page.route("**/api/auth/register", async route => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          token: "new-member-token",
          user: { id: "user_2", email: "new@aureon.test", name: "New Member" },
        }),
      });
    });

    await page.goto("/register");
    await page.getByRole("button", { name: /Create Your Account/i }).click();
    await expect(page.getByText("Please fill in all fields.")).toBeVisible();

    await page.getByPlaceholder("Your full name").fill("New Member");
    await page.getByPlaceholder("your@email.com").fill("new@aureon.test");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
    await page.locator('input[type="password"]').first().fill("Str0ngPassword!");
    await page.locator('input[type="password"]').last().fill("Str0ngPassword!");
    await page.locator("#agree").check();
    await page.getByRole("button", { name: /Create Your Account/i }).click();

    await expect(page).toHaveURL(/\/account/);
    await expect.poll(() => page.evaluate(() => localStorage.getItem("aureon_token"))).toBe("new-member-token");
  });

  test("diagnostics reports mocked API and session state", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("aureon_token", "diagnostics-token");
    });
    await page.route("**/api/health", async route => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ status: "healthy", database: "connected", timestamp: new Date().toISOString() }),
      });
    });
    await page.route("**/api/auth/me", async route => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ user: { email: "member@aureon.test", name: "Aureon Member" } }),
      });
    });

    await page.goto("/diagnostics");

    await expect(page.getByRole("heading", { name: "Diagnostics" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "API" }).getByText("healthy", { exact: true })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "Database" }).getByText("connected", { exact: true })).toBeVisible();
    await expect(page.getByText("Authenticated")).toBeVisible();
  });

  test("responsive navigation opens the products collection", async ({ page }) => {
    await page.goto("/");

    if ((page.viewportSize()?.width ?? 0) < 768) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
      await page.getByRole("link", { name: "All Products" }).click();
    } else {
      await page.getByRole("link", { name: "All Products" }).click();
    }

    await expect(page).toHaveURL(/\/products/);
    await expect(page.getByRole("heading", { name: "Our Collection" })).toBeVisible();
  });
});
