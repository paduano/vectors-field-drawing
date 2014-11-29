var Field = function() {
    var self = {};

    self.forces = [];

    self.computeForce = function(dropPosition, dropMass){
        var resultForce = vec2(0,0);
        for(var i = 0; i < self.forces.length; i++){
            resultForce.addV(resultForce.computeForce(dropPosition, dropMass));
        }
        return resultForce;
    };

    self.addForce = function(force) {
        self.forces.append(force);
    };

    var init = function () {

    }();

    return self;
};