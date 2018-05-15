let replace = require('replace-in-file');
let packageJson = require("./package.json");
/* let buildVersion = packageJson.version; */

/*
BlueOcean run URL - RUN_DISPLAY_URL
Build number - BUILD_ID
Git repository - GIT_REPO_URL
Version - ...
Docker image name - ...
Docker image link - ...
npm version
Jenkins version
Node version
ng version
ngx version
*/

console.log("process.env.RUN_DISPLAY_URL: " + process.env.RUN_DISPLAY_URL);
console.log("process.env.BUILD_ID: " + process.env.BUILD_ID);
console.log("process.env.GIT_URL;: " + process.env.GIT_URL);
console.log("process.env;: " + process.env);

replaceEnvironmentValue('src/environments/environment*.ts');

function replaceEnvironmentValue(files) {

  try {
    const replaceOptions = {
      files: files,
      from: [
        /buildUrl: '(.*)'/g,
        /buildId: '(.*)'/g,
        /gitUrl: '(.*)'/g
      ],
      to: [
        "buildUrl: '"+ process.env.RUN_DISPLAY_URL + "'",
        "buildId: '"+ process.env.BUILD_ID + "'",
        "gitUrl: '"+ process.env.GIT_URL + "'"
      ],
      allowEmptyPaths: false,
    };

    console.debug(replaceOptions);

    changedFiles = replace.sync(replaceOptions);

    console.log('Changed in the files: ' + changedFiles);
  }
  catch (error) {
    console.error('An error occurred when replacing environment value: "' + key + '" to: "' + value + '" in the files: ' + files, error);
    throw error
  }
}

