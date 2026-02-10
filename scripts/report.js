#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/* -------------------------------------------
    1. ENVIRONMENT & MODE SETUP
--------------------------------------------*/
const isCI = !!process.env.CI;
const mode = process.argv[2] || "full";

const tagMap = {
  full: "",
  regression: "@regression",
  failure_case: "@failure_case",
  signin: "@signin",
  smoke: "@smoke"
};

if (!tagMap.hasOwnProperty(mode)) {
  console.error(`Invalid report type. Usage: node scripts/report.js [full|regression|failure_case|signin|smoke]`);
  process.exit(1);
}

/* -------------------------------------------
    DATE & PATH CONFIGURATION
--------------------------------------------*/

function formatTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  return (
    `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}_` +
    `${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`
  );
}

const timestamp = formatTimestamp();

/* ===== FINAL FOLDER STRUCTURE ===== */

const playwrightReportDir = isCI
  ? path.join("Reports", "playwright", "ci")
  : path.join("Reports", "playwright", "local", `playwright-${timestamp}`);

const allureReportDir = isCI
  ? path.join("Reports", "allurereport", "ci")
  : path.join("Reports", "allurereport", "local", `allure-${timestamp}`);

// Allure history stored ONLY in CI folder
const globalHistoryPath = path.join("Reports", "allurereport", "ci", "history");

const allureResultsDir = "allure-results";


/* -------------------------------------------
    3. HELPER FUNCTIONS
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

function exists(p) { return fs.existsSync(p); }

function safeCopy(src, dest) {
  if (exists(src)) {
    if (!exists(path.dirname(dest))) fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.cpSync(src, dest, { recursive: true, force: true });
  }
}

/* ===========================================
    4. MAIN EXECUTION
===========================================*/
try {
  console.log(`🚀 Running ${mode} report in ${isCI ? "CI" : "Local"} mode...`);

  /* --- CLEAN OLD RESULTS --- */
  if (exists(allureResultsDir)) {
    fs.rmSync(allureResultsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(allureResultsDir, { recursive: true });

  /* --- RESTORE HISTORY (TREND) --- */
  const historyTarget = path.join(allureResultsDir, "history");
  
  // Logic: Check local history first, then check if we are in CI
  if (exists(globalHistoryPath)) {
    console.log("📈 Found previous history. Restoring trends...");
    safeCopy(globalHistoryPath, historyTarget);
  }

  /* --- RUN PLAYWRIGHT TESTS --- */
  // Ensure Playwright outputs its HTML report to our specific subfolder
  // process.env.PLAYWRIGHT_HTML_REPORT = playwrightReportDir;
  process.env.PW_HTML_REPORT_FOLDER = playwrightReportDir;

  
  const testCmd = mode === "full" 
    ? "npx playwright test" 
    : `npx playwright test --grep ${tagMap[mode]}`;
  
  run(testCmd, true);

  /* --- ADD ALLURE METADATA --- */
  // Environment and Executor info help Allure display context
  run("node scripts/allure-env.js", true);
  run("node scripts/allure-executor.js", true);

  /* --- GENERATE ALLURE REPORT --- */
  if (exists(allureResultsDir) && fs.readdirSync(allureResultsDir).length > 0) {
    console.log(`📊 Generating Allure HTML report to: ${allureReportDir}`);
    
    // Ensure the output directory exists
    fs.mkdirSync(allureReportDir, { recursive: true });
    
    // Generate the dashboard
    run(`npx allure generate ${allureResultsDir} --clean --single-file -o ${allureReportDir}`, true);

    /* --- SAVE HISTORY FOR NEXT TIME --- */
    const newHistoryGenerated = path.join(allureReportDir, "history");
    if (exists(newHistoryGenerated)) {
      console.log("💾 Saving updated history for the next run...");
      safeCopy(newHistoryGenerated, globalHistoryPath);
    }
  } else {
    console.log("⚠️ No allure results found. Skipping Allure generation.");
  }

  /* --- CLEANUP RAW DATA --- */
  if (exists(allureResultsDir)) {
    fs.rmSync(allureResultsDir, { recursive: true, force: true });
  }

  console.log("\n✅ Execution Finished");
  console.log(`📂 Playwright Report: ${playwrightReportDir}`);
  console.log(`📂 Allure Report:     ${allureReportDir}`);

} catch (err) {
  console.error("❌ Fatal Script Error:", err);
  process.exit(1);
}