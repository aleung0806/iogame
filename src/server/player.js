const Object = require('./object')
const constants = require('../shared/constants')
const { JUMP_V, PLAYER_RADIUS } = require('../shared/constants')
const { v4: uuidv4 } = require('uuid');
const { hitboxes } = require('./state')
const Input = require('./input2')
const Animate = require('./animate')
const Actions = require('./actions')
const Look = require('./look')
const Movement = require('./movement')
const Respawn = require('./respawn')
const Attack = require('./attack')

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
    
    this.action = 'idle'
    this.animate = 'look/neutral/10.png'
    this.direction = 'neutral'

    // this.animate = Animate(this)
    // this.actions = Actions(this)

    //controls
    this.movement = Movement(this)
    this.look = Look(this)
    this.input = Input(this)
    this.attack = Attack(this)
    this.respawn = Respawn(this)
  }

  onDeath() {

  }

  update() {
    // this.actions.update()
    // this.animate.update()
    this.look.update()
    this.movement.update()
    this.attack.update()
    this.updateObjectState()
    this.input.update()
    this.respawn.update()
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
      
      animate: {
        asset: this.animate
      }
    }
  }
}

module.exports = Player