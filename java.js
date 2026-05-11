function drawMaze() {
    maze.innerHTML = '';
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            const tile = document.createElement('div');
            tile.className = 'tile';

            if (map[y][x] === 1) {
                tile.classList.add('wall');
            } else if (map[y][x] === 0) {
                const point = document.createElement('div');
                point.className = 'point';
                tile.appendChild(point);
            } else if (map[y][x] === 2) {
                tile.id = 'player';
            } else if (map[y][x] === 3) {
                tile.classList.add('enemy');
            }

            maze.appendChild(tile);
        }
    }
}

function updateScore() {
    scoreText.textContent = 'Score: ' + score;
}

function showLives() {
    livesBox.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement('span');
        heart.className = 'life';
        livesBox.appendChild(heart);
    }
}

function movePlayer(e) {
    if (!gameStarted) return;

    let { x, y } = playerPos;
    let newX = x;
    let newY = y;

    if (e.key === 'ArrowUp') newY--;
    if (e.key === 'ArrowDown') newY++;
    if (e.key === 'ArrowLeft') newX--;
    if (e.key === 'ArrowRight') newX++;

    if (map[newY][newX] === 1) return;

    if (map[newY][newX] === 3) {
        loseLife();
        return;
    }

    if (map[newY][newX] === 0) {
        score++;
        map[newY][newX] = -1; 
        updateScore();
    }

    map[y][x] = -1; 
    map[newY][newX] = 2;
    playerPos = { x: newX, y: newY };

    drawMaze();

    if (!map.flat().includes(0)) {
        endGame("You win! All points collected!");
    }
}

function loseLife() {
    lives--;
    showLives();

    if (lives <= 0) {
        endGame('You lost all lives!');
    } else {
        messageBox.textContent = 'You got hit! ' + lives + ' lives left.';
    }
}

function endGame(msg) {
    gameStarted = false;
    clearInterval(enemyInterval);
    messageBox.textContent = msg;
    startBtn.style.display = 'inline-block';
}

function resetEnemies() {
    enemies = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 3) {
                enemies.push({ x, y, dir: directions[Math.floor(Math.random() * directions.length)] });
            }
        }
    }
}

function moveEnemies() {
    enemies.forEach(enemy => {
        let { x, y, dir } = enemy;
        let newX = x;
        let newY = y;

        if (dir === 'up') newY--;
        if (dir === 'down') newY++;
        if (dir === 'left') newX--;
        if (dir === 'right') newX++;

        if (map[newY][newX] === 0 || map[newY][newX] === 2 || map[newY][newX] === -1) {
            if (map[newY][newX] === 2) {
                loseLife();
            }
            map[y][x] = -1;
            map[newY][newX] = 3;
            enemy.x = newX;
            enemy.y = newY;
        } else {
            enemy.dir = directions[Math.floor(Math.random() * directions.length)];
        }
    });

    drawMaze();
}

startBtn.addEventListener('click', () => {
    score = 0;
    lives = 3;
    gameStarted = true;
    messageBox.textContent = '';
    updateScore();
    showLives();
    resetEnemies();
    drawMaze();
    startBtn.style.display = 'none';

    clearInterval(enemyInterval);
    enemyInterval = setInterval(moveEnemies, 500);
});

document.addEventListener('keydown', movePlayer);

drawMaze();
startBtn.style.display = 'inline-block';
