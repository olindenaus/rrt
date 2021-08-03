import { Configuration, Edge } from "./graph";
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext('2d')
const fs = require('fs');

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 1000, 1000)
ctx.strokeStyle = 'rgba(0,0,0,0.5)'

let noHighlight = false;

function setNoHighlight(value: boolean) {
    console.log(`Setting -noHighlight=${value}`)
    noHighlight = value;
}

function createDirIfNotExist(dir: string) {
    if (!fs.existsSync(dir))
        fs.mkdirSync(dir);
}

function saveImg(vertices: number, dist: number) {
    createDirIfNotExist('./img')
    const buffer = canvas.toBuffer("image/png")
    fs.writeFile(`./img/rrt_${vertices}_${dist}.png`, buffer, function (err: any, data: any) {
        if (err) console.log("error ", err)
    })
}

function drawEdge(edge: Edge) {
    ctx.beginPath()
    ctx.lineTo(edge.from.x, edge.from.y)
    ctx.lineTo(edge.to.x, edge.to.y)
    ctx.stroke()
}

function highlightNode(node: Configuration) {
    if (!noHighlight) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, 2 * Math.PI, false)
        ctx.fillStyle = 'green'
        ctx.fill()
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#003300'
        ctx.stroke();
    }
}

function highlightEdge(from: Configuration, to: Configuration) {
    if (!noHighlight) {
        ctx.beginPath()
        ctx.lineTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()
    }
}

function markPathTo(node: Configuration) {
    const parent = node.parent;
    if (!parent)
        return
    highlightEdge(node, parent);
    markPathTo(parent)
}

function highlightPathTo(node: Configuration) {
    if (!noHighlight) {
        ctx.fillStyle = 'blue'
        ctx.fill()
        ctx.lineWidth = 3;
        ctx.strokStyle = '#0000ff';
        markPathTo(node);
    }
}


module.exports = {
    drawEdge: drawEdge, draw: saveImg,
    highlightNode: highlightNode, highlightPathTo: highlightPathTo,
    setNoHighlight: setNoHighlight
};