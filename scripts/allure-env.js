const fs = require("fs");
const os = require("os");
const path = require("path");

const resultsDir = "allure-results";

if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

const content = `
Environment=Local
OS=${os.platform()} ${os.release()}
Tester=${process.env.USERNAME || process.env.USER || "Unknown"}
Node=${process.version}
`;

fs.writeFileSync(
  path.join(resultsDir, "environment.properties"),
  content.trim()
);

console.log("✅ Allure environment file created");
