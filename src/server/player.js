const Object = require('./object')
const constants = require('../shared/constants')
const { JUMP_V, PLAYER_RADIUS } = require('../shared/constants')

class Player extends Object{
  constructor(username = '') {
    super()
    this.color = '#D9C4EC'
    this.username = username
    this.health = 0
    this.lastFired = 0
    // this.x = Math.random() * constants.MAP_SIZE - (constants.MAP_SIZE / 2)
    // this.y = Math.random() * constants.MAP_SIZE - (constants.MAP_SIZE / 2)
    this.x = 0
    this.y = 300
    this.radius = PLAYER_RADIUS

    this.inJump = false

    this.input = {
      KeyW: false,
      KeyA: false,
      KeyS: false,
      KeyD: false,
    }

  }

  jump() {
    if (this.onPlatform){
      this.vy += constants.JUMP_V
      if (this.vy > constants.JUMP_MAX_V){
        this.vy = constants.JUMP_MAX_V
      } 
    }
  }

  moveLeft(){
    this.vx -= constants.MOVE_V
    if (this.vx < -constants.MOVE_MAX_V){
      this.vx = -constants.MOVE_MAX_V
    }
  }

  moveRight(){
    this.vx += constants.MOVE_V
    if (this.vx > constants.MOVE_MAX_V){
      this.vx = constants.MOVE_MAX_V
    }
  }


  tweakJumpGravity() {
    if (this.vy < 0){//make falling faster
      this.gravity = constants.GRAVITY_V * 1
    }else if( this.vy > 0 && !this.input.KeyW){//make short jumps shorter
      this.gravity = constants.GRAVITY_V * 2
    }
    if (this.onPlatform){
      this.gravity = constants.GRAVITY_V
    }
  }

  //runs every frame
  applyUpdateRules() {
    if (this.input.KeyW){
      this.jump()
    }
    if (this.input.KeyA){
      this.moveLeft()
    }
    if (this.input.KeyD){
      this.moveRight()
    }

    this.tweakJumpGravity()

  }



 

  serialize() {
    return {
      username: this.username,
      x: this.x,
      y: this.y,
      direction: this.direction,
      health: this.health,

      color: this.color,
      radius: this.radius
    }
  }
}

module.exports = Player