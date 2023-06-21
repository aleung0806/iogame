const binds = require('./keybinds')
const assetMap = require('./assetMap.json')
const animationMap = assetMap.attack

const Attack = (player) => {

  const animationSpeed = 1/16

  let frame = 0
  let state = 'inactive'
  let direction = 'right'


  const frameMap = [
    animationMap[direction][0],
    animationMap[direction][1]
  ]

  const actionMap = [
    () => {},
    () => {
      console.log('attacking')
    }
  ]

  const receiveInputs = () => {
    const keys = player.input.state.keys
    if (keys[binds['attack1']].state === 'press'){
      init()
    }
  }

  const init = () => {
    player.action = 'attack'
    direction = player.direction
    if (player.direction === 'neutral'){
      direction = 'right'
    }
    //console.log(player.direction)
  }


  const update = () => {
    receiveInputs()

    if(frame >= 2){
      frame = 0
      player.action = 'idle'
    }
    
    if (player.action === 'attack') {
      player.animate = animationMap[direction][Math.floor(frame)]
      actionMap[Math.floor(frame)]
      frame += 1 * animationSpeed 
    }

    
  }

  return {
    update
  }
}

module.exports = Attack