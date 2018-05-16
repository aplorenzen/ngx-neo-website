let replace = require('replace-in-file');
let packageJson = require("./package.json");

/*
TODO: It could be fun to publish some more facts on the webapp from the build process
  here are some ideas:

BlueOcean run URL - RUN_DISPLAY_URL
Build number - BUILD_ID / BUILD_DISPLAY_NAME: '#60',
Git repository - GIT_REPO_URL
Version - ...
Docker image name - ...
Docker image link - ...
npm version
Jenkins version
Node version
ng version
ngx version */
/* let buildVersion = packageJson.version; */

/* Logging everything while developing this feature */
console.log(process.env);

/* Replace in the environment files */
replaceEnvironmentValues('src/environments/environment*.ts');

function replaceEnvironmentValues(files) {

  try {
    const replaceOptions = {
      files: files,
      from: [
        /buildUrl: '(.*)'/g,
        /buildId: '(.*)'/g,
        /dockerImageName: '(.*)'/g
      ],
      to: [
        "buildUrl: '"+ process.env.RUN_DISPLAY_URL + "'",
        "buildId: '"+ process.env.BUILD_ID + "'",
        "dockerImageName: '"+ process.env.IMAGE_NAME + "'"
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

