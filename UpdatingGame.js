/**
 * updating the screen so that the game is playable
 * idea taken from https://www.w3schools.com/graphics/game_intro.asp but modified for my logic and components
 */
function updateGameArea() {
    //if we are currently in the first room, draw all the components that correspond to the first room
    if(currentRoom === 0) {
        myGameArea.clear();
        topBorderWall.update();
        bottomBorderWall.update();
        leftBorderWall.update();
        rightBorderWall.update();
        door1.update();
        //if we hit the first door, take us to the second room
        if(myGamePiece.crashWith(door1)) {
            //setting the current room to the second room
            currentRoom = 1;
            //function that decides where the player will start when they go through a door
            decidePlayerStartPos();
        }
        //if we hit the key, add it to our inventory and stop drawing it
        if(myGamePiece.crashWith(key)) {
            inventory.push('key');
        }
        //only draw the key if it is not in our inventory
        if(inventory[0] !== ('key')) {
            key.update();
        }
    }
    //if we are in the second room, draw the components that correspond to the second room
    else if(currentRoom === 1) {
        myGameArea.clear();
        topBorderWall2.update();
        bottomBorderWall2.update();
        leftBorderWall2.update();
        rightBorderWall2.update();
        door2.update();
        castle.update();
        //if we hit the second door, take us to the first room
        if(myGamePiece.crashWith(door2)) {
            //setting the current room to the first room
            currentRoom = 0;
            //function that decides where the player will start when they go through a door
            decidePlayerStartPos();
        }
        //if we hit the castle and the key is in our inventory, end the game
        if(myGamePiece.crashWith(castle) && (inventory[0] === 'key')) {
            alert('Game Over!');
            myGameArea.stop();
        }

    }
    //our score is based on a designated time to complete minus the number of frames that have passed
    myGameArea.frameNo += 1;
    score = (timeToComplete - myGameArea.frameNo);
    myScore.text = 'Score: ' + score;
    myScore.update();
    //if we run out of time, end the game
    if(score === 0) {
        myGameArea.stop();
        alert('You ran out of time!\n Game Over!');
    }
    //move the player
    decideMove();
    myGamePiece.newPos();
    myGamePiece.update();

}
