import io from 'socket.io-client'
export const socket = io()
const constants = require('../shared/constants')
const { processGameUpdate, processGameOver } = require('./state')

export const connectToServer = () => new Promise((resolve, reject) => {

  socket.on('connect', () => {
    console.log(`connected to server`)
  })
  socket.on(constants.MSG_TYPES.GAME_UPDATE, (value) => {
    console.log('received: game update')
    processGameUpdate(value)
  })
  socket.on(constants.MSG_TYPES.GAME_OVER, (value) => {
    console.log('received: game over')
    processGameOver()
  })
  socket.on('disconnect', () => {
    console.log('disconnected from server')
  })
  resolve()
})


export const sendJoinGame = (player) => {
  socket.emit(constants.MSG_TYPES.JOIN_GAME, player)
  //startReceivingUpdates()
}




