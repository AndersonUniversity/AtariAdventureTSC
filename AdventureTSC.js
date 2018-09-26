/*
 * @author Tyler Cooper
 * 9/25/18
 * Individual Project
 * Atari Adventure
 */

let myGamePiece;
let topBorderWall;
let bottomBorderWall;
let leftBorderWall;
let rightBorderWall;
let door1;
let topBorderWall2;
let bottomBorderWall2;
let leftBorderWall2;
let rightBorderWall2;
let door2;
let key;
let currentRoom;
let castle;
let inventory;
let score;
let myScore;

const screenHeight = 576;
const screenWidth = 1024;
const pieceHeight = 70;
const pieceWidth = 30;
const leftArrow = 37;
const rightArrow = 39;
const upArrow = 38;
const downArrow = 40;
const movementSpeed = 1;
const stoppedSpeed = 0;
const leftWall = 0;
const topWall = 0;
const startX = 492;
const startY = 248;
const interval = 20;
const borderWidth = 15;
const borderHeight = 15;

//startGame() was basically taken from https://www.w3schools.com/graphics/game_intro.asp
function startGame() {
    myGameArea.start();
    myGamePiece = new Component(pieceWidth, pieceHeight, 'blue', startX, startY);
    //room 1
    topBorderWall = new Component(screenWidth, borderHeight, 'red', 0, 0);
    bottomBorderWall = new Component(screenWidth, borderHeight, 'red', 0, myGameArea.canvas.height - borderWidth);
    leftBorderWall = new Component(15, screenHeight, 'red', 0, 0);
    rightBorderWall = new Component(15, screenHeight, 'red', myGameArea.canvas.width - borderWidth, 0);
    door1 = new Component(30, screenHeight/4, 'black', myGameArea.canvas.width - 30, screenHeight/3);
    //room 2
    topBorderWall2 = new Component(screenWidth, borderHeight, 'green', 0, 0);
    bottomBorderWall2 = new Component(screenWidth, borderHeight, 'green', 0, myGameArea.canvas.height - borderWidth);
    leftBorderWall2 = new Component(15, screenHeight, 'green', 0, 0);
    rightBorderWall2 = new Component(15, screenHeight, 'green', myGameArea.canvas.width - borderWidth, 0);
    door2 = new Component(30, screenHeight/4, 'black', 0, screenHeight/3);
    castle = new Component(100, 100, 'purple', 700, 400);
    //key
    key = new Component(15, 15, 'purple', 40, 40);
    //inventory
    inventory = [];
    //score
    myScore = new Component('15px', 'Arial', 'black', 30 , 30, 'text');
}
