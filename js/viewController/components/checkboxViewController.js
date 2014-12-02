var CheckboxViewController = function() {
    var self = ExternalSvgViewController("resource/view/checkbox.svg");

    var _selected;

    self.__defineGetter__("selected", function(){
       return _selected;
    });

    self.__defineSetter__("selected", function(selected){
        _selected = selected;
        if(selected ){
            self.view.tick.show();
            self.view.dot.hide();
        } else {
            self.view.tick.hide();
            self.view.dot.hide();
        }
    });


    self.onClick = function(callback) {
        self.view.onClick(callback);
    };


    var init = function () {
        self.view.classed("checkbox-view-controller", true);
        self.view.classed("clickable-item", true);

        self.selected = true;
    }();

    return self;
};