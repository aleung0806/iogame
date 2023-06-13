const Object = require('./object')
const constants = require('../shared/constants')
const { JUMP_V, PLAYER_RADIUS } = require('../shared/constants')
const { v4: uuidv4 } = require('uuid');
const { hitboxes } = require('./state')

const { Punch, DoubleJump } = require('./actions')

class Player extends Object{
  constructor(x, y, username = '', color) {
    super()
    this.id = uuidv4()
    this.color = color
    this.username = username
    this.health = 0
    this.x = x
    this.y = y
    this.radius = PLAYER_RADIUS

    //regular, jump, left, right, punchChargeLeft, punchReleaseRight
    this.animationState = 'regular'

    this.actions = {
      punch: Punch(this),
      doubleJump: DoubleJump(this)
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



// update helpers


  updateAnimationState() {

    if(this.input.keys.Space.pressed){
      return this.animationState = 'punchCharge'
    }
    if(false){
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

  updateActionState() {
    if (this.input.keys.KeyW.pressed === true && this.input.keys.KeyW.duration < 1){
      this.actions.doubleJump.jump()
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
    
    //update each action (cooldowns, counters, tweaks, etc)
    for (const id in this.actions){
      this.actions[id].update()
    }
  }

  update() {
    this.updateActionState()
    this.updateAnimationState()
    this.updateInputState()

    this.updateObjectState()

  }

  serialize() {

    return {
      username: this.username,
      x: this.x,
      y: this.y,
      direction: this.direction,
      health: this.health,
      color: this.color,
      radius: this.radius,
      animationState: this.animationState
    }
  }
}

module.exports = Player