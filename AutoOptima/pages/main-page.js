const { expect } = require('playwright/test');

class MainPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.firstPanel = this.page.locator('.ant-collapse-panel-active').first();
    this.secondPanel = this.page.locator('.ant-collapse-panel-active').last();
    this.cpuPanel = this.page.locator('[data-testid="metric-card-node-01-cpu"]');
    this.ramPanel = this.page.locator('[data-testid="metric-card-node-01-ram"]');
    this.diskPanel = this.page.locator('[data-testid="metric-card-node-01-disk"]');
    this.networkPanel = this.page.locator('[data-testid="metric-card-node-01-network"]');
    this.secondCpuPanel = this.page.locator('[data-testid="metric-card-node-02-cpu"]');
    this.overviewBtn = this.page.locator('[data-testid="nav-item-overview"]');
    this.lithiumSystemBtn = this.page.locator('[data-testid="nav-item-lithium"]');
    this.dataLabBtn = this.page.locator('[data-testid="nav-item-datalab"]');
    this.anomalyBtn = this.page.locator('[data-testid="nav-item-anomaly"]');
    this.sensorDataBtn = this.page.locator('[data-testid="nav-item-sensor-data-config"]');
    this.iocTempServerCard = this.page.locator('[data-testid="ioc-card-node-01-temp"]');
    this.iocPressureServerCard = this.page.locator('[data-testid="ioc-card-node-01-pressure"]');
    this.dataSensorBtn = this.page.locator('[data-testid="nav-item-sensor-data-config"]');
    this.showIocBtn = this.page.locator('.fXfUpk').first();
  }

  async navigateToLithiumSystem() {
    await this.lithiumSystemBtn.click();
    await this.page.waitForTimeout(3000);
  }

  async navigateToDataSensor() {
    await this.dataSensorBtn.click();
  }

  async verifyIocPanel() {
    await this.showIocBtn.click();
    await expect(this.iocTempServerCard).toBeVisible();
    await expect(this.iocPressureServerCard).toBeVisible();
  }

  async verifyOverviewIsLoaded() {
    await expect(this.firstPanel).toBeVisible();
    await expect(this.secondPanel).toBeVisible();
    await expect(this.cpuPanel).toBeVisible();
    await expect(this.ramPanel).toBeVisible();
    await expect(this.diskPanel).toBeVisible();
    await expect(this.networkPanel).toBeVisible();
    await expect(this.secondCpuPanel).toBeVisible();
  }
}

module.exports = { MainPage };
