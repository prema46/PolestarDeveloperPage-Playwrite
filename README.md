# Playwright Automation Project

This Playwright Automation Project provides an automated testing framework for both UI and API testing. It utilizes the Page Object Model (POM) for a structured, maintainable test design.

## Description
This project automates UI tests for the Polestar Developer page("https://www.polestar.com/se/developer/get-started/") and API tests for the GoRest API("https://gorest.co.in/"), using Playwright as the test framework. The project is organized with separate modules for page elements, services, utilities, and test cases, providing a clean and modular codebase that supports responsive testing, REST API validations, and report generation. The UI tests validate page elements and responsiveness, while the API tests cover CRUD operations and both positive and negative scenarios.

## Getting Started

## System Requirements

node >= v18.5.x

npm >= v7


## Setup

* Install Visual Studio Code (or any editor)
https://code.visualstudio.com/download

* Install Node.js

https://nodejs.org/en/download

### Dependencies
Node.js (v14 or higher)
Playwright
Any compatible OS (Windows, Mac, Linux)

cd <project-folder>
### Clone the repository:
Installing
```bash
git clone https://github.com/prema46/PolestarDeveloperPage-Playwrite.git
```

```bash
npm install
npx playwright install
```

### Project structure

* Page Object Model (POM): Following the POM pattern for the UI components and API validation.
* ` Not updated yet: ` folder is For future updates, indicating that these folders and files are placeholders and will be updated later to avoid hardcoding and improve maintainability.
* Readable: Avoiding hardcoded values ensures better readability and flexibility for future changes.

```bash

├── test-results
│   ├── data
│   │   └── index.html                  # Generated test result HTML report
├── tests
│   ├── pages                            # Page classes for UI components following the POM pattern
│   │   └── polestarDeveloperPage.js    # Page Object for Polestar Developer Page
│   ├── services                         # Service classes for API interactions
│   │   └── not updated yet              # Placeholder for future API service classes
│   ├── utils                            # Utilities and helper functions for reusable code
│   │   └── not updated yet              # Placeholder for future utility functions
│   ├── tests                            # Test scripts for both UI and API
│   │   ├── polestarDeveloperTest.js    # Test script for Polestar Developer Page (UI tests)
│   │   ├── gorest-api-tests.spec.js    # API positive and negative validation test cases
│   │   └── gorest-api-NegativeTests.spec.js  # API negative test case file for invalid scenarios
├── reports                              # Folder for test reports (HTML, screenshots)
├── playwright.config.ts                 # Playwright configuration file

```
### Test report 
<picture>
 <img alt="YOUR-ALT-TEXT" src="">
</picture>




Install the dependencies:

```bash
npm install
```
### Executing Program

To run the Playwright tests, use:

```bash
npx playwright test
```
To view test results in HTML format:
```bash
`npx playwright show-report`
```
Detailed configurations for brow'ser options, viewport settings, and environment variables are managed within 
playwright.config.ts.

###  Help
If any issues arise, check the Playwright documentation or run:
```bash
`npx playwright help`
```
## Common issues:

* Ensure all dependencies are installed with npm install.
* If tests fail due to timeouts, adjust the timeout settings in playwright.config.ts.
