var InkDrop = function(position, mass, startLife, maxLife, size, color) {
    var self = {};

    self.position = position;
    self.mass = mass;
    self.velocity = vec2(0,0);
    self.acceleration = vec2(0,0);
    self.life = startLife;
    self.size = size;
    self.color = Color(color);
    self.maxLife = maxLife;

    self.getLifePercentage = function(){
        return self.life / self.maxLife;
    };


    self.computeViscosityFriction = function() {
        return self.velocity.mulS(configurationModel.dropViscosity).invert();
    };


    self.integrate = function(field, dt) {
        var resultForce = field.computeForce(self.position, self.mass).addV(self.computeViscosityFriction());
        self.acceleration = resultForce.divS(self.mass);
        self.velocity = self.velocity.addV(self.acceleration.mulS(dt));
        self.position = self.position.addV(self.velocity.mulS(dt));

        var timeShrinking = field.computeTimeShrinking(self.position, self.mass);

        self.life -= dt + self.life*timeShrinking;
        if(self.life < 0)
            self.life = 0;


    };


    return self;
};