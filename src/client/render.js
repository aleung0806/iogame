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


const renderMe = (me) => {
  const { x, y, direction } = me
  renderObject(getAsset('sphere.svg'), x, y, PLAYER_RADIUS * 2)
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


const renderMap = () => {
  const state = getCurrentState()
  const { me, players, bullets, platforms } = state
  if (!_.isEmpty(state)){
    animationFrameRequestId = window.requestAnimationFrame(renderGame)

    // players.forEach(player => {
    //   return renderPlayer(me, player)
    // })
    // bullets.forEach(bullet => {
    //   return renderBullet(me, bullet)
    // })
    
  }else{
    animationFrameRequestId = window.requestAnimationFrame(renderMap)
  }

  // setInterval(() => {
  //   animationFrameRequestId = window.requestAnimationFrame(render)
  // }, 1000)
  
}

const renderGame = () => {
  const state = getCurrentState()
  const { me, players, bullets, platforms } = state
  if (!_.isEmpty(state)){
    renderBackground(me)    
    platforms.forEach(platform => {
      return renderPlatform(platform)
    })
    renderMe(me)

    // players.forEach(player => {
    //   return renderPlayer(me, player)
    // })
    // bullets.forEach(bullet => {
    //   return renderBullet(me, bullet)
    // })
    
  }
  // setInterval(() => {
  //   animationFrameRequestId = window.requestAnimationFrame(render)
  // }, 1000)
  animationFrameRequestId = window.requestAnimationFrame(renderGame)
  
}