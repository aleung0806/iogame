const Object = require('./object')
const constants = require('../shared/constants')
const { JUMP_V } = require('../shared/constants')

class Player extends Object{
  constructor(username = '') {
    super()
    this.username = username
    this.health = 0
    this.lastFired = 0

    // this.x = Math.random() * constants.MAP_SIZE - (constants.MAP_SIZE / 2)
    // this.y = Math.random() * constants.MAP_SIZE - (constants.MAP_SIZE / 2)
    this.x = 0
    this.y = 300

    this.spaceKey = false

  }

  jump() {
    this.vy += 2000
  }

  updateRules() {
    if (this.vy < 0){
      this.gravity = gravity * 2
    }else if( this.vy > 0 && this.spaceKey){
      this.gravity = gravity * 1.5
    }
  }

  serialize() {
    return {
      username: this.username,
      x: this.x,
      y: this.y,
      direction: this.direction,
      health: this.health
    }
  }
}

module.exports = Player