const rrt = require('../rrt/src/rrtbuilder');

var myArgs = process.argv;
const vertices = parseInt(myArgs[2])
const dist = parseInt(myArgs[3])
if (isNaN(vertices)) {
    console.log('Define number of max nodes/vertices using a number.')
    process.exit(1)
}
if (isNaN(dist)) {
    console.log('Define edge length using a number.')
    process.exit(1)
}

rrt.buildRRT(vertices, dist);
module.exports = {}