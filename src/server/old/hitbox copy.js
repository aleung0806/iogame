const e = require('express')
const Object = require('./object')
const { players } = require('./state')

class Hitbox extends Object {
  constructor(x, y, radius, owner){
    super()
    this.x = x
    this.y = y
    this.owner = owner
    this.radius = radius
    this.duration = 1
    this.hitCooldown = 60
    this.knockbackx = 0
    this.knockbacky = 0

  }

  applyKnockback(player){
    const dx = (player.x - this.x)
    const dy = (player.y - this.y)
    const magnitude = Math.sqrt(dx**2 + dy**2)
    console.log('magnitude', dx/magnitude)
    player.vx = Math.abs(dx/magnitude) * this.knockbackx
    player.vy = Math.abs(dy/magnitude) * this.knockbacky

  }

  applyPlayerCollisions(){
    for (const id in players){
      console.log('checking')
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
    this.direction = direction
    this.knockback = 3000 + charge
    if (direction === 'left'){
      this.knockbackx = -this.knockback
    }else if (direction === 'right'){
      this.knockbackx = this.knockback

    }else if (direction === 'up'){
      this.knockbacky = this.knockback

    }else if (direction === 'down'){
      this.knockbacky = -this.knockback
    }


    this.x = owner.x
    this.y = owner.y
    this.owner = owner
    this.radius = owner.radius + 60

  }
}


class SpinBox extends Hitbox {
  constructor(owner, charge, direction){
    super()
    this.direction = direction
    this.knockback = 3000 + charge
    if (direction === 'left'){
      this.knockbackx = -this.knockback
    }else if (direction === 'right'){
      this.knockbackx = this.knockback

    }else if (direction === 'up'){
      this.knockbacky = this.knockback

    }else if (direction === 'down'){
      this.knockbacky = -this.knockback
    }


    this.x = owner.x
    this.y = owner.y
    this.owner = owner
    this.radius = owner.radius + 60

  }
}


module.exports = {
  Hitbox, 
  PunchBox,
  SpinBox
}