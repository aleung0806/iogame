class Object {
  constructor(id, x, y, v , direction) {
    this.id = id
    this.x = x
    this.y = y
    this.v = v
    this.direction = direction
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
  }

  setDirection(direction) {
    this.direction = direction
    console.log('direction set')
  }

  setVelocity(velocity) {
    this.velocity = velocity
  }

  updatePlayerPo(p) {
    p.x += dt * constants.PLAYER_SPEED * Math.sin(p.direction)
    p.y -= dt * constants.PLAYER_SPEED * Math.cos(p.direction)
    console.log(p)
  }

  serializeObject() {
    return {
      x: this.x,
      y: this.y,
      direction: this.direction
    }
  }

}

module.exports = Object