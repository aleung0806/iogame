const Player = require('./player')
const constants = require('../shared/constants')
const Bullet = require('./bullet')
const { stringify } = require('flatted')
const uuid = require('uuid')

const _ = require('lodash')


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

  //socketId: socket
  let sockets = {}

  let bullets = []

  //playerId: player
  let players = {}

  //contains serialized state. used for print and sending
  let state = {}

  let lastUpdate = new Date()

  const addSocket = (socket) => {
    sockets[socket.id] = socket
  }

  const removeSocket = (socket) => {
    delete sockets[socket.id]
    if (socket.id in players){
      delete players[socket.id]
    }
  }

  const addPlayer = (socket, username) => {
    console.log('player joined')
    toSendUpdate = true
    players[socket.id] = new Player(username)
  }

  //directions meaning facing vs velocity
  const setPlayerDirection = (socketId, direction) => {
    // players[socketId].direction = direction
  }

  const setPlayerJump = (socketId) => {
    players[socketId].direction = 0
    players[socketId].acceleration = 5
  }


  const updateState = () => {
    let now = new Date()
    dt = (now - lastUpdate) / 10000
    lastUpdate = now

    const playersUpdated = []
    const bulletsUpdated = []

    //update player positions
    for (const id in players){
      players[id].updatePosition(dt)
    }

    // //create bullets
    // for (const id in players){
    //   if((now - players[id].lastFired) / 1000 > constants.PLAYER_FIRE_COOLDOWN){
    //     let bullet = new Bullet(players[id])
    //     bullets.push(bullet)
    //     players[id].lastFired = now
    //   }
    // }

    // //update bullet positions
    // bullets.forEach(bullet => {
    //   bullet.updatePosition(dt)
    // })

    // //check for bullets hitting border
    // const filteredBullets = bullets.filter(bullet => {

    //   //check for bullets hitting border
    //   if (Math.abs(bullet.x) > constants.MAP_SIZE / 2 || Math.abs(bullet.y) > constants.MAP_SIZE / 2){
        
    //     return true
    //   }

    //   //check for bullets hitting players
    //   for (const id in players){
    //     if(players[id].username !== bullet.firer &&  checkCollision(bullet, players[id])){
    //       sockets[id].emit(constants.MSG_TYPES.GAME_OVER)
    //       return false
    //     }
    //   }
    //   return true
    // })

    // bullets = filteredBullets


    // bullets.forEach(bullet => {
    //   bulletsUpdated.push(bullet.serialize())
    // })

    //update players
    for (const id in players){
      players[id].updatePosition(dt)
      playersUpdated.push(players[id].serialize())
    }

    state = {
      players: playersUpdated,
      bullets: bulletsUpdated
    }
  }


  const checkCollision = (bullet, player) => {
    console.log(`bullet: ${JSON.stringify(bullet.serialize())}, player: ${JSON.stringify(player.serialize())}`)
    if (Math.abs(bullet.x - player.x) < constants.PLAYER_RADIUS * 2
      && Math.abs(bullet.x - player.y) < constants.PLAYER_RADIUS * 2){
        console.log('COLLISION')
      return true
    }
    return false
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

  const printState = () => {

    // extract socket ids to print
    const socketIds = []
    for (const socketId in sockets){
      socketIds.push(socketId)
    }

    console.log(`
      ------------
      sockets: ${JSON.stringify(socketIds, null, 2)}
      players: ${JSON.stringify(state.players, null, 2)}
      bullets: ${state.bullets.length}
    `)
  }

  setInterval(updateState, 1000/60)
  setInterval(sendUpdates, 1000)
  setInterval(printState, 5000)

  return {
    sockets,
    players,
    addSocket,
    removeSocket,
    addPlayer,
    setPlayerDirection,
    printState
  }
}




module.exports = {
  createGame
}