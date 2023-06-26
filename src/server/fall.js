const assetMap = require('./assetMap.json')

const Fall = (player) => {

  let frame = 0
  let animationSpeed = 1/16

  const update = () => {
    if(player.action === 'idle' && !player.onPlatform && player.vy < 0){
      console.log('hello')
      let direction = 'neutral'
      if (player.vx > 0){
        direction = 'right'
      }else if (player.vx < 0){
        direction = 'left'
      }

      player.animate = assetMap['fall'][direction][Math.floor(frame) % 4]
      frame += animationSpeed
    }

   
  }

  return {
    update
  }
}

module.exports = Fall