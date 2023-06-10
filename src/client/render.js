import { getAsset } from './assets'

import _ from 'lodash'

const canvas = document.getElementById('game-canvas')
const context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const Constants = require('../shared/constants')

const { getCurrentState } = require('./state')

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants

let animationFrameRequestId;



const renderBackground = (me) => {
  console.log('render: background')
  const canvasX = canvas.width / 2
  const canvasY = canvas.height / 2

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)


}

const renderPlatform = (me) => {
  context.save()
  context.translate(canvasX, canvasY)
  context.fillStyle = 'black'
  context.fillRect(.250, 0, 500, 5)
  context.restore()
}


const renderMe = (me) => {
  const { x, y, direction } = player

  console.log('render: player')

  const canvasX = canvas.width / 2
  const canvasY = canvas.height / 2


  context.save()
  context.translate(canvasX, canvasY)
  context.rotate(direction * Math.PI / 180)
  context.drawImage(
    getAsset('sphere.svg'),
    -PLAYER_RADIUS, 
    -PLAYER_RADIUS, 
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  )
  context.restore()
}

const renderBullet = (me, bullet) => {
  const { x, y, direction } = bullet
  const canvasX = canvas.width / 2 + x - me.x
  const canvasY = canvas.height / 2 + y - me.y


  context.save()
  context.translate(canvasX, canvasY)
  context.drawImage(
    getAsset('sphere.svg'),
    -BULLET_RADIUS, 
    -BULLET_RADIUS, 
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  )
  context.restore()
}


export const startRender = () => {
  console.log(`render: start`)
  animationFrameRequestId = window.requestAnimationFrame(render)
}

export const stopRender = () => {
  cancelAnimationFrame(animationFrameRequestId)
}


const render = () => {
  const state = getCurrentState()
  console.log('render')

  const { me, players, bullets } = state
  if (!_.isEmpty(state)){
    renderBackground(me)
    renderMe(me)
    renderPlatform(me)
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
  animationFrameRequestId = window.requestAnimationFrame(render)
  
}