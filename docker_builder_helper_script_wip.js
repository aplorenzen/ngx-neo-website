// Working on a script to build the docker image here, or at least deliver the tag and image name that should be used
// from the projectname, the branch and the version

var pjson = require('./package.json');
console.log(pjson.version);
