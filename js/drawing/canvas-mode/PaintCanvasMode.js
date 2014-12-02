var PaintCanvasMode = function(canvas) {
    var self = {};

    var INKDROP_MASS = 10,
        INKDROP_LIFE = 2000;
        INKDROP_SIZE = 3;

    /** Canvas inputs **/
    self.onMouseDown = function(pos) {
        //console.log("mouse down " + pos.toArray());

    };

    self.onDragging = function(startPos, currentPos) {
        //console.log("dragging from" + startPos.toArray() + " to " + currentPos.toArray());
        var pressure = wacom.getPressure();
        var inkDrop = InkDrop(currentPos, INKDROP_MASS, INKDROP_LIFE * pressure , INKDROP_SIZE * pressure, colorModel.currentColor);
        canvas.inkDrops.push(inkDrop);
    };

    self.onDragStart = function(startPos) {
        //console.log("dragging start from" + startPos.toArray());
    };

    self.onDragEnd = function(startPos, endPos) {
        //console.log("dragging end from" + startPos.toArray() + " to " + endPos.toArray());


    };


    return self;

};
