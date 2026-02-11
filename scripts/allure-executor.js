const fs = require("fs");
const path = require("path");

const resultsDir = "allure-results";

if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

function formatDate() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

const executor = {
  name: process.env.CI ? "GitHub Actions" : "Local Execution",
  type: "playwright",
  buildName: `Execution ${formatDate()}`,
  reportName: `Allure Report `,
  buildUrl: process.env.GITHUB_SERVER_URL
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : "Local Run"
};

fs.writeFileSync(
  path.join(resultsDir, "executor.json"),
  JSON.stringify(executor, null, 2)
);

console.log("✅ Allure executor file created");
