const express = require('express')
const constants = require('../shared/constants')

const app = express()

const { createGame } = require('./game')

app.use(express.static('public'))
app.use(express.static('dist'))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log('listening on 3000')
})

const { Server } = require('socket.io')
const io = new Server(server)


const game = createGame()


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
  if (input.type === 'direction'){
    //console.log(`new direction is ${input.value}`)
  }else if (input.type === 'spaceDown'){
    if (!game.players[socketId].spaceKey && game.players[socketId].onGround){
      game.players[socketId].startJump()
    }
    game.players[socketId].spaceKey = true

  }else if (input.type === 'spaceUp'){
    game.players[socketId].spaceKey = false

  }else if (input.type === 'keyA'){
    game.players[socketId].moveLeft()
  }else if (input.type === 'keyD'){
    game.players[socketId].moveRight()
  }
}

const handleConnect = (socket) => {
  console.log(`socket ${socket.id} connected`)
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



