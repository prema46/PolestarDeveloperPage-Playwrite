const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true, 
  timeout: 180000,
  retries: 0,
  reporter: [['html', { outputFolder: 'reports' }], ['json', { outputFile: 'reports/test-results.json' }]],
  workers: 5, 
  use: {
    baseURL: 'https://www.polestar.com/se/developer/get-started/',
    headless:true,
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
  },
  snapshots: {
    storage: './test-results/screenshots',  // Custom path for snapshots
  },
  projects: [
    {
      name: 'API',
      grep: /API:/,      // Only include API tests
      use: { browserName: 'API',  ignoreHTTPSErrors: true,}, // Can use any single browser for API tests
    },
    {
      
     name: 'chromium',
     grepInvert: /API:/, // Exclude API tests
     use: { browserName: 'chromium', ignoreHTTPSErrors: true,},
    },
    {
      name: 'firefox',
      grepInvert: [/API:/, /UrlCheck:/], // Exclude tests with these patterns
      use: { browserName: 'firefox', ignoreHTTPSErrors: true,},
    },
    {
      name: 'webkit',
      grepInvert: [/API:/, /UrlCheck:/], // Exclude tests with these patterns
      use: { browserName: 'webkit',  ignoreHTTPSErrors: true, },
    },
  ],

});
