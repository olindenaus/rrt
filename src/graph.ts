export interface Configuration {
    x: number,
    y: number,
    orientation: number
    parent?: Configuration
}

export interface Edge {
    from: Configuration,
    to: Configuration
}

const createEdge = (from: Configuration, to:Configuration): Edge =>{
    return {from: from, to: to}}

export interface IGraph {
    initConfig: Configuration,
    nodes: Configuration[],
    edges: Edge[],
    addEdge(from: Configuration, to: Configuration): Edge;
    addNode(node: Configuration): void;
    init(): void;
}

module.exports = class Graph implements IGraph {
    initConfig: Configuration;
    nodes: Configuration[];
    edges: Edge[]
    constructor(init: Configuration) {
        this.initConfig = init;
        this.nodes = [];
        this.edges = [];
    }

    init() {
        this.nodes.push(this.initConfig);
    }

    addNode(newNode: Configuration) {
        this.nodes.push(newNode);
    }

    addEdge(from: Configuration, to: Configuration) {
        const edge = createEdge(from, to);
        this.edges.push();
        return edge;
    }
}