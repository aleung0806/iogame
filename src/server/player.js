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

  startJump() {
    this.onGround = false
    this.vy += 1000 
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

  update() {

    
    if (this.vy < 0){//make falling faster
      this.gravity = constants.GRAVITY_V * 3
    }else if( this.vy > 0 && !this.spaceKey){//make short jumps shorter
      console.log('short jump')
      this.gravity = constants.GRAVITY_V * 5 
    }
    
    //friction for going right or left on platform
    if (this.vx < 0 && this.onGround){
      this.vx += constants.FRICTION_V
    }else if (this.vx > 0 && this.onGround){
      this.vx -= constants.FRICTION_V
    }

    //respawn after falling
    if(this.y < -10000){
      this.vy = 0
      this.y = 300
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