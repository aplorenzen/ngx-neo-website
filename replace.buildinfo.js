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
*/

const optionsBuildUrl = {
  /* Repalce in all environment files */
  files: ['src/environments/environment*.ts'],
  from: /buildUrl: '(.*)'/g,
  to: "buildUrl: '"+ process.env.RUN_DISPLAY_URL + "'",
  allowEmptyPaths: false,
};

const optionsBuildNumber = {
  /* Repalce in all environment files */
  files: ['src/environments/environment*.ts'],
  from: /buildId: '(.*)'/g,
  to: "buildId: '"+ process.env.BUILD_ID + "'",
  allowEmptyPaths: false,
};

const optionsGitUrl = {
  /* Repalce in all environment files */
  files: ['src/environments/environment*.ts'],
  from: /gitUrl: '(.*)'/g,
  to: "gitUrl: '"+ process.env.GIT_REPO_URL + "'",
  allowEmptyPaths: false,
};

try {
  changedFiles = replace.sync(optionsBuildUrl);
  console.log(changedFiles);
  changedFiles = replace.sync(optionsBuildNumber);
  console.log(changedFiles);
  changedFiles = replace.sync(optionsGitUrl);
  console.log(changedFiles);

  /* if (changedFiles == 0) {
    throw "Please make sure that file '" + options.files + "' has \"version: ''\"";
  }*/
  /* console.log('Build version set: ' + buildVersion); */
}
catch (error) {
  console.error('Error occurred:', error);
  throw error
}

