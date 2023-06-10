
class Object {
  constructor(x = 0, y = 0, speed = 0, direction = 0) {
    this.x = x
    this.y = y
    this.speed = speed
    this.direction = direction
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
  }

  setDirection(direction) {
    this.direction = direction
  }

  updatePosition(dt) {
    this.x += dt * this.speed * Math.sin(this.direction * Math.PI / 180)
    this.y -= dt * this.speed * Math.cos(this.direction * Math.PI / 180)
  }

  updateVelocity(dt) {
    this.speed += dt * this.acceleration
  }
}

module.exports = Object