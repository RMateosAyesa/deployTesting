const { expect } = require('playwright/test');

class LithiumPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.pressureSensorOne = this.page.locator('[data-testid="sensor-card-p1"]');
    this.flowmeterSensorOne = this.page.locator('[data-testid="sensor-card-f1"]');
    this.hydrogenSensorOne = this.page.locator('[data-testid="sensor-card-e1"]');
    this.temperatureSensorTwo = this.page.locator('[data-testid="sensor-card-t2"]');
    this.valveSensors = this.page.locator('[data-testid="sensor-card-v1"]');
    this.pressureSensorTwo = this.page.locator('[data-testid="sensor-card-p2"]');
    this.temperatureSensorOne = this.page.locator('[data-testid="sensor-card-t1"]');
    this.pressureSensorThree = this.page.locator('[data-testid="sensor-card-p3"]');
  }

  async verifyLithiumSystemIsLoaded() {
    await expect(this.pressureSensorOne).toBeVisible();
    await expect(this.flowmeterSensorOne).toBeVisible();
    await expect(this.hydrogenSensorOne).toBeVisible();
    await expect(this.temperatureSensorTwo).toBeVisible();
    await expect(this.valveSensors).toBeVisible();
    await expect(this.pressureSensorTwo).toBeVisible();
    await expect(this.temperatureSensorTwo).toBeVisible();
    await expect(this.pressureSensorThree).toBeVisible();
  }
}

module.exports = { LithiumPage };
