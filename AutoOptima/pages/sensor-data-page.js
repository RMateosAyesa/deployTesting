const { expect } = require('playwright/test');

class SensorDataPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.sensorDataPanel = this.page.locator('[aria-label="Sensor summaries"]');
    this.sensorConfigBtn = this.page.locator('.sc-ddjGPF').first();
    this.tempOneCard = this.page.locator('.sc-dAbbOM').nth(0);
    this.tempTwoCard = this.page.locator('.sc-dAbbOM').nth(1);
    this.pressureOneCard = this.page.locator('.sc-dAbbOM').nth(2);
    this.pressureTwoCard = this.page.locator('.sc-dAbbOM').nth(3);
    this.identityMetaCard = this.page.locator('.sc-bpUBKa').nth(0);
    this.baselineModelCard = this.page.locator('.sc-bpUBKa').nth(1);
    this.eventInjectionCard = this.page.locator('.sc-bpUBKa').nth(2);
  }

  async navigateToConfig() {
    this.sensorConfigBtn.click();
  }

  async verifySensorDataIsLoaded() {
    await expect(this.sensorDataPanel).toBeVisible();
  }

  async verifySensorDataPageIsLoaded() {
    await expect(this.tempOneCard).toBeVisible();
    await expect(this.tempTwoCard).toBeVisible();
    await expect(this.pressureOneCard).toBeVisible();
    await expect(this.pressureTwoCard).toBeVisible();
  }

  async verifyConfigIsLoaded() {
    await expect(this.identityMetaCard).toBeVisible();
    await expect(this.baselineModelCard).toBeVisible();
    await expect(this.eventInjectionCard).toBeVisible();
  }
}

module.exports = { SensorDataPage };
