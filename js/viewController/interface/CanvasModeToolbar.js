var CanvasModeToolbar = function(){
    var self = SvgViewController();

    var buttons = [];

    var onCanvasModeChanged = function(){
        buttons.forEach(function(button){
            button.selected = canvasModeModel.currentMode == button.mode;
        });
    };

    var init = function(){
        var buttonWidth = 100/_.values(CanvasMode).length;
        _.values(CanvasMode).forEach(function(mode){
            var button = ButtonViewController(mode.name);
            button.view.width = buttonWidth + '%';
            button.view.x = buttonWidth * mode.id + '%';

            button.selected = canvasModeModel.currentMode == mode;
            button.mode = mode;
            button.onClick(function(){
               canvasModeModel.currentMode = mode;
            });

            buttons.push(button);
            self.view.append(button);

        });

        notificationCenter.subscribe(Notifications.drawingCanvasMode.MODE_CHANGED, onCanvasModeChanged);

    }();


    return self;
};