var DirectionalForce = function(position, direction, intensity) {

    var self = {};
    self.forceType = ForceType.DIRECTIONAL_FORCE;
    self.position = position;
    self.direction = direction;
    self.intensity = intensity;

    self.computeForce = function(dropPosition, dropMass){
        var distanceTo2 = vec2distanceSqr(dropPosition, self.position);
        if (distanceTo2 < Math.pow(self.intensity, 2)) {
           distanceTo2 = Math.pow(self.intensity, 2);
        }
        return self.direction.mulS(/*dropMass*/self.intensity/distanceTo2);
    };

    return self;

};