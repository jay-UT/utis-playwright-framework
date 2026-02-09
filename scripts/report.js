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
    2. DATE & PATH CONFIGURATION
--------------------------------------------*/
function formatTimestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

const timestamp = formatTimestamp();
const folderSuffix = isCI ? "cireports" : `localreport-${timestamp}`;

const playwrightReportDir = path.join("reports", "playwrightreport", folderSuffix);
const allureReportDir = path.join("reports", "allurereport", folderSuffix);
const allureResultsDir = "allure-results"; 

// Persistent history for local trends
const globalHistoryPath = path.join("reports", "allurereport", "latest-history");

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
    fs.cpSync(src, dest, { recursive: true, force: true });
  }
}

/* ===========================================
    4. MAIN EXECUTION
===========================================*/
try {
  console.log(`🚀 Running ${mode} report in ${isCI ? "CI" : "Local"} mode...`);

  // Clean old raw results
  if (exists(allureResultsDir)) {
    fs.rmSync(allureResultsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(allureResultsDir, { recursive: true });

  /* --- RESTORE HISTORY (For Trend Graph) --- */
  const historyTarget = path.join(allureResultsDir, "history");
  if (exists(globalHistoryPath)) {
    console.log("📈 Found previous history. Restoring trends...");
    fs.mkdirSync(historyTarget, { recursive: true });
    safeCopy(globalHistoryPath, historyTarget);
  }

  /* --- RUN PLAYWRIGHT TESTS --- */
  // Pass the output path to Playwright config
  process.env.PLAYWRIGHT_HTML_REPORT = playwrightReportDir;
  
  if (mode === "full") {
    run("npx playwright test", true);
  } else {
    run(`npx playwright test --grep ${tagMap[mode]}`, true);
  }

  /* --- ADD ALLURE METADATA --- */
  run("node scripts/allure-env.js", true);
  run("node scripts/allure-executor.js", true);

  /* --- GENERATE ALLURE REPORT --- */
  if (exists(allureResultsDir) && fs.readdirSync(allureResultsDir).length > 0) {
    console.log(`📊 Generating Allure HTML report to: ${allureReportDir}`);
    // Note: Generating the report creates a NEW 'history' folder inside allureReportDir
    run(`npx allure generate ${allureResultsDir} --clean --single-file -o ${allureReportDir}`, true);

    /* --- SAVE HISTORY FOR NEXT TIME (Must happen AFTER generation) --- */
    const newHistoryGenerated = path.join(allureReportDir, "history");
    if (exists(newHistoryGenerated)) {
      console.log("💾 Saving updated history for the next run...");
      fs.mkdirSync(globalHistoryPath, { recursive: true });
      safeCopy(newHistoryGenerated, globalHistoryPath);
    }
  } else {
    console.log("⚠️ No allure results found. Skipping.");
  }

  /* --- CLEANUP --- */
  if (exists(allureResultsDir)) {
    fs.rmSync(allureResultsDir, { recursive: true, force: true });
  }

  console.log("\n✅ Execution Finished");
  console.log(`📂 Playwright Report: ${playwrightReportDir}`);
  console.log(`📂 Allure Report:     ${allureReportDir}`);

} catch (err) {
  console.error(err);
  process.exit(1);
}