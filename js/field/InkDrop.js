var InkDrop = function(position, mass) {
    var self = {};

    self.position = position;
    self.mass = mass;
    self.velocity = 0.0;
    self.acceleration = 0.0;

    self.integrate = function(field, dt) {
        var resultForce = field.computeForce(self.position, self.mass);
        self.acceleration = resultForce.divS(self.mass);
        self.velocity = self.velocity.addV(self.acceleration.mulS(dt));
        self.position = self.position.addV(self.velocity.mulS(dt));
    };


    return self;
};