const e = require('express')
const { times } = require('lodash')
const Object = require('./object')
const { players } = require('./state')

class Hitbox extends Object {
  constructor(x, y, radius, owner){
    super()
    this.x = x
    this.y = y
    this.owner = owner
    this.radius = radius
    this.duration = 1 //frames the hitbox will last

    this.knockback = 0

  }

  applyKnockback(player){
    // if (this.direction === 'left'){
    //   player.vx = -this.knockback
    //   player.vy += 250
    // }else if (this.direction === 'right'){
    //   player.vx = this.knockback
    //   player.vy += 250

    // }else if (this.direction === 'up'){
    //   player.vy = this.knockback + 200

    // }else if (this.direction === 'down'){
    //   player.vy = -this.knockback + 200
    // }
  }

  applyPlayerCollisions(){
    for (const id in players){
      //console.log('checking')
      if (this.owner !== players[id] && this.collidesWith(players[id])){
        //console.log("hit player")

        players[id].isHit = true
        players[id].hitCooldown = this.hitCooldown
        //this.applyKnockback(player)
        this.applyKnockback(players[id])
      }
    }

    this.duration -= 1
  }

  serialize() {
    return {
      x: this.x,
      y: this.y, 
      radius: this.radius
    }
  }
}

class PunchBox extends Hitbox {
  constructor(owner, charge, direction){
    super()
    this.owner = owner
    this.direction = direction
    this.knockback = 1000
    this.radius = 40
    this.duration = 1

    if (direction === 'left'){
      this.x = owner.x - 100
      this.y = owner.y
    }else if (direction === 'right'){
      this.x = owner.x + 100
      this.y = owner.y

    }else if (direction === 'up'){
      this.x = owner.x
      this.y = owner.y + 75

    }else if (direction === 'down'){
      this.x = owner.x
      this.y = owner.y - 75
    }

  }

  applyKnockback(player){
    player.action = 'roll'
    if (this.direction === 'left'){
      player.vx = -this.knockback
      player.vy = 500
    }else if (this.direction === 'right'){
      player.vx = this.knockback
      player.vy = 500

    }else if (this.direction === 'up'){
      player.vy = this.knockback

    }else if (this.direction === 'down'){
      player.vy = -this.knockback
    }
  }
}

class SpinBox extends Hitbox {
  constructor(owner, charge, direction){
    super()
    this.owner = owner
    this.direction = direction
    this.knockback = 2000
    this.radius = 40
    this.duration = 1

    if (direction === 'left'){
      this.x = owner.x - 100
      this.y = owner.y
    }else if (direction === 'right'){
      this.x = owner.x + 100
      this.y = owner.y

    }

  }

  applyKnockback(player){
    player.action = 'roll'

    if (this.direction === 'left'){
      player.vx = -this.knockback
    }else if (this.direction === 'right'){
      player.vx = this.knockback
    }
  }
}

class SwingBox extends Hitbox {
  constructor(owner, charge, direction){
    super()
    this.owner = owner
    this.direction = direction
    this.knockback = 1000
    this.radius = 40
    this.duration = 1

    if (direction === 'left'){
      this.x = owner.x - 100
      this.y = owner.y
    }else if (direction === 'right'){
      this.x = owner.x + 100
      this.y = owner.y

    }

  }

  applyKnockback(player){
    player.action = 'roll'

    if (this.direction === 'left'){
      player.vx = -this.knockback
      player.vy = 1500
    }else if (this.direction === 'right'){
      player.vx = this.knockback
      player.vy = 1500

    }
  }
}

module.exports = {
  Hitbox, 
  PunchBox,
  SpinBox,
  SwingBox,
}