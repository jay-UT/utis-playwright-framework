const fs = require('fs-extra');
const { execSync } = require('child_process');

const isCI = !!process.env.CI;

const now = new Date();
const timestamp =
  String(now.getDate()).padStart(2, '0') + '-' +
  String(now.getMonth() + 1).padStart(2, '0') + '-' +
  now.getFullYear() + '_' +
  String(now.getHours()).padStart(2, '0') + '-' +
  String(now.getMinutes()).padStart(2, '0') + '-' +
  String(now.getSeconds()).padStart(2, '0');

const allureResults = 'allure-results';

const localFolder = `reports/allurereport/localreports/allure-${timestamp}`;
const ciFolder = `reports/allurereport/cireports`;


// ✅ Restore CI history
if (isCI && fs.existsSync(`${ciFolder}/history`)) {
  fs.copySync(`${ciFolder}/history`, `${allureResults}/history`);
  console.log('Allure history restored');
}


// ✅ Generate report
if (isCI) {

  execSync(`allure generate ${allureResults} --clean -o ${ciFolder}`, { stdio: 'inherit' });

} else {

  execSync(`allure generate ${allureResults} --clean -o ${localFolder}`, { stdio: 'inherit' });

}
