#!/usr/bin/env node

const { execSync } = require("child_process");

const mode = process.argv[2]; // full | regression | failure

const commands = {
  full: "npm run full-report",
  regression: "npm run only-regression-report",
  failure: "npm run only-failure-report",
  smoke: "npm run only-smoke-report"
};

if (!mode || !commands[mode]) {
  console.error(`

Invalid or missing report type.

Usage:
  node scripts/report.js full
  node scripts/report.js regression
  node scripts/report.js failure
`);
  process.exit(1);
}

try {
  console.log(`🚀 Running ${mode} report...`);
  execSync(commands[mode], { stdio: "inherit" });
} catch (err) {
  process.exit(1);
}
