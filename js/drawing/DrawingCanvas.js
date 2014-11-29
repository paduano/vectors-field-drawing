var DrawingCanvas = function(canvasElement) {
    var self = {};


    var WIDTH = 600,
        HEIGHT = 400;

    //canvas context
    var ctx;

    //Draw timer interval
    var drawIntervalTimer,
        DRAW_INTERVAL = 10;

    var currentMode = null;
    self.mode = CanvasMode.DIRECTIONAL_FORCE;


    /** interactions with the canvas **/
    var onMouseDown = function(evt){
        var x = evt.x - canvasElement[0].offsetLeft,
            y = evt.y - canvasElement[0].offsetTop;
        console.log("mouse down " + [x, y]);

        if(currentMode) {
            currentMode.onMouseDown(x,y);
        }
    };

    var onMouseMove = function(evt){

    };


    /** draw functions **/

    var clear = function() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    };

    var draw = function() {
        clear();
    };

    var init = function() {
        canvasElement.attr("width", WIDTH);
        canvasElement.attr("height", HEIGHT);
        canvasElement.css("border-style", "solid");

        ctx = canvasElement[0].getContext("2d");
        drawIntervalTimer = window.setInterval(draw, DRAW_INTERVAL);

        canvasElement[0].onmousedown = onMouseDown;
        canvasElement[0].onmousemove = onMouseMove;
    }();

    return self;
};

var CanvasMode = {
    DIRECTIONAL_FORCE : "DIRECTIONAL_FORCE"
};