const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')
const constants = require('../shared/constants')
const Punch = (player) => {

  let punchCharge = 0
  let cooldown = 0
  
  const charge = () => {
    punchCharge += 1
  }

  const release = () => {
    console.log('release')

    if (cooldown === 0){
      console.log('release')
      cooldown = 10
      hitboxes.push(new PunchBox(player, punchCharge))
    }
    punchCharge = 0
  }

  const update = () => {
    cooldown = Math.max(0, cooldown - 1)
  }

  return {
    charge, 
    release,
    update
  }
}

const DoubleJump = (player) => {

  let inJump = false

  const jump = () => {
    if (player.onPlatform){
      player.vy += constants.JUMP_V
      if (player.vy > constants.JUMP_MAX_V){
        player.vy = constants.JUMP_MAX_V
      } 
    }
  }

  const update = (player) => {
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
    jump,
    update
  }
}



module.exports = {
  Punch,
  DoubleJump
}