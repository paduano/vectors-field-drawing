var DrawingCanvas = function(canvasElement) {
    var self = {};


    var WIDTH = 800,
        HEIGHT = 600;

    self.field = null;
    self.inkDrops = [];
    self.paintBuffer = null;

    var paintBufferCtx = null;

    var _lastFrameTime = null;

    //canvas context
    var ctx;

    var _mouseDown = false,
        _isDragging = false,
        _dragStartPosition = null,
        DRAG_MIN_DISTANCE = 5;

    //Draw timer interval
    var _drawIntervalTimer,
        DRAW_INTERVAL = 10;

    var _currentMode = null;
    self.mode = CanvasMode.DIRECTIONAL_FORCE;


    /** interactions with the canvas **/
    var onMouseDown = function(evt){
        _mouseDown = true;

        var x = evt.x - canvasElement[0].offsetLeft,
            y = evt.y - canvasElement[0].offsetTop;

        _dragStartPosition = vec2(x,y);

        if(_currentMode) {
            _currentMode.onMouseDown(_dragStartPosition);
        }
    };

    var onMouseMove = function(evt){
        var x = evt.x - canvasElement[0].offsetLeft,
            y = evt.y - canvasElement[0].offsetTop;

        var currentPos = vec2(x, y);

        if(_mouseDown){
            if(!_isDragging && vec2distance(currentPos, _dragStartPosition) >= DRAG_MIN_DISTANCE){
                _isDragging = true;

                if(_currentMode) {
                    _currentMode.onDragStart(_dragStartPosition);
                }
            }
        }

        if(_isDragging) {
            _currentMode.onDragging(_dragStartPosition, currentPos);
        }
    };

    var onMouseUp = function(evt){
        var x = evt.x - canvasElement[0].offsetLeft,
            y = evt.y - canvasElement[0].offsetTop;
        var currentPos = vec2(x, y);

        if(_isDragging) {
            _currentMode.onDragEnd(_dragStartPosition,currentPos);
        }

        _mouseDown = false;
        _isDragging = false;
    };

    var onMouseOut = function(evt){
        var x = evt.x - canvasElement[0].offsetLeft,
            y = evt.y - canvasElement[0].offsetTop;
        var currentPos = vec2(x, y);

        if(_isDragging) {
            _currentMode.onDragEnd(_dragStartPosition,currentPos);
        }

        _mouseDown = false;
        _isDragging = false;
    };


    /** modes **/
    var onCanvasModeChanged = function(){
        var handler = CanvasModeHandlers[canvasModeModel.currentMode.id];
        _currentMode = handler.class(self, handler.params);
    };


    /** draw functions **/

    var drawDirectionalForce = function(force) {
        var tipAngle = 0.6,
            tipLength = 5;


        var destination = force.position.addV(force.direction.mulS(force.intensity));
        drawSegmentedLine([force.position, destination]);

        //arrow tip
        var tipSub1 = force.direction.clone().normalize().rot(tipAngle).mulS(tipLength),
            tipSub2 = force.direction.clone().normalize().rot(-tipAngle).mulS(tipLength);

        var points = [destination.subV(tipSub1),
                      destination,
                      destination.subV(tipSub2)];
        drawSegmentedLine(points);
    };


    var drawAttractor = function(force) {
        var radius = Math.abs(force.intensity),
            strokeWidth = 1.0;
        ctx.beginPath();
        ctx.arc(force.position.x, force.position.y, radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = strokeWidth;
        ctx.stroke();
    };


    var drawInkDrop = function(drop) {
        var radius = 3.0,
            strokeWidth = 1.0;
        ctx.beginPath();
        ctx.strokeStyle = drop.color;
        ctx.arc(drop.position.x, drop.position.y, radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = strokeWidth;
        ctx.stroke();


    };

    var drawSegmentedLine = function(points) {
        if(points.length > 1){
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for(var i = 1; i < points.length; i++){
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.stroke();
        }
    };


    var mixDropColor = function(drop) {
        var currentColorRGB = paintBufferCtx.getImageData(drop.position.x, drop.position.y, 1, 1).data;
        var currentColor = Color([currentColorRGB[0], currentColorRGB[1], currentColorRGB[2]]);

        if(currentColor.toCSS() != '#000000'){
            drop.color = drop.color.blend(currentColor, 0.5);
        }

    };


    var drawDropStroke = function(drop, previousPosition, nextPosition) {

        paintBufferCtx.strokeStyle = "rgba(" + [drop.color.red*255, drop.color.green*255, drop.color.blue*255, drop.getLifePercentage()] + ")";
        paintBufferCtx.lineWidth = drop.size * drop.getLifePercentage();
        paintBufferCtx.beginPath();
        paintBufferCtx.moveTo(previousPosition.x, previousPosition.y);
        paintBufferCtx.lineTo(nextPosition.x, nextPosition.y);

        paintBufferCtx.stroke();
    };


    var drawFieldSymbols = function(){
        //directional forces
        for(var i = 0; i < self.field.forces.length; i++){
            var force = self.field.forces[i];
            switch(force.forceType){
                case(ForceType.DIRECTIONAL_FORCE):
                    drawDirectionalForce(force);
                    break;
                case(ForceType.ATTRACTOR):
                    drawAttractor(force);
                    break;
                case(ForceType.REPULSOR):
                    drawAttractor(force);
                    break;
            }

        }


    };


    var clear = function() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    };


    /**
     *  MAIN DRAW FUNCTION
     */
    var draw = function() {
        var now = new Date();
        if(!_lastFrameTime)
            _lastFrameTime = now.getTime();
        var dt = now.getTime() - _lastFrameTime;

        clear();

        //draw paint buffer
        ctx.drawImage(self.paintBuffer, 0, 0);

        //field symbols
        if(layersModel.fieldLayerVisible){
            drawFieldSymbols();
        }

        //drops
        var deadDrops = [];
        for(var i = 0; i < self.inkDrops.length; i++){
            var drop = self.inkDrops[i];

            if(drop.life > 0) {
                //DRAW CIRCLE
                //drawInkDrop(drop);
                var previousPosition = drop.position;
                drop.integrate(self.field,dt);
                var nextPosition = drop.position;
                //mixDropColor(drop);
                drawDropStroke(drop, previousPosition, nextPosition);
            } else {
                deadDrops.push(drop);
            }

        }

        //remove dead drops
        self.inkDrops = _.without(self.inkDrops, deadDrops);

        _lastFrameTime = now.getTime();
    };

    var init = function() {

        self.field = Field();
        self.paintBuffer = document.createElement('canvas');
        self.paintBuffer.width = WIDTH;
        self.paintBuffer.height = HEIGHT;
        paintBufferCtx = self.paintBuffer.getContext("2d");

        canvasElement.attr("width", WIDTH);
        canvasElement.attr("height", HEIGHT);
        canvasElement.css("border-style", "solid");

        ctx = canvasElement[0].getContext("2d");
        _drawIntervalTimer = window.setInterval(draw, DRAW_INTERVAL);

        canvasElement[0].onmousedown = onMouseDown;
        canvasElement[0].onmousemove = onMouseMove;
        canvasElement[0].onmouseup = onMouseUp;
        canvasElement[0].onmouseout = onMouseOut;

        onCanvasModeChanged();
        notificationCenter.subscribe(Notifications.drawingCanvasMode.MODE_CHANGED, onCanvasModeChanged);
        
    }();

    return self;
};

var CanvasModeHandlers = {};
CanvasModeHandlers[CanvasMode.DIRECTIONAL_FORCE.id] = {class:DirectionalForceCanvasMode, params:null};
CanvasModeHandlers[CanvasMode.PAINT.id] = {class:PaintCanvasMode, params:null};
CanvasModeHandlers[CanvasMode.ATTRACTOR.id] = {class:AttractorRepulsionCanvasMode, params:1};
CanvasModeHandlers[CanvasMode.REPULSOR.id] = {class:AttractorRepulsionCanvasMode, params:-1};

/*
 function getMousePos(canvas, evt) {
 var rect = canvas.getBoundingClientRect();
 return {
 x: evt.clientX - rect.left,
 y: evt.clientY - rect.top
 };
 }
 */