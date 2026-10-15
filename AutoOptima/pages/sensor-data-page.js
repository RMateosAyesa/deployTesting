const { expect } = require('playwright/test');

class SensorDataPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.sensorDataPanel = this.page.locator('[aria-label="Sensor summaries"]');

  }

  async verifySensorDataIsLoaded() {
    await expect(this.sensorDataPanel).toBeVisible();
  }
}

module.exports = { SensorDataPage };
