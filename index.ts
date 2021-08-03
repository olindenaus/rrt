const rrt = require('../rrt/src/rrtbuilder');
const drawer = require("./src/drawer")

var myArgs = process.argv;
const vertices = parseInt(myArgs[2])
const dist = parseInt(myArgs[3])
const noHighlight = myArgs[4] === 'true'
if (isNaN(vertices)) {
    console.log('Define number of max nodes/vertices using a number.')
    process.exit(1)
}
if (isNaN(dist)) {
    console.log('Define edge length using a number.')
    process.exit(1)
}

drawer.setNoHighlight(noHighlight);
rrt.buildRRT(vertices, dist);
module.exports = {}