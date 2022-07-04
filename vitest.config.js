const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  define: {
    "import.meta.vitest": "undefined",
  },
  test: {
    includeSource: ["**/*.{ts,tsx}"],
  },
});
