const { expect } = require('playwright/test');

class SensorConfigPage {
  constructor(page) {
    this.page = page;
    this.initializeLocators();
  }

  initializeLocators() {
    this.processVariableName = this.page.locator('#process-variable-name');
    this.description = this.page.locator('#description');
    this.variableTypeDropbox = this.page.locator('#variable-type');
    this.baseValor = this.page.locator('#valor-base');
    this.minRange = this.page.locator('#range-min.');
    this.maxRange = this.page.locator('#range-max.');
    this.refreshRate = this.page.locator('#refresh-rate-(s)');
    this.distributionModel = this.page.locator('#distribution-model');
    this.stdDev = this.page.locator('#std-dev');
    this.driftFactor = this.page.locator('#drift-factor');

  }

  async navigateToConfig() {
    this.sensorConfigBtn.click();
  }
}

module.exports = { SensorConfigPage };
