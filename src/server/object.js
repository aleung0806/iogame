
const constants = require('../shared/constants')
const { players, platforms, walls, updateInfo } = require('./state')

class Object {
  constructor(x = 0, y = 0, direction = 0, radius = 10, gravity = constants.GRAVITY_V) {
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.direction = direction
    this.radius = radius


    this.gravity = gravity
    this.onPlatform= false
  }

  collidesWith(object) {
    //console.log(`${JSON.stringify(object, null, 2)} vs ${JSON.stringify(this, null, 2)}  `)
    const dx = Math.abs(object.x - this.x)
    const dy = Math.abs(object.y - this.y)
    const distance = Math.sqrt( dx * dx + dy * dy)
    if (distance <= this.radius + object.radius){
      return true
    }
    return false
  }

  updatePosition() {
    const dt = updateInfo.dt 

    this.vy = this.vy - (dt * this.gravity) 
    if (this.onPlatform && this.vy < 0){
      this.vy = 0
    }

    this.vx = Math.min(this.vx, constants.MAX_PLAYER_SPEED)
    this.vy = Math.min(this.vy, constants.MAX_PLAYER_SPEED)

    this.vx = Math.max(this.vx, - constants.MAX_PLAYER_SPEED)
    this.vy = Math.max(this.vy, - constants.MAX_PLAYER_SPEED)


    this.x += dt * this.vx
    this.y += dt * this.vy
  }


  applyPlatformCollisions() {
    let onPlatform = false
    for(const platform of platforms){
      if(this.y - this.radius <= platform.y
        && this.y >= platform.y //object is on or has clipped through the platform surface
        && this.x <  platform.x + platform.length / 2  //object is within the platform length
        && this.x >  platform.x - platform.length / 2
        && this.vy <= 0  //object is falling or stationary
      ){
        this.vy = 0
        this.y = platform.y + this.radius //set object on platform
        onPlatform = true
      }
    }
    this.onPlatform = onPlatform
  }

  applyPlatformFriction() {
    //friction for going right or left on platform
    if (this.vx < 0 && this.onPlatform){ //going left on platform
      this.vx = Math.min(0, this.vx + constants.FRICTION_V)

    }else if (this.vx > 0 && this.onPlatform){ //going right on platform
      this.vx = Math.max(0, this.vx - constants.FRICTION_V)
    }
    if (Math.abs(this.vx) < 1){ //let object come to a stop
      this.vx = 0
    }
  }

  applyWallCollisions() {
    for(const wall of walls){
      if(this.y <  wall.y + wall.length / 2  //object is within the platform length
        && this.y >  wall.y - wall.length / 2
      ){
        //coming from the left and collides
        if(this.vx > 0 && this.x + this.radius > wall.x && this.x < wall.x){
          this.x = wall.x - this.radius
          this.vx = -this.vx * 1/2

        }
        //coming from the right and collides
        if(this.vx < 0 && this.x - this.radius < wall.x && this.x > wall.x){
          this.x = wall.x + this.radius //set object by wall
          this.vx = -this.vx * 1/2
        }
      }
    }
  }

  updateObjectState(dt){
    this.applyPlatformFriction()
    this.updatePosition(dt)

    this.applyWallCollisions()
    this.applyPlatformCollisions()

  }
}

module.exports = Object