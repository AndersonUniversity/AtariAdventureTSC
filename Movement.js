/**
 * logic for moving the player based on the arrow key that is pressed
 */

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

/**
 * functions that dictates player movement
 */
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

/**
 * collision detection making sure that the player does not cross the border and if so, put them back onto the canvas
 * play area
 */
function restrictPlayer() {
    //if hit left border
    if(myGamePiece.x < (leftWall + borderWidth)) {
        stopMovement();
        myGamePiece.x = (leftWall + borderWidth);
    }
    //if hit top border
    if(myGamePiece.y < (topWall + borderWidth)) {
        stopMovement();
        myGamePiece.y = (topWall + borderWidth);
    }
    //if hit right border
    if(myGamePiece.x > (myGameArea.canvas.width - pieceWidth) - borderWidth) {
        stopMovement();
        myGamePiece.x = (myGameArea.canvas.width - pieceWidth) - borderWidth;
    }
    //if hit bottom border
    if(myGamePiece.y > (myGameArea.canvas.height - pieceHeight) - borderWidth) {
        stopMovement();
        myGamePiece.y = (myGameArea.canvas.height - pieceHeight) - borderWidth;
    }
}

/**
 * super weird math to get player to go through doors correctly so that the player
 *does not get stuck in a never ending loop of going through doors
 */
function decidePlayerStartPos() {
    if(currentRoom === 0) {
        myGamePiece.x = myGameArea.canvas.width - (2 * door2.width + 1);
        myGamePiece.y = myGameArea.canvas.height/2 - myGamePiece.height;
    }
    else if(currentRoom === 1) {
        myGamePiece.x = door1.width + 1;
        myGamePiece.y = myGameArea.canvas.height/2 - myGamePiece.height;
    }
}
