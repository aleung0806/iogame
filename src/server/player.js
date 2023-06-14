const Object = require('./object')
const constants = require('../shared/constants')
const { JUMP_V, PLAYER_RADIUS } = require('../shared/constants')
const { v4: uuidv4 } = require('uuid');
const { hitboxes } = require('./state')
const Input = require('./input')
const Animate = require('./animate')
const Actions = require('./actions')

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

    this.input = Input(this)
    this.actions = Actions(this)
    this.animate = Animate(this)

  }

  update() {
    this.input.update()
    this.actions.update()
    this.animate.update()
    this.updateObjectState()
  }

  serialize() {

    return {
      username: this.username,
      x: this.x,
      y: this.y,
      radius: this.radius,
      direction: this.direction,
      health: this.health,
      color: this.color,
      
      animate: this.animate.state
    }
  }
}

module.exports = Player