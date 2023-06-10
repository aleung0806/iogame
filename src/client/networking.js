import './css/main.css'
import io from 'socket.io-client'
let socket = io()
const constants = require('../shared/constants')
const { processGameUpdate } = require('./state')

const connectPromise  = new Promise((resolve, reject) => {
  socket.on('connect', () => {
    console.log(`connected to server`)
  })
  socket.on(constants.MSG_TYPES.GAME_UPDATE, (value) => {
    console.log('processing')
    processGameUpdate(value)
  })
  socket.on(constants.MSG_TYPES.GAME_OVER, (value) => {
    console.log('you lose')
    processGameOver(value)
  })
  socket.on('disconnect', () => {
    console.log('disconnected from server')
  })
  resolve()
})

export const connect = () => connectPromise

const processGameOver = () => {
  processGameUpdate({})
}

export const updateDirection = (direction) => {
  socket.emit(constants.MSG_TYPES.INPUT, {type: 'direction', value: direction})
}


export const sendJoinGame = (username, windowX, windowY) => {
  console.log('sending JoinGame')
  socket.emit(constants.MSG_TYPES.JOIN_GAME, 
    {
      username, 
      windowX: window.innerWidth, 
      windowY: window.innerHeight
    })
  //startReceivingUpdates()
}




export const gameUpdate = () => gameUpdatePromise
