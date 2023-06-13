const Object = require('./object')
const constants = require('../shared/constants')
const { JUMP_V, PLAYER_RADIUS } = require('../shared/constants')
const { v4: uuidv4 } = require('uuid');
const { hitboxes } = require('./state')
const Input = require('./input')
const Animate = require('./animate')
const { Punch, DoubleJump, MoveRight, MoveLeft } = require('./actions')

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

    this.actions = {
      punch: Punch(this),
      doubleJump: DoubleJump(this),
      moveRight: MoveRight(this),
      moveLeft: MoveLeft(this),
    }

    this.input = Input(this)
    this.animation = Animate(this)

  }

  update() {
    this.animation.update()

    for (const id in this.actions){
      this.actions[id].update()
    }
    this.input.update()

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

      animationState: this.animate.state
    }
  }
}

module.exports = Player