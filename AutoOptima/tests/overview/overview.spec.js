const { describe, test } = require("@playwright/test");
const { MainPage } = require('../../pages/main-page');

describe("[Functional Test] Overview check", () => {
  //Variable declaration
  let loginPage = null;
  let mainPage = null;

  // 1. Describe configuration
  test.describe.configure({ mode: "serial" });

  // 2. Open main window ##### A diferencia de las apps desktop, en webapps usamos 'page' en vez de 'window' porque trabajamos con navegación url, por eso usamos el método 'goto'
  test.beforeEach(async ({ page }) => {
    await page.goto('');
    mainPage = new MainPage(page);
  });

  // 3. Test implementation
  test.describe("When the overview page loads", () => {
    test("Should see every card correctly", async () => {
      await mainPage.verifyOverviewIsLoaded();
    });
  });
});
