const { platforms } = require("./state")
const assetMap = require('./assetMap.json')
const animationMap = assetMap.cloud
const {Cloud, Platform }= require('./platform')
const { v4: uuidv4} = require('uuid')


const Respawn = (player) => {

  const animationSpeed = 1/16
  let frame = 0
  const y = 300
  const cloudId = player.id

  const respawn = () => {

    player.x = -200
    player.y = y
    player.vx = 0
    player.vy = 0
    player.inRespawn = true
    platforms.push(new Cloud(0, y, cloudId))
  }

  const update = () => {

    if(player.y < -1000){
      respawn()
    }

    if(player.inRespawn && (player.y > y || player.y < y)){
      const index = platforms.findIndex(platform => platform.type === 'cloud' && platform.id === player.id)
      platforms.splice(index, 1)
      player.inRespawn = false
    }

    if(player.inRespawn === true){
      player.animate.prop = animationMap[Math.floor(frame) % 4]
      frame += animationSpeed
    }


  }

  return {
    update
  }
}

module.exports = Respawn