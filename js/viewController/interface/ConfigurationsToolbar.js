var ConfigurationsToolbar = function(){
    var self = SvgViewController();

    var _visibleFieldCheckbox;
    var _colorPaletteGroup,
        _colorPaletteCircles = [];

    var onVisibleLayersChanged = function(){
        _visibleFieldCheckbox.selected = layersModel.fieldLayerVisible;
    };

    var onColorSelectedChanged = function(){
        _colorPaletteCircles.forEach(function(circle){
            circle.attr('stroke-width', circle.color == colorModel.currentColor?2 : 1)
                .attr('stroke', circle.color == colorModel.currentColor? 'black' : Colors.components.GREY_DESELECTED);
        });
    };

    var init = function(){
        self.view.height = 400;

        _visibleFieldCheckbox = CheckboxViewController();
        self.view.append(_visibleFieldCheckbox);
        _visibleFieldCheckbox.view.width = 120;
        _visibleFieldCheckbox.view.height = 20;
        _visibleFieldCheckbox.view.x = 10;
        _visibleFieldCheckbox.view.y = 20;
        _visibleFieldCheckbox.view.selectAll("path").style("fill", "#000000");

        var visibleCheckboxTitle = _visibleFieldCheckbox.view.append('text')
            .text("Show Field")
            .attr('dx', 35)
            .attr('dy', 20);

        _visibleFieldCheckbox.selected = layersModel.fieldLayerVisible;

        _visibleFieldCheckbox.onClick(function(){
            layersModel.fieldLayerVisible = !layersModel.fieldLayerVisible;
        });


        //COLOR PALETTE
        _colorPaletteGroup = UIGView(self.view.append('g'));
        _colorPaletteGroup.attr('transform','translate(0,70)');
        for(var i = 0; i < Colors.palette.length; i++){
            var color = Colors.palette[i];
            var dummy = function(color){
            var circle = _colorPaletteGroup.append('circle')
                .attr('cx', 20)
                .attr('cy', i * 20)
                .attr('r', 8)
                .attr('fill', color)
                .attr('stroke', color == colorModel.currentColor? 'black' : Colors.components.GREY_DESELECTED)
                .attr('stroke-width', color == colorModel.currentColor? 2 : 1)
                .on('click', function(){colorModel.currentColor = color});
            circle.color = color;
            _colorPaletteCircles.push(circle);
            }(color);
        }

        notificationCenter.subscribe(Notifications.layers.VISIBLE_LAYERS_CHANGED, onVisibleLayersChanged);
        notificationCenter.subscribe(Notifications.colors.SELECTED_COLOR_CHANGED, onColorSelectedChanged);
    }();


    return self;
};