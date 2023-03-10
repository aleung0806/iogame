const Player = require('./player')
const constants = require('../shared/constants')

class Game {
  constructor() {
    this.testPlayer = {}
    this.testSocket = {}

    this.sockets = {}
    this.players = {}
    this.bullets = {}
    this.lastUpdateTime = 0
    setInterval(this.sendUpdate.bind(this), 5000)
    this.shouldSendUpdate = false
  }

  setTestPlayerDirection(input) {
    this.testPlayer.setDirection(input)
  }

  addTestPlayer(socket, username, windowX, windowY) {
    this.testPlayer = new Player(username, 0, 0, 0, windowX, windowY)
    this.testSocket = socket
  }

  setPlayerDirection(player) {

  }

  addPlayer(socket, username, windowX, windowY) {
    this.sockets[socket.id] = socket
    this.players[socket.id] = new Player(username, socketId, 0, 0, windowX, windowY)
  }

  removePlayer(socketId) {
    delete this.players[socketId]
    delete this.sockets[socketId]
  }

  createUpdate(player){
    this.players[socket.id].username
  }

  sendUpdate() {
    
    const socket =  this.testSocket

    const timeStamp = Date.now()
    socket.emit('timer', timeStamp)
    // socket.emit(constants.MSG_TYPES.GAME_UPDATE, {
    //   me: this.testPlayer
    // })
  }

}

module.exports = Game