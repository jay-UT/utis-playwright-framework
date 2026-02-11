Git statements to get the code into local from the branch
testing
Open vscode 
Go to terminal
Type the below statements : 
1.CD navigate to driver where you need your project
2.git clone https://github.com/jay-UT/utis-playwright-framework.git <foldername>
3.cd <foldername>
4.git branch -a (check available branch)
5.git checkout -b branch origin/branch (navigate to branch)
6.git pull origin branch(code will download in the folder)
7.code .(will open the project in vs code)

Playwright installation

Go to the project
Open terminal in vscode

Step1 : Install playwright
npm init playwright@latest

Choose the following options when prompted: 
• Language: TypeScript 
• Test directory: tests 
• GitHub Actions workflow: Yes 
• Install browsers: Yes 
• For overwrite options give: no

Step2:Install this add-ons 
npm install csv-parse 
npm install xlsx 
npm install -D allure-playwright 
npm install @faker-js/faker
