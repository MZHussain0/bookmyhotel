import { expect, test } from "@playwright/test";

const UI_URL = "http://localhost:5173/";
test("should allow user to sign in", async ({ page }) => {
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
  await page.locator("[type=submit]").click();

  // expect to be redirected to the home page
  await expect(page).toHaveURL(UI_URL);
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

// test for registration of user
test("should allow user to register", async ({ page }) => {
  const testEmail = `test${Math.floor(Math.random() * 100000)}@test.com`;

  await page.goto(UI_URL);
  // get the sign in button and click it
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Register" }).click();

  //assertions
  await expect(page).toHaveURL(`${UI_URL}register`);
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  // fill in the form
  await page.locator("[name=firstName]").fill("Zak");
  await page.locator("[name=lastName]").fill("Hussain");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123456");
  await page.locator("[name=confirmPassword]").fill("123456");

  // submit the form
  await page.locator("[type=submit]").click();
  // expect to be redirected to the home page
  await expect(page).toHaveURL(UI_URL);
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
