const assetMap = require('./assetMap.json')

const Roll = (player) => {

  let frame = 0
  let animationSpeed = 1/8

  const update = () => {
    if(player.action === 'roll' && frame >= 7){
      frame = 0
      player.action = 'idle'
    }

    if(player.action === 'roll'){
      if (player.vx >= 0){
        player.animate = assetMap['roll']['right'][Math.floor(frame)]
      }else{
        player.animate = assetMap['roll']['left'][Math.floor(frame)]
      }
      frame += animationSpeed
    }
    
  }

  return {
    update
  }
}

module.exports = Roll