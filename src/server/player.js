const Object = require('./object')
const constants = require('../shared/constants')
const { JUMP_V, PLAYER_RADIUS } = require('../shared/constants')
const { v4: uuidv4 } = require('uuid');
const { hitboxes, platforms, players } = require('./state')
const Input = require('./input')

const Look = require('./look')
const Movement = require('./movement')
const Respawn = require('./respawn')
const Attack = require('./attack')
const SpinAttack = require('./spinAttack')
const SwingAttack = require('./swingAttack')
const Example = require('./example')
const Fall = require('./fall')
const Roll = require('./roll')

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
    
    this.inRespawn = true
    this.action = 'idle'
    this.animate = 'look/neutral/10.png'
    this.direction = 'neutral'
    this.lastDirection = 'right'

    // this.animate = Animate(this)
    // this.actions = Actions(this)

    //controls
    this.movement = Movement(this)
    this.look = Look(this)
    this.fall = Fall(this)
    this.input = Input(this)
    this.attack = Attack(this)
    this.spinAttack = SpinAttack(this)
    this.swingAttack = SwingAttack(this)
    this.roll = Roll(this)
    this.respawn = Respawn(this)

    this.example = Example(this)


  }




  update() {
    // this.actions.update()
    // this.animate.update()
    this.roll.update()
    this.look.update()
    this.fall.update()

    this.movement.update()
    this.attack.update()
    this.spinAttack.update()
    this.swingAttack.update()
    this.respawn.update()

    this.updateObjectState()

    this.input.update()


    this.example.update()
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