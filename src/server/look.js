const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')
const constants = require('../shared/constants')
const binds = require('./keybinds')
const assetMap = require('./assetMap.json')

const animationMap = assetMap.look

const Look = (player) => {
  const animationSpeed = 1/8
  let frame = 0
  player.direction = 'neutral'

  const receiveInputs = () => {
    let keys = player.input.state.keys

    if (keys[binds['lookUp']].down){
      player.direction = 'up'
    } else if (keys[binds['lookDown']].down) {
      player.direction = 'down'
    }else if (keys[binds['lookRight']].down) {
      player.direction = 'right'
      player.lastDirection = 'right'
    }else if (keys[binds['lookLeft']].down) {
      player.direction = 'left'
      player.lastDirection = 'left'

    }else {
      player.direction = 'neutral'
    }
  }

  const update = () => {
    receiveInputs()

    player.animate = animationMap[player.direction][Math.floor(frame) % 4]

    frame += 1 * animationSpeed
  }

  return {
    update
  }
}

module.exports = Look