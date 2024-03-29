var DirectionalForceCanvasMode = function(canvas) {
    var self = {};

    /** Canvas inputs **/
    self.onMouseDown = function(pos) {
        //console.log("mouse down " + pos.toArray());
    };

    self.onDragging = function(startPos, currentPos) {
        //console.log("dragging from" + startPos.toArray() + " to " + currentPos.toArray());
    };

    self.onDragStart = function(startPos) {
        //console.log("dragging start from" + startPos.toArray());
    };

    self.onDragEnd = function(startPos, endPos) {
        //console.log("dragging end from" + startPos.toArray() + " to " + endPos.toArray());
        var diff = endPos.subV(startPos);
        var force = DirectionalForce(startPos, diff.clone().normalize(), diff.length());
        canvas.field.addForce(force);
    };


    return self;

};
