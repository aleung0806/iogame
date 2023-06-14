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
    this.duration = 30 //frames the hitbox will last
    this.hitCooldown = 60
    this.knockback = 1000
  }

  applyKnockback(player){
    const dx = (player.x - this.x)
    const dy = (player.y - this.y)
    const magnitude = Math.sqrt(dx**2 + dy**2)

    player.vx = dx/magnitude * this.knockback
    player.vy = dy/magnitude * this.knockback

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
    //console.log('punch generated')
    super()
    if (direction === 'left'){
      this.x = owner.x - 60 
    }else{
      this.x = owner.x + 60
    }
    
    this.y = owner.y
    this.owner = owner
    this.radius = 30
    this.duration = 30
    this.knockback = 1000 * charge / 30
    console.log(this)

  }
}

module.exports = {
  Hitbox, 
  PunchBox
}