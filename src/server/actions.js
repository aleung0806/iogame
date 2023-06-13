const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')
const constants = require('../shared/constants')
const Animate = require('./animate')


const Punch = (player) => {

  let animate = Animate(player)
  let punchCharge = 0
  let cooldown = 0

  const charge = () => {
    if (cooldown === 0){
      punchCharge += 1
      animate.punchCharge()
    }
  }

  const release = () => {
    
    hitboxes.push(new PunchBox(player, punchCharge))
    cooldown = 10
    punchCharge = 0
    animate.punchRelease()
  }

  const update = () => {
    cooldown = Math.max(0, cooldown - 1)
    animate.update()
  }

  return {
    charge, 
    release,
    update
  }
}

const DoubleJump = (player) => {

  let jumps = 0

  const go = () => {
    if (player.onPlatform){
      player.vy = player.vy + constants.JUMP_V
      jumps = 1
      animate.jump.jump()

    }
    if (jumps < 2){
      player.vy = player.vy + constants.JUMP_V
      jumps = 1
      animate.jump.jump()
    }
  }

  const update = (player) => {
    if (jumps > 0 && player.onPlatform){
      jumps = 0
    }
    animate.update()

    // if (player.vy < 0){//make falling faster
    //   player.gravity = constants.GRAVITY_V * 1
    // }else if( player.vy > 0 && !player.input.KeyW){//make short jumps shorter
    //   player.gravity = constants.GRAVITY_V * 2
    // }
    // if (player.onPlatform){
    //   player.gravity = constants.GRAVITY_V
    // }
    
  }

  return {
    go,
    update
  }
}

const moveLeft = (player) => {
  const go = () => {
    this.vx -= constants.MOVE_V
    if (this.vx < -constants.MOVE_MAX_V){
      this.vx = -constants.MOVE_MAX_V
    }
    player.vx = Math.max(-constants.MOVE_MAX_V, this.vx - constants.MOVE_V)
  }
  
  const update = () => {

  }

  return {
    go,
    update
  }
}

const moveRight = (player) => {
  const go = () => {
    this.vx += constants.MOVE_V
    if (this.vx > constants.MOVE_MAX_V){
      this.vx = constants.MOVE_MAX_V
    }
    player.vx = Math.min(constants.MOVE_MAX_V, this.vx + constants.MOVE_V)
  }

  const update = () => {
    
  }

  return {
    go,
    update
  }
}


module.exports = {
  Punch,
  DoubleJump,
  MoveLeft,
  MoveRight
}