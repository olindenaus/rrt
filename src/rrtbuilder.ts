
import { Configuration, Edge, IGraph } from './graph';
const Graph = require('./graph');
const drawer = require('./drawer');

const MAX_VALUE = 1000;
const initConfig: Configuration = {
    x: 500,
    y: 500,
    orientation: 0
}

const goalConfig: Configuration = {
    x: 900,
    y: 900,
    orientation: 0
}

function selectRandomConfig(): Configuration {
    let config: Configuration = {
        orientation: Math.random() * 2*Math.PI,
        x: Math.random() * MAX_VALUE,
        y: Math.random() * MAX_VALUE
    };
    return config;
}

function getEuclideanDistance(from: Configuration, to: Configuration): number {
    const xDiff = Math.abs(from.x - to.x);
    const yDiff = Math.abs(from.y - to.y);
    return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

function selectNearestNode(random: Configuration, graph: IGraph): Configuration {
    const nearest = graph.nodes.map(node => {
        return { node: node, dist: getEuclideanDistance(random, node) }
    }).reduce(function (prev, curr) {
        return prev.dist < curr.dist ? prev : curr;
    }).node;
    return nearest;
}

function getNewNode(nearest: Configuration, random: Configuration, incrementalDist: number): Configuration {
    const dist = getEuclideanDistance(nearest, random);
    if (dist < incrementalDist) return random;
    var vector = { x: random.x - nearest.x, y: random.y - nearest.y };
    var normalized = { x: vector.x / dist, y: vector.y / dist }
    var closerNode = { x: nearest.x + normalized.x * incrementalDist, y: nearest.y + normalized.y * incrementalDist, orientation: 0 };
    return closerNode;
}

function IsInGoalVicinity(goalConf: Configuration, graph: IGraph): boolean {
    const nearest = graph.nodes.map(node => {
        return { node: node, dist: getEuclideanDistance(goalConf, node) }
    }).find(el =>el.dist < 5);
    if(!nearest)
        return false
    return true;
}

function buildRRT(vertices: number, incrementalDist: number, initConf = initConfig, goalConf = goalConfig) {
    let randomConfig: Configuration;
    let nearestConfig: Configuration;
    let newNode: Configuration;
    let edge: Edge;
    var graph: IGraph = new Graph(initConf);
    graph.init();
    for (var k = 1; k < vertices; k++) {
        randomConfig = selectRandomConfig();
        nearestConfig = selectNearestNode(randomConfig, graph);
        newNode = getNewNode(nearestConfig, randomConfig, incrementalDist);
        graph.addNode(newNode);
        edge = graph.addEdge(nearestConfig, newNode);
        drawer.drawEdge(edge)
        if (IsInGoalVicinity(goalConf, graph)) {
            const closestNode = selectNearestNode(goalConf, graph);
            edge = graph.addEdge(closestNode, goalConf)
            drawer.drawEdge(edge)
            console.log('Found path!')
            break;
        }
    }
    drawer.highlightNode(initConf)
    drawer.highlightNode(goalConf)
    drawer.draw(vertices, incrementalDist);
}

module.exports = { buildRRT: buildRRT }