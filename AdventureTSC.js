let myGamePiece;

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


function startGame() {
    myGameArea.start();
    myGamePiece = new Component(pieceWidth, pieceHeight, "blue", startX, startY);
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

}

//updating the screen so that the game is playable
function updateGameArea() {
    myGameArea.clear();
    decideMove();
    myGamePiece.newPos();
    myGamePiece.update();
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
    if(myGamePiece.x < leftWall) {
        stopMovement();
        myGamePiece.x = leftWall;
    }
    if(myGamePiece.y < topWall) {
        stopMovement();
        myGamePiece.y = topWall;
    }
    if(myGamePiece.x > myGameArea.canvas.width - pieceWidth) {
        stopMovement();
        myGamePiece.x = myGameArea.canvas.width - pieceWidth;
    }
    if(myGamePiece.y > myGameArea.canvas.height - pieceHeight) {
        stopMovement();
        myGamePiece.y = myGameArea.canvas.height - pieceHeight;
    }
}
