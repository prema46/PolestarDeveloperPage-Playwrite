const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true, 
  timeout: 120000,
  retries: 0,
  reporter: [['html', { outputFolder: 'reports' }], ['json', { outputFile: 'reports/test-results.json' }]],
  workers: 4, 
  use: {
    baseURL: 'https://www.polestar.com',
    headless:true,
  },
  snapshots: {
    storage: './test-results/screenshots',  // Custom path for snapshots
  },
  projects: [
    {
      name: 'API',
      grep: /API:/,      // Only include API tests
      use: { browserName: 'chromium' }, // Can use any single browser for API tests
    },
    {
      name: 'chromium',
      grepInvert: /API:/, // Exclude API tests
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      grepInvert: /API:/, // Exclude API tests
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      grepInvert: /API:/, // Exclude API tests
      use: { browserName: 'webkit' },
    },
  ],

});
