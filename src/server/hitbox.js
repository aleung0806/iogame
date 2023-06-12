const Object = require('./object')

class Hitbox extends Object {
  constructor(x, y, radius, owner){
    super()
    this.x = x
    this.y = y
    this.owner = owner
    this.radius = radius
    this.duration = 5 //frames the hitbox will last
    this.hitCooldown = 60
    this.knockback = 1000
  }

  applyKnockback(player){

  }

  applyPlayerCollisions(players){
    for (const id in players){
      console.log('checking')
      if (this.owner !== players[id] && this.collidesWith(players[id])){
        console.log("hit player")

        players[id].isHit = true
        players[id].hitCooldown = this.hitCooldown
        //this.applyKnockback(player)
        players[id].vx += this.knockback
      }
    }

    this.duration -= 1
  }
}

class Punch extends Hitbox {
  constructor(owner, charge){
    console.log('punch generated')
    super()
    this.x = owner.x
    this.y = owner.y
    this.owner = owner
    this.radius = owner.radius
    this.duration = 5
    this.knockback = 1000 * charge / 30
  }
}

module.exports = {
  Hitbox, 
  Punch
}