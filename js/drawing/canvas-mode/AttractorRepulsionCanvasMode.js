var AttractorRepulsionCanvasMode = function(canvas,multiplier) {
    var self = {};

    /** Canvas inputs **/
    self.onMouseDown = function(pos) {
        console.log("mouse down " + pos.toArray());
    };

    self.onDragging = function(startPos, currentPos) {
        console.log("dragging from" + startPos.toArray() + " to " + currentPos.toArray());
    };

    self.onDragStart = function(startPos) {
        console.log("dragging start from" + startPos.toArray());
    };

    self.onDragEnd = function(startPos, endPos) {
        console.log("dragging end from" + startPos.toArray() + " to " + endPos.toArray());

        var attractor = Attractor(startPos, multiplier * endPos.subV(startPos).length());
        canvas.field.addForce(attractor);

    };


    return self;

};
