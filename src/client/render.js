import { getAsset } from './assets'

import _ from 'lodash'

const canvas = document.getElementById('game-canvas')
const context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const canvasX = canvas.width / 2
const canvasY = canvas.height / 2

const Constants = require('../shared/constants')

const { getCurrentState } = require('./state')

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants

let animationFrameRequestId;

const renderObject = (image, x, y, radius) => {
  context.save()
  context.translate(canvasX, canvasY)
  context.drawImage(image, x - radius, - y - radius, radius * 2, radius * 2 )  //img, x, y, width, height
  context.restore()
}


const renderPC = (player) => {
  const image = getAsset('bolita_attackChargeRight.png')
  const {x, y, radius, color } = player
  context.save()
  context.translate(canvasX, canvasY)
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, - y, radius, 0, 2 * Math.PI);
  context.fill();
  context.restore()

  context.save()
  context.translate(canvasX, canvasY)
  context.drawImage(image, x - radius - 25, - y - radius - 5, radius * 2 * 1.3, radius * 2)  //img, x, y, width, height
  context.restore()
}

const renderPR = (player) => {
  const image = getAsset('bolita_attackReleaseRight.png')
  const {x, y, radius, color } = player

  context.save()
  context.translate(canvasX, canvasY)
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, - y, radius, 0, 2 * Math.PI);
  context.fill();
  context.restore()

  context.save()
  context.translate(canvasX, canvasY)
  context.drawImage(image, x - radius, - y - radius, radius * 2 * 1.5, radius * 2 )  //img, x, y, width, height
  context.restore()
}
const renderPlayer = (player) => {
  console.log('rendering', JSON.stringify(player, null, 2))
  const {x, y, radius, color } = player
  let image;
  if (player.animationState === 'normal'){
    image = getAsset('bolita_normal.png')
  } else if(player.animationState === 'left'){
    image = getAsset('bolita_left.png')
  }else if(player.animationState === 'right'){
    image = getAsset('bolita_right.png')
  }else if(player.animationState === 'punchCharge'){
    return renderPC(player)
  }else if(player.animationState === 'punchRelease'){
    return renderPR(player)
  }else{
    image = getAsset('bolita_normal.png')

  }
  context.save()
  context.translate(canvasX, canvasY)
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, - y, radius, 0, 2 * Math.PI);
  context.fill();
  context.restore()

  context.save()
  context.translate(canvasX, canvasY)
  context.drawImage(image, x - radius, - y - radius, radius * 2, radius * 2 )  //img, x, y, width, height
  context.restore()
}

const renderBackground = () => {
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)
}

const renderPlatform = (platform) => {
  const {x, y, length } = platform
  context.save()
  context.translate(canvasX, canvasY)
  context.fillStyle = 'black'
  context.fillRect(x - length / 2, -y, length, 5)   //x, y, width, height
  context.restore()
}


const renderBullet = (bullet) => {
  const { x, y } = bullet
  renderObject(getAsset('sphere.svg'), x, y, BULLET_RADIUS )
}

export const startRender = () => {
  console.log(`render: start`)

  animationFrameRequestId = window.requestAnimationFrame(renderGame)
}

export const stopRender = () => {
  cancelAnimationFrame(animationFrameRequestId)
}


const renderGame = () => {
  const state = getCurrentState()
  const { me, players, bullets, platforms } = state
  if (!_.isEmpty(state)){

    renderBackground()
    platforms.forEach(platform => {
      return renderPlatform(platform)
    })
    
    renderPlayer(me)


    players.forEach(player => {
      return renderPlayer(player)
    })


    // bullets.forEach(bullet => {
    //   return renderBullet(me, bullet)
    // })
    
  }
  // setInterval(() => {
  //   animationFrameRequestId = window.requestAnimationFrame(render)
  // }, 1000)
  animationFrameRequestId = window.requestAnimationFrame(renderGame)
  
}