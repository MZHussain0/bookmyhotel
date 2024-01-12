import { expect, test } from "@playwright/test";
import path from "path";

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
  await page.locator("[type=submit]").click();

  // expect to be redirected to the home page
  await expect(page).toHaveURL(UI_URL);
});

test("should allow user to add hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);
  //
  await expect(
    page.getByRole("heading", { name: "Register a hotel" })
  ).toBeVisible();

  // fill in the form
  await page.locator("[name=name]").fill("Hotel 1");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.locator("[name=city]").fill("London");
  await page.locator("[name=country]").fill("UK");
  await page.locator("[name=description]").fill("This is a test hotel");
  await page.getByText("Suite").click();
  await page.getByLabel("Bar").check();
  await page.locator("[name=adultCount]").fill("3");
  await page.locator("[name=childCount]").fill("2");
  await page.getByLabel("Rating").click();
  await page.getByRole("option", { name: "3 star" }).click();
  // for uploading imageFiles
  await page.setInputFiles("[id='image-upload']", [
    path.join(__dirname, "files", "h1.jpeg"),
    path.join(__dirname, "files", "h2.jpeg"),
  ]);

  // submit the form
  await page.locator("[type=submit]").click();
  await page.getByRole("button", { name: "Add Hotel" }).click();
  await expect(
    page.getByText("Hotel added successfully.").first()
  ).toBeVisible();
});
