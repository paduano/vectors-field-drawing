var Field = function() {
    var self = {};

    self.forces = [];

    self.computeTimeShrinking = function(dropPosition, dropMass){
        var shrink = 0;
        for(var i = 0; i < self.forces.length; i++){
            var force = self.forces[i];
            if(force.forceType === ForceType.ATTRACTOR){
                var distance = force.position.subV(dropPosition).length();
                if(distance < force.intensity){
                    shrink += Math.pow(1 - (distance/force.intensity), 2);
                }
            }
        }

        return shrink;
    };


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