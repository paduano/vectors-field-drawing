var DirectionalForce = function(position, direction) {

    var self = {};

    var _position = position,
        _direction = direction;

    var computeForce = function(dropPosition, dropMass){
        var distanceTo2 = dropPosition.lengthSqr(_position);
        if (distanceTo2 < 1.0) {
           distanceTo2 = 1.0
        }
        return _direction.mulS(dropMass/distanceTo2);
    };

    return self;

};