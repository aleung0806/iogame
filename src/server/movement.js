const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')
const constants = require('../shared/constants')
const binds = require('./keybinds')

const Movement = (player) => {

  const receiveInputs = () => {
    let keys = player.input.state.keys

    if (keys[binds['moveLeft']].down){
      moveLeft()
    } else if (keys[binds['moveRight']].down){
      moveRight()
    }

    if (keys[binds['jump']].state === 'press'){
      jump()
    }
  }

  let jumpChain = 0

  const jump = () => {
  if (jumpChain <= 1){ //doublejump
      player.vy = constants.JUMP_V
      jumpChain += 1
    }
  }

  const updateJump = () => {

    //reset jump number if landed after jumping
    if (jumpChain >= 1 && player.onPlatform && player.vy <= 0){
      //player.action = 'idle'
      jumpChain = 0
    }


    if(jumpChain > 0 && player.input.state.keys.Space.down && player.vy > 0){ //
      player.vy += 10
    }
    //tweaking gravity during jumps
    // if(jumpChain > 0 && player.vy < 0){ //'better jump' falling
    //   player.gravity = constants.GRAVITY_V * 2
    // }
    // if (jumpChain === 0){
    //   player.gravity = constants.GRAVITY_V
    // }
  }

  const moveLeft = () => {
    //player.action = 'move'
    player.vx = Math.max(-constants.MOVE_MAX_V, player.vx - constants.MOVE_V)
  }

  const moveRight = () => {
    //player.action = 'move'
    player.vx = Math.min(constants.MOVE_MAX_V, player.vx + constants.MOVE_V)
  }


  const update = () => {
    receiveInputs()

    updateJump()
  }

  return {
    update
  }
}

module.exports = Movement