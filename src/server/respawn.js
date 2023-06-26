const { platforms } = require("./state")
const assetMap = require('./assetMap.json')
const animationMap = assetMap.cloud
const {Cloud, Platform }= require('./platform')
const { v4: uuidv4} = require('uuid')

const Respawn = (player) => {

  const animationSpeed = 1/16
  let frame = 0
  const y = 300
  const x = 0
  let cloudDisappear = false
  

  const respawn = () => {

    player.x = x
    player.y = y + 200
    player.vx = 0
    player.vy = 0
    player.inRespawn = true
    platforms.push(new Cloud(x, y, player.id))
  }

  respawn()

  const endRespawn = () => {
    player.inRespawn = false
    cloudDisappear = true
    frame = 0
  }

  const update = () => {

    if(player.y < -1000){
      respawn()
    }

    if(player.inRespawn && (player.y < y)){
      endRespawn()
    }

    if (player.inRespawn && frame > 20){
      endRespawn()

    }

    if(player.inRespawn){
      const index = platforms.findIndex(platform => platform.type === 'cloud' && platform.id === player.id)
      platforms[index].animate.asset = animationMap[Math.floor(frame) % 4]
      frame += animationSpeed
    }


    if(cloudDisappear && frame >= 2){
      const index = platforms.findIndex(platform => platform.type === 'cloud' && platform.id === player.id)
      platforms.splice(index, 1)
      cloudDisappear = false
      frame = 0
    }

    if(cloudDisappear){
      const index = platforms.findIndex(platform => platform.type === 'cloud' && platform.id === player.id)
      platforms[index].animate.asset = animationMap[Math.floor(frame) + 4]
      frame += animationSpeed
    }
  }

  return {
    update
  }
}

module.exports = Respawn