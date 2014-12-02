var Attractor = function(position, intensity) {

    var self = {};
    self.forceType = intensity >= 0 ? ForceType.ATTRACTOR : ForceType.REPULSOR;
    self.position = position;
    self.intensity = intensity;

    self.computeForce = function(dropPosition, dropMass){
        var distanceTo2 = vec2distanceSqr(dropPosition, self.position);
        if (distanceTo2 < Math.pow(intensity,2)) {
           distanceTo2 = Math.pow(intensity,2)
        }
        var direction = dropPosition.subV(self.position).normalize();

        return direction.mulS( (-intensity * 1/*dropMass*/) /distanceTo2);
    };

    return self;

};