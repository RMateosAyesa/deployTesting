const { expect } = require('playwright/test');

class SensorDataPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.sensorDataPanel = this.page.locator('[aria-label="Sensor summaries"]');
    this.sensorConfigBtn = this.page.locator('.sc-ddjGPF').first();
    this.tempOneCard = this.page.locator('[data-testid="sensor-summary-card-0"]');
    this.tempTwoCard = this.page.locator('[data-testid="sensor-summary-card-1"]');
    this.pressureOneCard = this.page.locator('[data-testid="sensor-summary-card-2"]');
    this.pressureTwoCard = this.page.locator('[data-testid="sensor-summary-card-3"]');
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
}

module.exports = { SensorDataPage };
