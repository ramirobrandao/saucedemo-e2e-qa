const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {

        setupNodeEvents(on, config) {
            return config;
        },

        baseUrl: 'https://www.saucedemo.com/v1',
        reporter: 'mochawesome',
        screenshotOnRunFailure: true,  //gera print quando um teste falhar
        "reporterOptions": {
            "reportDir": "cypress/reports/mochawesome-report",
            "overwrite": false,
            "html": true,
            "json": true,
            "charts": true,
            "reportFilename": "report",
            "timestamp": "mmddyyyy_HHMMss",
            "inlineAssets": true,
            "toOpen": true,
            "reportPageTitle": "Relatório de execução de testes E2E no site SauceDemo",
            "embeddedScreenshots": true  //integrar prints no relatório
        }
    },
});
