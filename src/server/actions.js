const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')
const constants = require('../shared/constants')
const Animate = require('./animate')

const Actions = (player) => {

  let animate = player.animate

  let punchPower = 0
  let punchCooldown = 0
  let jumpChain = 0

  const punchCharge = () => {
    if (punchCooldown === 0){
      punchPower += 1
      animate.punchCharge()
    }
  }

  const punchRelease = () => {
    const punchDirection = player.input.state.lastDirection
    hitboxes.push(new PunchBox(player, punchPower, punchDirection))
    punchCooldown = 10
    punchPower = 0
    animate.punchRelease()
  }

  const jump = () => {
    if (player.onPlatform){
      player.vy = constants.JUMP_V
      jumpChain = 1 
      animate.jump()
    } else if (jumpChain === 1){ //doublejump
      player.vy = constants.JUMP_V
      jumpChain += 1
      animate.jump()
    }
  }

  const moveLeft = () => {
    player.vx = Math.max(-constants.MOVE_MAX_V, player.vx - constants.MOVE_V)
    animate.moveLeft()
  }

  const moveRight = () => {

    player.vx = Math.min(constants.MOVE_MAX_V, player.vx + constants.MOVE_V)
    animate.moveRight()

  }

  const update = () => {

    //update punch cooldown
    punchCooldown = Math.max(0, punchCooldown - 1)

    //reset jump number if landed after jumping
    if (jumpChain > 1 && player.onPlatform){
      jumpChain = 0
    }

    if(jumpChain > 0 && player.vy < 0){ //'better jump' falling
      player.gravity = constants.GRAVITY_V * 1.5
    }

    console.log(player.input.state.keys['KeyA'].pressed)
    if(jumpChain > 0 && !player.input.state.keys['KeyA'].pressed){ //
      player.gravity = constants.GRAVITY_V * 1.3
    }


  }



 return {
    update,
    jump,
    punchRelease,
    punchCharge,
    moveLeft,
    moveRight
  }

}

module.exports = Actions