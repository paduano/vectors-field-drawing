var InkDrop = function(position, mass, life, size, color) {
    var self = {};

    self.position = position;
    self.mass = mass;
    self.velocity = vec2(0,0);
    self.acceleration = vec2(0,0);
    self.life = life;
    self.size = size;
    self.color = Color(color);
    self.maxLife = life;

    self.getLifePercentage = function(){
        return self.life / self.maxLife;
    };

    self.integrate = function(field, dt) {
        var resultForce = field.computeForce(self.position, self.mass);
        self.acceleration = resultForce.divS(self.mass);
        self.velocity = self.velocity.addV(self.acceleration.mulS(dt));
        self.position = self.position.addV(self.velocity.mulS(dt));

        self.life -= dt;
        if(self.life < 0)
            self.life = 0;


    };


    return self;
};