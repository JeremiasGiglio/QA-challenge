const { defineConfig } = require("cypress");
module.exports = defineConfig({
  
  env: {
    url: 'https://www.pokemon.com/us'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
