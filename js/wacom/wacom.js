var Wacom = function() {
    var self = {};

    self.plugin = null;


    var getPlugin = function(){
        return  document.getElementById('wtPlugin');

    };

    self.getPressure = function(){
        var pressure = getPlugin().penAPI.pressure;
        if(pressure){
            return pressure;
        } else  {
            return 0.5;

        }

    };

    return self;
};

var wacom = Wacom();

