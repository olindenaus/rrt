
import { Configuration, Edge, IGraph } from './graph';
const utils = require('./util');
const Graph = require('./graph');
const drawer = require('./drawer');

const MAX_VALUE = 1000;
let randomConfig: Configuration;
let nearestConfig: Configuration;
let newNode: Configuration;
let edge: Edge;
let foundPath: boolean;

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
        orientation: Math.random() * 2 * Math.PI,
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
    if (dist < incrementalDist) return { ...random, parent: nearest };
    var vector = { x: random.x - nearest.x, y: random.y - nearest.y };
    var normalized = { x: vector.x / dist, y: vector.y / dist }
    var closerNode: Configuration = { x: nearest.x + normalized.x * incrementalDist, y: nearest.y + normalized.y * incrementalDist, orientation: 0 };
    closerNode.parent = nearest;
    return closerNode;
}

function isInGoalVicinity(goalConf: Configuration, graph: IGraph): boolean {
    const nearest = graph.nodes.map(node => {
        return { node: node, dist: getEuclideanDistance(goalConf, node) }
    }).find(el => el.dist < 5);
    if (!nearest)
        return false
    return true;
}

function connectWithGoalIfClose(goalConf: Configuration, graph: IGraph) {
    if (isInGoalVicinity(goalConf, graph)) {
        const closestNode = selectNearestNode(goalConf, graph);
        let finalEdge = graph.addEdge(closestNode, goalConf);
        goalConf.parent = closestNode;
        drawer.drawEdge(finalEdge);
        return true;
    } 
    return false;
}

function buildRRT(vertices: number, incrementalDist: number, initConf = initConfig, goalConf = goalConfig) {
    var graph: IGraph = new Graph(initConf, goalConf);
    graph.init();
    for (var k = 0; k < vertices; k++) {
        if (utils.shouldCheckGoal(k + 1, vertices) && connectWithGoalIfClose(goalConf, graph)) {
            foundPath = true;
            break;
        }
        randomConfig = selectRandomConfig();
        nearestConfig = selectNearestNode(randomConfig, graph);
        newNode = getNewNode(nearestConfig, randomConfig, incrementalDist);
        graph.addNode(newNode);
        edge = graph.addEdge(nearestConfig, newNode);
        drawer.drawEdge(edge)
    }
    drawer.highlightNode(initConf)
    drawer.highlightNode(goalConf)
    if (foundPath) {
        console.log("Found path")
        drawer.highlightPathTo(goalConf)
    }
    drawer.draw(vertices, incrementalDist);
}

module.exports = { buildRRT: buildRRT }