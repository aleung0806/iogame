
class Object {
  constructor(x = 0, y = 0, direction = 0, radius = 10) {
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.direction = direction
    this.radius = radius
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
  }

  setDirection(direction) {
    this.direction = direction
  }

  updatePosition(dt) {
    this.x += dt * this.vx
    this.y -= dt * this.vy
  }

}

module.exports = Object