
const constants = require('../shared/constants')

class Object {
  constructor(x = 0, y = 0, direction = 0, radius = 10, gravity = constants.GRAVITY_V) {
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.direction = direction
    this.radius = radius

    this.previousX = x
    this.previousY = y

    this.gravity = gravity
    this.onGround= false
  }

  collides(object) {
    const dx = Math.abs(object.x - this.x)
    const dy = Math.abs(object.y - this.y)
    const distance = Math.sqrt( dx * dx + dy * dy)
    if (distance <= this.radius + object.radius){
      return true
    }
    return false
  }

  updatePosition(dt) {
    this.previousX = this.x
    this.previousY = this.y

    if(!this.onGround){
      this.vy = this.vy - (dt * this.gravity) 
    }
    this.x += dt * this.vx
    this.y += dt * this.vy
  }
}

module.exports = Object