const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')
const constants = require('../shared/constants')
const binds = require('./keybinds')

const assetMap = require('./assetMap.json')

const animationMap = assetMap.jump


const Movement = (player) => {

  const animationSpeed = 1/16
  const preJumpAnimationSpeed = 1/6
  let frame = 0
  let preJump = false

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
      preJump = true
    }
  }

  const updateJump = () => {

    let direction = 'neutral'
    if (player.vx > 0){
      direction = 'right'
    }else if (player.vx < 0){
      direction = 'left'
    }
    
    if (player.username !== 'test'){
      console.log(preJump)
    }
    //reset jump number if landed after jumping
    if (jumpChain >= 1 && player.onPlatform && player.vy <= 0){
      jumpChain = 0
      frame = 0
    }

    //make long and short jump
    if(jumpChain > 0 && !player.input.state.keys.Space.down && player.vy > 0){ //
      player.vy -= 10
    }


    if (jumpChain > 0 && player.vy > 0){

      player.animate = animationMap[direction][Math.floor(frame) %  4 + 1]
      frame += animationSpeed
    }

    if (preJump){
      player.animate = animationMap[direction][0]
      frame += preJumpAnimationSpeed

    }

    if (preJump && frame > 1){
      preJump = false
      frame = 0
      player.vy = constants.JUMP_V
      jumpChain += 1
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