import { getAsset } from './assets'

const canvas = document.getElementById('game-canvas')
const context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const Constants = require('../shared/constants')

const { getCurrentState } = require('./state')

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants

let animationFrameRequestId;


const render = () => {
  console.log(`rendering...`)
  const state = getCurrentState()
  const { me, players, bullets } = state
  renderBackground(me)
  renderPlayer(me, me)
  players.forEach(player => {
    return renderPlayer(me, player)
  })

  animationFrameRequestId = requestAnimationFrame(render)
}

const renderBackground = (me) => {
  const {x, y} = me
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  const backgroundGradient = context.createRadialGradient(
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, 'black')
  backgroundGradient.addColorStop(1, 'gray')
  context.fillStyle = backgroundGradient
  context.fillRect(0, 0, canvas.width, canvas.height)
  
}

const renderPlayer = (me, player) => {
  //console.log(`rendering ${JSON.stringify(player)}`)

  const { x, y, direction } = player
  const canvasX = canvas.width / 2 + x - me.x
  const canvasY = canvas.height / 2 + y - me.y


  context.save()
  context.translate(canvasX, canvasY)
  context.rotate(direction * Math.PI / 180)
  context.drawImage(
    getAsset('ship.svg'),
    -PLAYER_RADIUS, 
    -PLAYER_RADIUS, 
    PLAYER_RADIUS * 2,
    PLAYER_RADIUS * 2,
  )
  context.restore()
}
export const startRender = () => {
  console.log(`starting render`)
  animationFrameRequestId = window.requestAnimationFrame(render)
}