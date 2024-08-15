const gridContainer = document.getElementById('grid-container');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

let grid = [];
let score = 0;

function initializeGame() {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    score = 0;
    updateGrid();
    addRandomNumber();
    addRandomNumber();
}

function addRandomNumber() {
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] === 0) {
                emptyCells.push({ r, c });
            }
        }
    }
    if (emptyCells.length) {
        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateGrid() {
    gridContainer.innerHTML = '';
    grid.forEach(row => {
        row.forEach(value => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-value', value);
            cell.textContent = value !== 0 ? value : '';
            gridContainer.appendChild(cell);
        });
    });
    scoreDisplay.textContent = score;
}

function move(direction) {
    let moved = false;
    if (direction === 'left') {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 3; c++) {
                if (grid[r][c] === 0 && grid[r][c + 1] !== 0) {
                    grid[r][c] = grid[r][c + 1];
                    grid[r][c + 1] = 0;
                    moved = true;
                } else if (grid[r][c] === grid[r][c + 1] && grid[r][c] !== 0) {
                    grid[r][c] *= 2;
                    score += grid[r][c];
                    grid[r][c + 1] = 0;
                    moved = true;
                }
            }
        }
    } else if (direction === 'right') {
        for (let r = 0; r < 4; r++) {
            for (let c = 3; c > 0; c--) {
                if (grid[r][c] === 0 && grid[r][c - 1] !== 0) {
                    grid[r][c] = grid[r][c - 1];
                    grid[r][c - 1] = 0;
                    moved = true;
                } else if (grid[r][c] === grid[r][c - 1] && grid[r][c] !== 0) {
                    grid[r][c] *= 2;
                    score += grid[r][c];
                    grid[r][c - 1] = 0;
                    moved = true;
                }
            }
        }
    } else if (direction === 'up') {
        for (let c = 0; c < 4; c++) {
            for (let r = 0; r < 3; r++) {
                if (grid[r][c] === 0 && grid[r + 1][c] !== 0) {
                    grid[r][c] = grid[r + 1][c];
                    grid[r + 1][c] = 0;
                    moved = true;
                } else if (grid[r][c] === grid[r + 1][c] && grid[r][c] !== 0) {
                    grid[r][c] *= 2;
                    score += grid[r][c];
                    grid[r + 1][c] = 0;
                    moved = true;
                }
            }
        }
    } else if (direction === 'down') {
        for (let c = 0; c < 4; c++) {
            for (let r = 3; r > 0; r--) {
                if (grid[r][c] === 0 && grid[r - 1][c] !== 0) {
                    grid[r][c] = grid[r - 1][c];
                    grid[r - 1][c] = 0;
                    moved = true;
                } else if (grid[r][c] === grid[r - 1][c] && grid[r][c] !== 0) {
                    grid[r][c] *= 2;
                    score += grid[r][c];
                    grid[r - 1][c] = 0;
                    moved = true;
                }
            }
        }
    }

    if (moved) {
        addRandomNumber();
        updateGrid();
        if (isGameOver()) {
            alert("Game Over! Your score: " + score);
        }
    }
}

function isGameOver() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] === 0) return false;
            if (c < 3 && grid[r][c] === grid[r][c + 1]) return false;
            if (r < 3 && grid[r][c] === grid[r + 1][c]) return false;
        }
    }
    return true;
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
    }
});

restartButton.addEventListener('click', initializeGame);

initializeGame();