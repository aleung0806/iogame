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
    if(this.y < -2000){
      this.vy = 0
      this.vx = 0
      this.y = 300
      this.x = 0
    }

  }

  checkPlatformCollisions(platforms) {
    for(const platform of platforms){
      // if (Math.abs(this.x - platform.x) <= platform.length / 2){
      //   if ((this.y < platform.y) && (this.vy < 0) && (this.previousY > platform.y)){  //and will land on the platform falling from above

      const y =

      const platformMinX = platform.x - (platform.length / 2)
      const platformMaxX = platform.x + (platform.length / 2)


      if( pathMinY <= platform.y 
        && pathMaxY >= platform.y 
        && this.x <= platformMaxX 
        && this.prevX >= platformMinX
      ){

      }else{
      }

    }
  }


  checkPlatformCollisions(platforms) {
    for(const platform of platforms){
      // if (Math.abs(this.x - platform.x) <= platform.length / 2){
      //   if ((this.y < platform.y) && (this.vy < 0) && (this.previousY > platform.y)){  //and will land on the platform falling from above
      if(Math.max(this.y, this.prevY) < platform.y || Math.min(this.y, this.prevY) > platform.y){ //path is entirely above or below platform
        this.onGround = false

      }else { //TODO
        this.gravity = constants.GRAVITY_V
        this.onGround = true
        this.vy = 0
        this.y = platform.y
      }

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