const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')
const constants = require('../shared/constants')
const Animate = require('./animate')

const Actions = (player) => {

  let animate = player.animate

  let punchPower = 0
  let punchCooldown = 0
  let jumps = 0

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
      player.vy = player.vy + constants.JUMP_V
      jumps = 1
      animate.jump()

    }
    if (jumps < 2){
      player.vy = player.vy + constants.JUMP_V
      jumps = 1
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
    if (jumps > 0 && player.onPlatform){
      jumps = 0
    }

    //update animation state
    animate.update()
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