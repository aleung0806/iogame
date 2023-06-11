
const constants = require('../shared/constants')

class Object {
  constructor(x = 0, y = 0, direction = 0, radius = 10, gravity = constants.GRAVITY_V) {
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.direction = direction
    this.radius = radius

    this.gravity = gravity
    this.onGround= false
  }

  updatePosition(dt) {
    if(!this.onGround){
      this.vy = this.vy - (dt * this.gravity) 
    }
    this.x += dt * this.vx
    this.y += dt * this.vy
  }
}

module.exports = Object