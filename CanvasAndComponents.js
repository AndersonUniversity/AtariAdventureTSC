/**setting up the game canvas
 * this code was taken from https://www.w3schools.com/graphics/game_int
 * this function defines the canvas as well as defining frames for counting purposes
 * as well as defining listening to the keyboard so that the arrow keys can be used to control the player
 * this also defines how to clear the canvas and how to stop the game
 * @type {{canvas: HTMLElement, start: myGameArea.start, clear: myGameArea.clear, stop: myGameArea.stop}}
 */
let myGameArea = {
    canvas : document.createElement('canvas'),
    start : function() {
        //setting dimensions of canvas
        currentRoom = 0; //current room is room 1
        this.canvas.width = screenWidth;
        this.canvas.height = screenHeight;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
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

/**creating attributes for all components whether they end up getting used or not
 * this code was taken from https://www.w3schools.com/graphics/game_intro.asp
 * @param width
 * @param height
 * @param color
 * @param x
 * @param y
 * @param type
 * @constructor
 */
function Component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = stoppedSpeed;
    this.speedY = stoppedSpeed;
    this.x = x;
    this.y = y;
    //how to update component attributes
    this.update = function(){
        ctx = myGameArea.context;
        if (this.type === 'text') {
            ctx.font = this.width + ' ' + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    //calculating the players new position
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    //collision detection function to see if player collided with another component
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
