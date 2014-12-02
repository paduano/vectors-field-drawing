var Colors = Colors || {};

Colors.components = {
  //Used for white text
  WHITE_SELECTED: "#FFFFFF",
  //Used when a text is not selected
  GREY_DESELECTED: "#666666"
};

var Color = net.brehaut.Color;

Colors.palette = [
  '#000000',
  '#FFFFFF',
'#27ae60',
'#2980b9',
'#c0392b',
'#3498db',
'#d35400',
'#8e44ad'
];

var ColorModel = function() {

  var self = {};

  var _currentColor = Colors.palette[0];

  self.__defineSetter__("currentColor", function(val){
    _currentColor = val;
    notificationCenter.dispatch(Notifications.colors.SELECTED_COLOR_CHANGED);
  });

  self.__defineGetter__("currentColor", function(){
    return _currentColor;
  });

  var init = function(){

  }();

  return self;
};

var colorModel = ColorModel();