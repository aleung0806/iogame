const Object = require('./object')
const constants = require('../shared/constants')

class Bullet extends Object {

  constructor(player){
    super()
    this.x = player.x
    this.y = player.y
    this.direction = player.direction
    this.speed = constants.BULLET_SPEED
    this.firer = player.username

  }
  serialize(){
    return {
      x: this.x, 
      y: this.y,
      direction: this.direction
    }
  }
}

module.exports = Bullet