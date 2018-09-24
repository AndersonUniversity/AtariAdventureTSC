let myGamePiece;
let topBorderWall;
let bottomBorderWall;
let leftBorderWall;
let rightBorderWall;
let door1;

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
const startX = 50;
const startY = 250;
const interval = 20;
const borderWidth = 15;


function startGame() {
    myGameArea.start();
    myGamePiece = new Component(pieceWidth, pieceHeight, "blue", startX, startY);
    topBorderWall = new Component(screenWidth, 15, "red", 0, 0);
    bottomBorderWall = new Component(screenWidth, 15, "red", 0, myGameArea.canvas.height - 15);
    leftBorderWall = new Component(15, screenHeight, "red", 0, 0);
    rightBorderWall = new Component(15, screenHeight, "red", myGameArea.canvas.width - 15, 0);
    door1 = new Component(30, screenHeight/4, "green", myGameArea.canvas.width - 30, screenHeight/3)
}

//define the canvas
let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        //setting dimensions of canvas
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //how many times per second to redraw the screen
        this.interval = setInterval(updateGameArea, interval);
        //listening to keyboard
        window.addEventListener('keydown', function(e) {myGameArea.key = e.keyCode;})
        window.addEventListener('keyup', function(e) {myGameArea.key = false;})
    },
    //reset the canvas
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    //stop the game
    stop : function() {
        clearInterval(this.interval);
    }
}

//creating attributes for all components, aka the player
function Component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = stoppedSpeed;
    this.speedY = stoppedSpeed;
    this.x = x;
    this.y = y;
    //how to update component attributes
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
        //players edges
        let playerLeft = this.x;
        let playerRight = this.x + (this.width);
        let playerTop = this.y;
        let playerBottom = this.y + (this.height);
        //other objects edges
        let otherLeft = otherobj.x;
        let otherRight = otherobj.x + (otherobj.width);
        let otherTop = otherobj.y;
        let otherBottom = otherobj.y + (otherobj.height);
        let crash = true;
        if((playerBottom < otherTop) ||
            (playerTop > otherBottom) ||
            (playerRight < otherLeft) ||
            (playerLeft > otherRight)) {
            crash = false;
        }
        return crash;
    }

}

//updating the screen so that the game is playable
function updateGameArea() {
    //if a player collided with a border wall set them back onto the canvas
    if(myGamePiece.crashWith(topBorderWall) ||
        (myGamePiece.crashWith(bottomBorderWall)) ||
        (myGamePiece.crashWith(leftBorderWall)) ||
        (myGamePiece.crashWith(rightBorderWall))) {
        myGameArea.clear();
        topBorderWall.update();
        bottomBorderWall.update();
        leftBorderWall.update();
        rightBorderWall.update();
        decideMove();
        door1.update();
        myGamePiece.newPos();
        myGamePiece.update();
    }

    //player has not collided with a border wall
    else {
        myGameArea.clear();
        topBorderWall.update();
        bottomBorderWall.update();
        leftBorderWall.update();
        rightBorderWall.update();
        door1.update();
        decideMove();
        myGamePiece.newPos();
        myGamePiece.update();
    }

}

//moving the player based on the arrow key that is pressed
function decideMove() {
    if(myGameArea.key && myGameArea.key === leftArrow) {
        moveLeft();
    }
    else if(myGameArea.key && myGameArea.key === rightArrow) {
        moveRight();
    }
    else if(myGameArea.key && myGameArea.key === upArrow) {
        moveUp();
    }
    else if(myGameArea.key && myGameArea.key === downArrow) {
        moveDown();
    }
    else {
        stopMovement();
    }
}

//functions that dictate player movement
function moveUp() {
    myGamePiece.speedY -= movementSpeed;
    restrictPlayer();
}

function moveDown() {
    myGamePiece.speedY += movementSpeed;
    restrictPlayer();
}

function moveLeft() {
    myGamePiece.speedX -= movementSpeed;
    restrictPlayer();
}

function moveRight() {
    myGamePiece.speedX += movementSpeed;
    restrictPlayer();
}

function stopMovement() {
    myGamePiece.speedX = stoppedSpeed;
    myGamePiece.speedY = stoppedSpeed;
}

//make sure player does not move off the screen
function restrictPlayer() {
    if(myGamePiece.x < (leftWall + borderWidth)) {
        stopMovement();
        myGamePiece.x = (leftWall + borderWidth);
    }
    if(myGamePiece.y < (topWall + borderWidth)) {
        stopMovement();
        myGamePiece.y = (topWall + borderWidth);
    }
    if(myGamePiece.x > (myGameArea.canvas.width - pieceWidth) - borderWidth) {
        stopMovement();
        myGamePiece.x = (myGameArea.canvas.width - pieceWidth) - borderWidth;
    }
    if(myGamePiece.y > (myGameArea.canvas.height - pieceHeight) - borderWidth) {
        stopMovement();
        myGamePiece.y = (myGameArea.canvas.height - pieceHeight) - borderWidth;
    }
}
