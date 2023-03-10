const Player = require('./player')
const constants = require('../shared/constants')
const Game = require('./game copy')
const { stringify } = require('flatted')
const uuid = require('uuid')
const { update } = require('lodash')

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
  setInterval(() => console.log('player shoots'), 1000)
  return player
}

const createBullet = () => {
  return {
    x: 0, 
    y: 0, 
    direction: 0
  }
}


const createGame = () => {
  let sockets = {}
  let bullets = [
    {
      x: -100,
      y: 200,
      direction: 180
    },
    
    {
      x: 250,
      y: 350,
      direction: 90
    }
  ]
  let players = {
    
    'dummy1': {
      id: '001',
      username: 'player 2',
      x: -100,
      y: 200,
      direction: 180
    },
    'dummy2':
    {
      id: '002',
      username: 'player 3',
      x: 250,
      y: 350,
      direction: 90
    }
    

  }

  const dt = .01

  let toSendUpdate = false
  let lastUpdateTime = new Date()


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

  const setPlayerDirection = (socketId, direction) => {
    console.log(`direction ${direction}`)
    players[socketId].direction = direction
    console.log(JSON.stringify(players[socketId]))
  }

  const createBullet = (p) => {
    const bullet = createBullet()
    bullet.direction = p.direction
    bullet.x = p.x + dt * constants.BULLET_SPEED * Math.sin(p.direction * Math.PI / 180)
    bullet.y = p.y - dt * constants.BULLET_SPEED * Math.cos(p.direction * Math.PI / 180)
  }

  const updatePlayerPosition = (p) =>  {
    //console.log(`dt: ${dt}`)
    p.x += dt * constants.PLAYER_SPEED * Math.sin(p.direction * Math.PI / 180)
    p.y -= dt * constants.PLAYER_SPEED * Math.cos(p.direction * Math.PI / 180)
    //console.log(`player updated to ${JSON.stringify(p)}`)
  }




  const addPlayer = (socket, username) => {
    toSendUpdate = true
    players[socket.id] = createPlayer(username)
  }

  const makeUpdate = (socketId) => {
    updatePlayerPosition(players[socketId])
    
    let playersToSend = []
    let me = {}
    for (const id in players){
      if (id === socketId){
        me = players[id]
      }else{
        playersToSend.push(players[id])
      }
    }
    return {
      me, players: playersToSend
    }
  }

  const sendUpdates = () => {
    //console.log('sending update')
    lastUpdateTime = Date.now()
    if (toSendUpdate){
      for (const id in sockets){
        if(id in players){
          sockets[id].emit(constants.MSG_TYPES.GAME_UPDATE, makeUpdate(id))
        }
      }
    }
  }


  const printGameState = () => {
    console.log(`players: ${JSON.stringify(players)}`)
    console.log(`sockets:`)
    for (const socket in sockets) {
      console.log(`${stringify(socket)}`)
    }
  }

  setInterval(sendUpdates, 1000/30)

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