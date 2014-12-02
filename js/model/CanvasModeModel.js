var CanvasModeModel = function(){
    var self = {};

    var _currentMode = CanvasMode.DIRECTIONAL_FORCE;

    self.__defineSetter__("currentMode", function(val){
        _currentMode = val;
        notificationCenter.dispatch(Notifications.drawingCanvasMode.MODE_CHANGED);
    });


    self.__defineGetter__("currentMode", function(){
       return _currentMode;
    });

    var init = function() {

    }();

    return self;
};

var CanvasMode = {
    DIRECTIONAL_FORCE : {id: 0, name: "force"},
    ATTRACTOR : {id: 1, name: "attractor"},
    REPULSOR : {id: 2, name: "repulsor"},
    PAINT : {id: 3, name: "paint"}
};

var canvasModeModel = CanvasModeModel();