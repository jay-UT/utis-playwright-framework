#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/* -------------------------------------------
   REPORT MODE
--------------------------------------------*/
const mode = process.argv[2] || "full";

const tagMap = {
  full: "",
  regression: "@regression",
  failure_case: "@failure_case",
  signin: "@signin",
  smoke: "@smoke"
};

if (!tagMap.hasOwnProperty(mode)) {
  console.error(`
Invalid report type.

Usage:
node scripts/report.js full
node scripts/report.js regression
node scripts/report.js failure_case
node scripts/report.js signin
node scripts/report.js smoke
`);
  process.exit(1);
}

/* -------------------------------------------
   DATE FORMAT dd-mm-yyyy_HH-mm-ss
--------------------------------------------*/
function formatTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

const timestamp = formatTimestamp();
const reportDir = `allure-report-${timestamp}`;

const latestDir = path.join("reports", "latest");
const archiveDir = path.join("reports", "archive");

/* -------------------------------------------
   SAFE EXECUTION
--------------------------------------------*/
function run(command, allowFailure = false) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    if (!allowFailure) throw error;
    console.log("⚠️ Tests failed — continuing report generation...");
  }
}

/* -------------------------------------------
   SAFE COPY
--------------------------------------------*/
function safeCopy(src, dest) {
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true, force: true });
  }
}

/* -------------------------------------------
   CHECK EXISTENCE
--------------------------------------------*/
function exists(p) {
  return fs.existsSync(p);
}

/* ===========================================
   MAIN EXECUTION
===========================================*/
try {

  console.log(`🚀 Running ${mode} report...`);

  /* -----------------------------
     CLEAN OLD RESULTS
  ------------------------------*/
  if (exists("allure-results")) {
    fs.rmSync("allure-results", { recursive: true, force: true });
  }

  fs.mkdirSync("allure-results", { recursive: true });

  /* -----------------------------
     RESTORE HISTORY (TREND)
  ------------------------------*/
  const historySource = path.join(latestDir, "history");
  const historyTarget = path.join("allure-results", "history");

  if (exists(historySource)) {
    console.log("📈 Restoring history...");
    fs.mkdirSync(historyTarget, { recursive: true });
    safeCopy(historySource, historyTarget);
  }

  /* -----------------------------
     RUN PLAYWRIGHT TESTS
  ------------------------------*/
  if (mode === "full") {
    run("npx playwright test", true);
  } else {
    run(`npx playwright test --grep ${tagMap[mode]}`, true);
  }

  /* -----------------------------
     ADD ALLURE METADATA
  ------------------------------*/
  run("node scripts/allure-env.js", true);
  run("node scripts/allure-executor.js", true);

  /* -----------------------------
     GENERATE ALLURE REPORT
  ------------------------------*/
  if (exists("allure-results") && fs.readdirSync("allure-results").length > 0) {
  run(`npx allure generate allure-results --clean --single-file -o ${reportDir}`, true);
} else {
  console.log("⚠️ No allure results found. Skipping Allure report generation.");
  process.exit(0);
}

  // run(`npx allure generate allure-results --clean --single-file -o ${reportDir}`);
  // run(`npx allure generate allure-results --clean -o ${reportDir}`);

  /* -----------------------------
     CREATE REPORT DIRECTORIES
  ------------------------------*/
  fs.mkdirSync(latestDir, { recursive: true });
  fs.mkdirSync(archiveDir, { recursive: true });

  /* -----------------------------
     ARCHIVE REPORT
  ------------------------------*/
  console.log("📦 Archiving report...");
  safeCopy(reportDir, path.join(archiveDir, reportDir));

  /* -----------------------------
     UPDATE LATEST REPORT
  ------------------------------*/
  console.log("📂 Updating latest report...");
  fs.rmSync(latestDir, { recursive: true, force: true });
  fs.mkdirSync(latestDir, { recursive: true });
  safeCopy(reportDir, latestDir);

  console.log("✅ Allure report generated successfully");
  console.log(`📂 Latest Report → reports/latest/index.html`);
  console.log(`📦 Archived Report → reports/archive/${reportDir}`);

} catch (err) {
  console.error(err);
  process.exit(1);
}