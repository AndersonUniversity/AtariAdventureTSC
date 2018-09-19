let myGamePiece;

function startGame() {
    myGameArea.start();
    myGamePiece = new Component(30, 70, "blue", 50, 50);
}

//define the canvas
let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        //setting dimenstions of canvas
        this.canvas.width = 1024;
        this.canvas.height = 576;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //how many times per second to redraw the screen
        this.interval = setInterval(updateGameArea, 20);
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
    this.speedX = 0;
    this.speedY = 0;
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
    if(myGameArea.key && myGameArea.key === 37) {
        moveLeft();
    }
    else if(myGameArea.key && myGameArea.key === 39) {
        moveRight();
    }
    else if(myGameArea.key && myGameArea.key === 38) {
        moveUp();
    }
    else if(myGameArea.key && myGameArea.key === 40) {
        moveDown();
    }
    else {
        stopMovement();
    }
}

//functions that dictate player movement
function moveUp() {
    myGamePiece.speedY -= 1;
}

function moveDown() {
    myGamePiece.speedY += 1;
}

function moveLeft() {
    myGamePiece.speedX -= 1;
}

function moveRight() {
    myGamePiece.speedX += 1;
}

function stopMovement() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}