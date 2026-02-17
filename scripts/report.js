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

// const allureTimestampDir = `allure-report-${timestamp}`;
const allureTimestampDir = path.join(
  "reports",
  "archive_Allure_report",
  `Allure-report-${timestamp}`
);

const playwrightTimestampDir = `html-report-${timestamp}`;

const latestAllureDir = path.join("reports", "latest_Allure_report");
const archiveAllureDir = path.join("reports", "archive_Allure_report");


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

  console.log(` Running ${mode} report...`);

  /* -----------------------------
     CLEAN OLD RESULTS
  ------------------------------*/
  if (exists("allure-results")) {
    fs.rmSync("allure-results", { recursive: true, force: true });
  }

  

  fs.mkdirSync("allure-results", { recursive: true });

  /* -----------------------------
     RESTORE ALLURE HISTORY
  ------------------------------*/
  const historySource = path.join(latestAllureDir, "history");
  const historyTarget = path.join("allure-results", "history");

  if (exists(historySource)) {
    console.log(" Restoring Allure history...");
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
    run(`npx allure generate allure-results --clean --single-file -o ${allureTimestampDir}`, true);
  } else {
    console.log(" No Allure results found. Skipping Allure report generation.");
    process.exit(0);
  }

  /* -----------------------------
     CREATE REPORT DIRECTORIES
  ------------------------------*/
  fs.mkdirSync(latestAllureDir, { recursive: true });
  fs.mkdirSync(archiveAllureDir, { recursive: true });


  /* -----------------------------
     ARCHIVE ALLURE REPORT
  ------------------------------*/
  // console.log(" Archiving Allure report...");
  // safeCopy(allureTimestampDir, path.join(archiveAllureDir, allureTimestampDir));

 

  /* -----------------------------
     UPDATE LATEST ALLURE REPORT
  ------------------------------*/
console.log(" Updating latest Allure report...");
fs.rmSync(latestAllureDir, { recursive: true, force: true });
fs.mkdirSync(latestAllureDir, { recursive: true });
safeCopy(allureTimestampDir, latestAllureDir);


  /* -----------------------------
     UPDATE LATEST PLAYWRIGHT REPORT
  ------------------------------*/
  // if (exists(playwrightTimestampDir)) {
  //   console.log(" Updating latest Playwright report...");
  //   fs.rmSync(latestPlaywrightDir, { recursive: true, force: true });
  //   fs.mkdirSync(latestPlaywrightDir, { recursive: true });
  //   safeCopy(playwrightTimestampDir, latestPlaywrightDir);
  // }

  console.log(" Allure report generated successfully");
  console.log(" Playwright report generated successfully");

  console.log(` Latest Allure Report → reports/latest_Allure_report/index.html`);
  console.log(` Archived Allure Report → reports/archive_Allure_report/${allureTimestampDir}`);

  console.log(` Playwright Report → reports/Playwright_report/${playwrightTimestampDir}`);


} catch (err) {
  console.error(err);
  process.exit(1);
}