const { execSync } = require('child_process');
const fs = require('fs');

const timestamp = new Date()
  .toISOString()
  .replace(/:/g, '-')
  .replace('T', '_')
  .split('.')[0];

const reportDir = `allure-report-${timestamp}`;

// generate allure report
execSync(`npx allure generate allure-results --clean -o ${reportDir}`, {
  stdio: 'inherit'
});

// maintain "latest" folder
if (fs.existsSync('allure-latest')) {
  fs.rmSync('allure-latest', { recursive: true, force: true });
}
fs.mkdirSync('allure-latest');
execSync(`cp -r ${reportDir}/* allure-latest`);

console.log(`✅ Allure report generated: ${reportDir}`);