const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
const cols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

let startCell;
let finishCell;
let currentCell;
let paintedFrames = 0;
let interval;
let paintedCells = [];
let availableNeighbors = {};
let undos = 0;

function generateMap() {
    // Clear previous map
    document.getElementById('board').innerHTML = '';

    // Initialize cells
    for (let row of rows) {
        for (let col of cols) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = col + row;
            cell.textContent = ''; // Empty inside
            document.getElementById('board').appendChild(cell);
        }
    }

    // Randomly choose start and finish cells from edges
    const edgeCells = getEdgeCells();

    startCell = getRandomEdgeCell(edgeCells);
    edgeCells.splice(edgeCells.indexOf(startCell), 1);  // Remove startCell from the available edges

    finishCell = getRandomEdgeCell(edgeCells);

    document.getElementById(startCell).classList.add('start');
    document.getElementById(startCell).textContent = 'S';

    document.getElementById(finishCell).classList.add('finish');
    document.getElementById(finishCell).textContent = 'F';

    currentCell = startCell;
    paintedFrames = 0;
    undos = 0;
    paintedCells = [startCell];
    updateIndicator();

    // Start painting path
    interval = setInterval(paintNextFrame, 200);
}

function getRandomEdgeCell(edges) {
    return edges[Math.floor(Math.random() * edges.length)];
}

function paintNextFrame() {
    const neighbors = getNeighbors(currentCell);
    const unpaintedNeighbors = neighbors.filter(cell => !paintedCells.includes(cell));

    if (unpaintedNeighbors.length > 0) {
        // Shuffle the array to introduce randomness
        shuffleArray(unpaintedNeighbors);

        const nextCell = selectNextCell(unpaintedNeighbors);

        document.getElementById(nextCell).classList.add('path');
        currentCell = nextCell;
        paintedFrames++;
        paintedCells.push(nextCell);
        updateIndicator();

        if (currentCell === finishCell || isNeighborOfFinish(currentCell)) {
            clearInterval(interval);
        }
    } else {
        // Backtrack if no unpainted neighbors
        undos++;
        backtrack();
    }
}

function selectNextCell(neighbors) {
    const paintedNeighbor = neighbors.find(cell => isNeighborPainted(cell));
    return paintedNeighbor || neighbors[Math.floor(Math.random() * neighbors.length)];
}

function isNeighborPainted(cell) {
    return getNeighbors(cell).some(neighbor => paintedCells.includes(neighbor));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function backtrack() {
    let undoSteps = undos;
    while (undoSteps > 0 && paintedCells.length > 1) {
        const lastCell = paintedCells.pop();
        document.getElementById(lastCell).classList.remove('path');
        paintedFrames--;
        undoSteps--;
    }

    if (undos < paintedCells.length) {
        currentCell = paintedCells[paintedCells.length - 1];
    } else {
        undos = 0;
        currentCell = startCell;
    }

    updateIndicator();
}

function getNeighbors(cell) {
    const [col, row] = cell.split('');
    const neighbors = [];

    if (cols.includes(col) && rows.includes(row)) {
        if (cols.includes(String.fromCharCode(col.charCodeAt(0) - 1))) neighbors.push(String.fromCharCode(col.charCodeAt(0) - 1) + row);
        if (cols.includes(String.fromCharCode(col.charCodeAt(0) + 1))) neighbors.push(String.fromCharCode(col.charCodeAt(0) + 1) + row);
        if (rows.includes(String.fromCharCode(row.charCodeAt(0) - 1))) neighbors.push(col + String.fromCharCode(row.charCodeAt(0) - 1));
        if (rows.includes(String.fromCharCode(row.charCodeAt(0) + 1))) neighbors.push(col + String.fromCharCode(row.charCodeAt(0) + 1));
    }

    availableNeighbors[cell] = neighbors;
    return neighbors;
}

function isNeighborOfFinish(cell) {
    return availableNeighbors[finishCell].includes(cell);
}

function updateIndicator() {
    document.getElementById('count').textContent = paintedFrames;
    document.getElementById('undos').textContent = undos;
}

function getEdgeCells() {
    const edgeCells = [];

    // Top and bottom edges
    for (let col of cols) {
        edgeCells.push(col + '1');
        edgeCells.push(col + '8');
    }

    // Left and right edges
    for (let row of rows) {
        edgeCells.push('A' + row);
        edgeCells.push('H' + row);
    }

    return edgeCells;
}