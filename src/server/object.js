
const constants = require('../shared/constants')

class Object {
  constructor(x = 0, y = 0, direction = 0, radius = 10, gravity = constants.GRAVITY_V) {
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.direction = direction
    this.radius = radius

    //projected position. is calculated each frame then collisions, out of bounds, etc are checked against it
    this.x = 0
    this.y = 0

    this.gravity = gravity
    this.onPlatform= false
  }

  collidesWith(object) {
    console.log(`${JSON.stringify(object, null, 2)} vs ${JSON.stringify(this, null, 2)}  `)
    const dx = Math.abs(object.x - this.x)
    const dy = Math.abs(object.y - this.y)
    const distance = Math.sqrt( dx * dx + dy * dy)
    if (distance <= this.radius + object.radius){
      return true
    }
    return false
  }

  updatePosition(dt) {
    if (!this.onPlatform){
      this.vy = this.vy - (dt * this.gravity) 
    }
    this.x += dt * this.vx
    this.y += dt * this.vy
  }
  


  applyPlatformCollisions(platforms) {
    for(const platform of platforms){
      if(this.y - platform.y < this.radius //object has clipped through the platform surface
        && this.x <  platform.x + platform.length / 2  //object is within the platform length
        && this.x >  platform.x - platform.length / 2
        && this.vy < 0  //object is falling
      ){
        this.y = platform.y + this.radius //set object on platform
        this.vy = 0  // apply upward force provided by platform
        if (Math.abs(this.vy) < 1 ){ // get rid of bounce
          this.onPlatform = true
          this.vy = 0
        }
      }else{
        this.onPlatform = false
      }
    }
  }

  applyPlatformFriction() {
    //friction for going right or left on platform
    if (this.vx < 0 && this.onPlatform){ //going left on platform
      this.vx += constants.FRICTION_V
    }else if (this.vx > 0 && this.onPlatform){ //going right on platform
      this.vx -= constants.FRICTION_V
    }
    if (Math.abs(this.vx) < 1){ //let object come to a stop
      this.vx = 0
    }
 }

  update(dt, platforms){
    this.updatePosition(dt)
    this.applyPlatformCollisions(platforms)
    this.applyPlatformFriction()
  }
}

module.exports = Object