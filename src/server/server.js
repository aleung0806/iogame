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
  console.log(`${socket.id} connected`)
  handleConnect(socket)

  socket.on(constants.MSG_TYPES.JOIN_GAME, ({username, windowX, windowY}) => {
    handleJoinGame(socket, username)
  })

  socket.on(constants.MSG_TYPES.INPUT, (input) => {
    console.log(`input ${JSON.stringify(input, 2, null)} received`)
    handleInput(socket.id, input)
  })

  socket.on('disconnect', () => {
    handleDisconnect(socket)
  })
})




const handleInput = (socketId, input) => {
  
  if (input.type === 'direction'){
    console.log(`new direction is ${input.value}`)
    game.setPlayerDirection(socketId, input.value)
  }
}

const handleConnect = (socket) => {
  game.addSocket(socket)
  game.printGameState()
}

const handleDisconnect = (socket) => {
  game.removeSocket(socket)
  game.printGameState()
}

const handleJoinGame = (socket, username, windowX, windowY) => {
  game.addPlayer(socket, username)
  game.printGameState()

}



