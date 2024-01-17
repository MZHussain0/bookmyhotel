import { expect, test } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

// test for open a page /add-hotel and filling the form

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  // get the sign in button and click it
  await page.getByRole("link", { name: "Sign In" }).click();

  //
  await expect(
    page.getByRole("heading", { name: "Login in to your account" })
  ).toBeVisible();

  // fill in the form
  await page.locator("[name=email]").fill("zak@coder.com");
  await page.locator("[name=password]").fill("123456");

  // submit the form
  await page.getByRole("button", { name: "Login" }).click();

  // expect to be redirected to the home page
  await expect(page).toHaveURL(UI_URL);
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("India");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("hotels found for India")).toBeVisible();
  await expect(page.getByText("Hotel California")).toBeVisible();
});
