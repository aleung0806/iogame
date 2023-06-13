const Object = require('./object')
const constants = require('../shared/constants')
const { JUMP_V, PLAYER_RADIUS } = require('../shared/constants')
const {Hitbox, Punch} = require("./hitbox")
const { v4: uuidv4 } = require('uuid');
const { hitboxes } = require('./state')

class Player extends Object{
  constructor(x, y, username = '', color) {
    super()
    this.id = uuidv4()
    this.color = color
    this.username = username
    this.health = 0
    this.lastFired = 0
    // this.x = Math.random() * constants.MAP_SIZE - (constants.MAP_SIZE / 2)
    // this.y = Math.random() * constants.MAP_SIZE - (constants.MAP_SIZE / 2)
    this.x = 0
    this.y = 300
    this.radius = PLAYER_RADIUS


    this.doubleJumped = false
    this.inJump = false
    this.isHit = false


    //regular, jump, left, right, punchChargeLeft, punchReleaseRight
    this.animationState = 'regular'

    this.punchCharge = 0

    //in frames
    this.hitCooldown = 0
    this.punchCooldown = 0
    this.punchReleaseAnimationCooldown = 0

    this.input = {
      lastPressed: '',
      lastPressedElapsed: 0, //in frames

      KeyW: {
        pressed: false,
        duration: 0
      },
      KeyW: {
        pressed: false,
        duration: 0
      },
      KeyW: {
        pressed: false,
        duration: 0
      },
      KeyW: {
        pressed: false,
        duration: 0
      },
      KeyW: {
        pressed: false,
        duration: 0
      },
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

  punch(){
    if (this.punchCooldown === 0){
      this.punchCooldown = 10
      this.punchReleaseAnimationCooldown = 5
      hitboxes.push(new Punch(this, this.punchCharge))
    }
    this.punchCharge = 0
  }

  chargePunch(){
    console.log('charging')
    this.punchCharge += 1
    // if (this.punchCharge > 90){
    //   this.punch(hitboxes)
    // }
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

  updateHitCooldown() {
    if(this.isHit){
      this.hitCooldown -= 1
    }
    if(this.hitCooldown < 0){
      this.isHit = false
    }
  }

  updatePunchCooldown() {
    this.punchCooldown -= 1
    if(this.punchCooldown < 0){
      this.punchCooldown = 0
    }
  }

  updateLastPressedElapsed() {
    this.input.lastPressedElapsed += 1
  }

  updateAnimationState() {

    if(this.input.Space){
      return this.animationState = 'punchCharge'
    }
    if(this.punchReleaseAnimationCooldown > 0){
      return this.animationState = 'punchRelease'
    }

    if(this.input.lastPressed === 'KeyA'){
      this.animationState = 'left'
    } else if(this.input.lastPressed === 'KeyD'){
      this.animationState = 'right'
    }



    if(this.input.lastPressedElapsed > 60){
      return this.animationState = 'normal'
    }
    
  }

  releaseChargedPunch() {
    if(this.punchCharge > 0 && !this.input.Space){
      console.log('release punch')

      this.punch()
    }
  }

  updatePunchReleaseAnimationCooldown(){
    
    this.punchReleaseAnimationCooldown -= 1
    if (this.punchReleaseAnimationCooldown < 0){
      this.punchReleaseAnimationCooldown = 0
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
    if (this.input.Space){
      this.chargePunch()
    }

    this.tweakJumpGravity()
    this.updateHitCooldown()
    this.updatePunchCooldown()

    this.updateLastPressedElapsed()
    this.updateAnimationState()

    this.releaseChargedPunch()
    this.updatePunchReleaseAnimationCooldown()
  }

  update() {
    this.applyUpdateRules()
    this.updateObject()
  }


  serialize() {
    return {
      username: this.username,
      x: this.x,
      y: this.y,
      direction: this.direction,
      health: this.health,
      isHit: this.isHit,
      color: this.color,
      radius: this.radius,
      animationState: this.animationState
    }
  }
}

module.exports = Player