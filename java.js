const startBtn = document.getElementById('startBtn');
const maze = document.getElementById('maze');
const scoreText = document.querySelector('.score');
const messageBox = document.getElementById('messageBox');
const livesBox = document.querySelector('.lives');

let score = 0;
let lives = 3;
let playerPos = { x: 1, y: 1 };
let gameStarted = false;
let enemies = [];
let enemyInterval;

const directions = ['up', 'down', 'left', 'right'];

const map = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,2,0,1,0,0,0,0,3,1],
    [1,0,0,0,0,0,0,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,1,1],
    [1,0,0,1,0,3,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,1],
    [1,3,1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];
