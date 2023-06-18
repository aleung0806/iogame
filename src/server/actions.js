const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')
const constants = require('../shared/constants')
const Animate = require('./animate')

const Actions = (player) => {

  let animate = player.animate

  let punchPower = 100
  let punchCooldown = 0
  let jumpChain = 0


  const callActions = () => {
    let input = player.input

    if (input.state.keys.KeyW.down && input.state.keys.KeyW.duration === 0){
      jump()
    }
    if (input.state.keys.KeyA.down){
      moveLeft()
    }
    if (input.state.keys.KeyD.down){
      moveRight()
    }
    if (input.state.keys.Space.down){
      punchCharge()
    }
    if (!input.state.keys.Space.down && input.state.keys.Space.duration > 0){
      punchRelease()
    }
  }

  const punchCharge = () => {
    if (punchCooldown === 0){
      punchPower += 1
      animate.punchCharge()
    }
  }

  const punchRelease = () => {
    let punchDirection
    if (player.input.state.keys.KeyW.pressed){
      punchCharge = 'up'
    }else if (player.input.state.keys.KeyS.pressed){
      punchCharge = 'down'
    }else {
      punchDirection = player.input.state.lastDirection
    }
    hitboxes.push(new PunchBox(player, punchPower, punchDirection))
    punchCooldown = 10
    punchPower = 100
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
    callActions()
    //update punch cooldown
    punchCooldown = Math.max(0, punchCooldown - 1)

    //reset jump number if landed after jumping
    if (jumpChain >= 1 && player.onPlatform && player.vy <= 0){
      jumpChain = 0
    }

    //tweaking gravity during jumps
    if(jumpChain > 0 && player.vy < 0){ //'better jump' falling
      player.gravity = constants.GRAVITY_V * 2
    }
    if(jumpChain > 0 && !player.input.state.keys.KeyW.down && player.vy > 0){ //
      player.gravity = constants.GRAVITY_V * 2
    }
    if (jumpChain === 0){
      player.gravity = constants.GRAVITY_V
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