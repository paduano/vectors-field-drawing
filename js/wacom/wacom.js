var Wacom = function() {
    var self = {};

    self.plugin = null;


    var getPlugin = function(){
        return  document.getElementById('wtPlugin');

    };

    self.getPressure = function(){
        var api = getPlugin().penAPI;
        var pressure = api? api.pressure : 0.5;
        if(pressure){
            return pressure;
        } else  {
            return 0.5;

        }

    };

    return self;
};

var wacom = Wacom();

