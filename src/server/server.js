const express = require('express')
const constants = require('../shared/constants')
const { players, sockets } = require('./state')
const { createGame } = require('./game')
const app = express()

app.use(express.static('public'))
app.use(express.static('dist'))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  //console.log('listening on 3000')
})

const { Server } = require('socket.io')
const io = new Server(server)


const game = createGame()
game.initState()

io.on('connection', (socket) => {
  handleConnect(socket)

  socket.on(constants.MSG_TYPES.JOIN_GAME, ({username, windowX, windowY}) => {
    handleJoinGame(socket, username)
  })

  socket.on(constants.MSG_TYPES.INPUT, (input) => {
    handleInput(socket.id, input)
  })

  socket.on('disconnect', () => {
    handleDisconnect(socket)
  })
})




const handleInput = (socketId, input) => {
  const player = players[socketId]
  if (input.type === 'down'){
    player.input.keys[input.key].pressed = true

  }else if (input.type === 'up'){
    player.input.keys[input.key].pressed = false
  }

}

const handleConnect = (socket) => {
  //console.log(`socket ${socket.id} connected`)
  game.addSocket(socket)
  game.printState()
}

const handleDisconnect = (socket) => {
  game.removeSocket(socket)
  game.printState()
}

const handleJoinGame = (socket, username, windowX, windowY) => {
  game.addPlayer(socket, username)
  game.printState()

}



