import { Configuration, Edge, IGraph } from "./graph";
const {createCanvas, loadImage} = require('canvas');
const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext('2d')
const fs = require('fs');

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 1000, 1000)
ctx.strokeStyle = 'rgba(0,0,0,0.5)'

function createDirIfNotExist(dir: string) {
    if(!fs.existsSync(dir))
        fs.mkdirSync(dir);
}

function saveImg(vertices: number, dist: number) {
    createDirIfNotExist('./img')
    const buffer = canvas.toBuffer("image/png")
    fs.writeFile(`./img/rrt_${vertices}_${dist}.png`, buffer, function (err: any, data: any) {
        if(err) console.log("error ", err)
    })
}

function drawEdge(edge: Edge) {
    ctx.beginPath()
    ctx.lineTo(edge.from.x, edge.from.y)
    ctx.lineTo(edge.to.x, edge.to.y)
    ctx.stroke()
}

function highlightNode(node: Configuration) {
    ctx.beginPath()
    ctx.arc(node.x, node.y, 2, 0, 2*Math.PI, false)
    ctx.fillStyle = 'green'
    ctx.fill()
    ctx.lineWidth=5;
    ctx.strokeStyle='#003300'
    ctx.stroke();
}

function highlightEdge(edge: Edge) {
    ctx.beginPath()
    ctx.lineTo(edge.from.x, edge.from.y)
    ctx.lineTo(edge.to.x, edge.to.y)
    ctx.stroke()
}

function highlightPath(edges: Edge[]) {
    ctx.fillStyle = 'blue'
    ctx.fill()
    ctx.lineWidth=3;
    ctx.strokStyle='#0000ff';
    edges.forEach(edge => {
        highlightEdge(edge)
    });
}


module.exports = {drawEdge: drawEdge, draw: saveImg, 
    highlightNode: highlightNode, highlightPath: highlightPath};