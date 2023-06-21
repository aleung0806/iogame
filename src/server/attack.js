const binds = require('./keybinds')
const assetMap = require('./assetMap.json')

const Attack = (player) => {

  let frame = null
  let direction = 'right'

  const frameMap = [
    assetMap.attack[direction][0],
    assetMap.attack[direction][1]
  ]

  const actionMap = [

  ]

  const init = () => {
    frame = 0
    direction = player.look.state.direction
  }

  const updateAttack = () => {
    if (frame !== null){
      if (frame <= 1){
        player.animate = frameMap[frame]
        frame += 1
      }else{
        frame = null
        player.action = 'idle'
      }
    }
  }

  const update = () => {
    const keys = player.input.state.keys
    if (keys[binds['attack1']].state === 'press'){
      init()
    }
    updateAttack()
  }

  return {
    update
  }
}

module.exports = Attack