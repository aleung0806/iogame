import { getAsset } from './assets'

import _ from 'lodash'
import { hitboxes } from '../server/state'

const canvas = document.getElementById('game-canvas')


const context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const canvasX = canvas.width / 2
const canvasY = canvas.height / 2

const Constants = require('../shared/constants')
//const { animationStates} = require('./animationStates')
const { getCurrentState } = require('./state')

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants

let animationFrameRequestId;

const renderObject = (image, x, y, radius) => {
  context.save()
  context.translate(canvasX, canvasY)
  context.drawImage(image, x - radius, - y - radius, radius * 2, radius * 2 )  //img, x, y, width, height
  context.restore()
}

const renderHitbox = (hitbox) => {
  const {x, y, radius } = hitbox
  console.log('rendering', hitbox)
  //render color
  context.save()
  context.translate(canvasX, canvasY)
  context.fillStyle = 'gray';
  context.beginPath();
  context.arc(x, - y, radius, 0, 2 * Math.PI);
  context.fill();
  context.restore()
}

const renderPlayer = (player) => {
  //console.log('rendering', JSON.stringify(player, null, 2))
  const {x, y, radius, color, animate, username} = player
  //const animate = animationStates[animateId]
  const image = getAsset(animate.asset)
  console.log('rendering', animate.asset)
  //render color
  // context.save()
  // context.translate(canvasX, canvasY)
  // context.fillStyle = color;
  // context.beginPath();
  // context.arc(x, - y, radius, 0, 2 * Math.PI);
  // context.fill();
  // context.restore()


  // context.save()
  // context.translate(canvasX, canvasY)
  // const gradient = context.createRadialGradient(x, -y, radius, x, -y, radius)
  // gradient.addColorStop(0, 'pink')
  // gradient.addColorStop(1, 'white')
  // context.fillStyle = gradient
  // context.beginPath()
  // context.arc(x, -y, radius, 0, 2 * Math.PI);
  // context.closePath()
  // context.fill()
  // context.restore()

  context.save()
  context.translate(canvasX, canvasY)
  context.font = "16px Arial";
  context.fillStyle = color;
  context.textAlign = "center";

  context.fillText(username, x, - y - radius - 20);
  context.restore()

  //render png
  context.save()
  context.translate(canvasX, canvasY)
  context.drawImage( //img, x, y, width, height
    image, 
    x - radius - 125,
    - y - radius - 125,
    radius * 2 *  4.25,
    radius * 2 * 4.25)

  context.restore()

 
}

const renderBackground = () => {
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)
}

const renderPlatform = (platform) => {
  const {x, y, length, type, animate} = platform
  // context.save()
  // context.translate(canvasX, canvasY)
  // context.fillStyle = 'black'
  // context.fillRect(x - length / 2, -y, length, 5)   //x, y, width, height
  // context.restore()

  if (type === 'large'){
    const ratio =  322 / 1971
    const image = getAsset('background/platform-large.png')
    context.save()
    context.translate(canvasX, canvasY)
    context.drawImage(
      image, 
      x - ((length + 10) / 2),
      -y - ((length + 10) * ratio / 2),
      length + 10, 
      (length + 10) * ratio
      )  //img, x, y, width, height
    context.restore()
  }else if (type === 'cloud'){
    const radius = 40
    const image = getAsset(animate.asset)
    context.save()
    context.translate(canvasX, canvasY)
    context.drawImage(
      image, 
      x - radius - 125,
      - y - radius * 2 - 120,
      radius * 2 *  4.25,
      radius * 2 * 4.25)
    context.restore()

    // context.save()
    // context.translate(canvasX, canvasY)
    // context.fillStyle = 'black'
    // context.fillRect(x - length / 2, -y, length, 5)   //x, y, width, height
    // context.restore()
  }
  }



const renderWall = (wall) => {
  console.log('render: wall', wall)
  const {x, y, length } = wall
  context.save()
  context.translate(canvasX, canvasY)
  context.fillStyle = 'black'
  context.fillRect(x, -y  - length / 2, 5, length)   //x, y, width, height
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
  const { me, players, bullets, platforms, walls, hitboxes } = state
  if (!_.isEmpty(state)){

    renderBackground()

    platforms.forEach(platform => {
      return renderPlatform(platform)
    })


    walls.forEach(wall => {
      return renderWall(wall)
    })

    // hitboxes.forEach(hitbox => {
    //   return renderHitbox(hitbox)
    // })
    
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