const Player = require('./player')
const constants = require('../shared/constants')
const Bullet = require('./bullet')
const { stringify } = require('flatted')
const uuid = require('uuid')

const _ = require('lodash')

const state = {
  me: {
    id: '000',
    username: 'player 1',
    x: 0,
    y: 0,
    direction: 0
  },
  players: [
    {
      id: '001',
      username: 'player 2',
      x: -100,
      y: 200,
      direction: 180
    },
    {
      id: '002',
      username: 'player 3',
      x: 250,
      y: 350,
      direction: 90
    },
  ],
  bullets: []
}

const createObject = () => {
  let x = 0
  let y = 0
  let direction = 0

  return {
      x, y, direction,
  }
}

const createPlayer = (username) => {
  const player = createObject()
  player.username = username
  player.canShoot = true
  return player
}




const createGame = () => {
  let sockets = {}
  let bullets = []
  let players = {}

  let state = {}

  let lastUpdate = new Date()

  const addSocket = (socket) => {
    console.log(`socket ${socket} added`)
    sockets[socket.id] = socket
  }

  const removeSocket = (socket) => {
    delete sockets[socket.id]
    if (socket.id in players){
      delete players[socket.id]
    }
  }

  const addPlayer = (socket, username) => {
    toSendUpdate = true
    players[socket.id] = new Player(username)
  }

  const setPlayerDirection = (socketId, direction) => {
    players[socketId].direction = direction
  }


  const update = () => {

    let now = new Date()
    dt = (now - lastUpdate) / 10000
    lastUpdate = now

    const playersUpdated = []
    const bulletsUpdated = []

    //update player positions
    for (const id in players){
      players[id].updatePosition(dt)
      playersUpdated.push(players[id].serialize())
    }

    //create bullets
    for (const id in players){
      console.log(now - players[id].lastFired)
      if((now - players[id].lastFired) / 1000 > constants.PLAYER_FIRE_COOLDOWN){
        let bullet = new Bullet(players[id])
        bullets.push(bullet)
        players[id].lastFired = now
      }
    }

    //update bullet positions
    bullets.forEach(bullet => {
      bullet.updatePosition(dt)
      bulletsUpdated.push(bullet.serialize())
    })

    state = {
      players: playersUpdated,
      bullets: bulletsUpdated
    }
  }




  const sendUpdates = () => {
    for (const id in sockets){
      if(id in players){
        let others = state.players.filter(player => player.username !== players[id].username)

        sockets[id].emit(constants.MSG_TYPES.GAME_UPDATE, {
          me: players[id],
          players: others,
          bullets: state.bullets
        })
      }
    }
    
  }


  const printGameState = () => {
    
    console.log(`sockets:`)
    for (const socket in sockets) {
      console.log(`${stringify(socket)}`)
    }
  }

  setInterval(update, 1000/60)
  setInterval(sendUpdates, 1000/30)


  setInterval(() => console.log(`state: ${JSON.stringify(state, 2, null)}`), 1000)
0
  return {
    sockets,
    players,
    addSocket,
    removeSocket,
    addPlayer,
    setPlayerDirection,
    printGameState
  }
}




module.exports = {
  createGame
}