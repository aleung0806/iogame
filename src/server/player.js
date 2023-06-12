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

    this.inJump = false
  }

  jump() {
    if (!this.inJump && this.onGround){
      this.vy += 1000
      this.inJump = true
    }
  }

  endJump() {
    this.inJump = false
  }

  moveLeft() {
    this.vx -= constants.MOVEMENT_V
    if (this.vx < -constants.MOVEMENT_MAX_V){
      this.vx = -constants.MOVEMENT_MAX_V
    }
  }

  moveRight() {
    this.vx += constants.MOVEMENT_V
    if (this.vx > constants.MOVEMENT_V){
      this.vx = constants.MOVEMENT_V
    }
  }

  tweakJumpGravity() {
    if (this.vy < 0){//make falling faster
      this.gravity = constants.GRAVITY_V * 3
    }else if( this.vy > 0 && !this.inJump){//make short jumps shorter
      this.gravity = constants.GRAVITY_V * 5 
    }
    if (this.onPlatform){
      this.gravity = constatns.GRAVITY_V
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