const Object = require('./object')
const constants = require('../shared/constants')
const { JUMP_V, PLAYER_RADIUS } = require('../shared/constants')
const { v4: uuidv4 } = require('uuid');
const { hitboxes } = require('./state')

const { Punch } = require('./actions')

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

    this.actions = {
      punch: Punch(this),
      
    }

    this.cooldowns = {
      hit: 0,
      punch: 0,
      punchReleaseAnimation: 0
    }

    this.input = {
      lastPressed: '',
      sincePressedElapsed: 0, //in frames

      //null, down, hold, or up
      keys: {
        KeyW: {
          pressed: false,
          duration: 0
        },
        KeyA: {
          pressed: false,
          duration: 0
        },
        KeyS: {
          pressed: false,
          duration: 0
        },
        KeyD: {
          pressed: false,
          duration: 0
        },
        Space: {
          pressed: false,
          duration: 0
        },
      }
    }

  }

// Actions
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

// update helpers
  updateCooldowns() {
    for (const id in this.cooldowns){
      this.cooldowns[id] = Math.max(this.cooldowns[id] - 1, 0)
    }
  }

  updateAnimationState() {

    if(this.input.keys.Space.pressed){
      return this.animationState = 'punchCharge'
    }
    if(this.cooldowns.punchReleaseAnimation > 0){
      return this.animationState = 'punchRelease'
    }

    if(this.input.lastPressed === 'KeyA'){
      this.animationState = 'left'
    } else if(this.input.lastPressed === 'KeyD'){
      this.animationState = 'right'
    }
    if(this.input.sinceLastPressed > 60){
      return this.animationState = 'normal'
    }
    
  }

  updateInputState(){
    for (const keyCode in this.input.keys){
      //update input duration
      if(this.input.keys[keyCode].pressed){
        this.input.keys[keyCode].duration += 1
      }
      if (this.input.keys[keyCode].duration > 0 && !this.input.keys[keyCode].pressed){ //if stopped being pressed
        this.input.keys[keyCode].duration = 0
      }

      //update lastPressed
      if (this.input.keys[keyCode].pressed){
        this.input.lastPressed = keyCode
        this.input.sinceLastPressed = 0
      }else{
        this.input.sinceLastPressed += 1
      }

    }
  }

  applyInputRules() {
    if (this.input.keys.KeyW.pressed === true && this.input.keys.KeyW.duration < 1){
      this.jump()
    }
    if (this.input.keys.KeyA.pressed === true){
      this.moveLeft()
    }
    if (this.input.keys.KeyD.pressed === true){
      this.moveRight()
    }
    if (this.input.keys.Space.pressed === true){
      this.actions.punch.charge()
    }
    if (this.input.keys.Space.pressed === false && this.input.keys.Space.duration > 0){
      this.actions.punch.release()

    }
  }

  update() {
    this.applyInputRules()
    this.updateCooldowns()
    this.updateAnimationState()
    this.updateInputState()

    this.updateObject()
  }

  serialize() {
    if (this.cooldowns.hit === 0){
      this.isHit = true
    }
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