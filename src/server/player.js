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
    this.vx += 100
    if (this.vx < 500){
      this.vx = 500
    }
  }

  moveRight() {
    this.vx += 100
    if (this.vx < 500){
      this.vx = 500
    }
  }

  update() {
    if (this.vy < 0){
      this.gravity = constants.GRAVITY_V * 3
    }else if( this.vy > 0 && !this.spaceKey){
      console.log('short jump')
      this.gravity = constants.GRAVITY_V * 5 
    }
    
    if (this.vx < 0){
      this.vx += 100
    }else if (this.vx > 0){
      this.vx -= 100
    }

    if (Math.abs(this.vx) < 100){
      this.vx = 0
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