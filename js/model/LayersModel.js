var LayersModel = function(){
    var self = {};

    var _fieldLayerVisible = true;

    self.__defineSetter__("fieldLayerVisible", function(val){
        _fieldLayerVisible = val;
        notificationCenter.dispatch(Notifications.layers.VISIBLE_LAYERS_CHANGED);
    });


    self.__defineGetter__("fieldLayerVisible", function(){
       return _fieldLayerVisible;
    });

    var init = function() {

    }();

    return self;
};

var layersModel = LayersModel();