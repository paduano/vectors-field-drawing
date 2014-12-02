var Field = function() {
    var self = {};

    self.forces = [];

    self.computeForce = function(dropPosition, dropMass){
        var resultForce = vec2(0,0);
        for(var i = 0; i < self.forces.length; i++){
            resultForce = resultForce.addV(self.forces[i].computeForce(dropPosition, dropMass));
        }
        return resultForce;
    };

    self.addForce = function(force) {
        self.forces.push(force);
    };

    var init = function () {

    }();

    return self;
};

var ForceType = {
    DIRECTIONAL_FORCE : "DIRECTIONAL_FORCE",
    ATTRACTOR : "ATTRACTOR",
    REPULSOR : "REPULSOR"

};