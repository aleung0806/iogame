const binds = require('./keybinds')
const assetMap = require('./assetMap.json')
const { hitboxes } = require('./state')
const { PunchBox } = require('./hitbox')
const animationMap = assetMap.attack


const Attack = (player) => {

  const animationSpeed = 1/8

  let frame = 0
  let state = 'inactive'
  let direction = 'right'


  const receiveInputs = () => {
    const keys = player.input.state.keys
    if (keys[binds['attack1']].state === 'press'){
      init()
    }
  }

  const init = () => {
    player.action = 'attack'
    if (player.direction === 'neutral'){
      direction = player.lastDirection
    }else{
      direction = player.direction

    }
  }


  const update = () => {
    receiveInputs()

    if(frame >= 3){
      frame = 0
      player.action = 'idle'
    }
    
    if (player.action === 'attack') {
      if (frame < 1){
        player.animate = animationMap[direction][0]
      }else{
        player.animate = animationMap[direction][1]

      }
      
      if (frame === 1){
        hitboxes.push(new PunchBox(
          player,
          1000,
          direction
        ))
      }
      frame += 1 * animationSpeed 
    }

  }

  return {
    update
  }
}

module.exports = Attack