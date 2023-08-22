const {defineConfig} = require("cypress");

module.exports = defineConfig({
  projectId: "nextjs-core",
  env: {
    REACT_APP_IS_E2E_TESTING: true,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    video: false,
    browser: "chrome",
  },
});
