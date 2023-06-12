const Player = require('./player')
const constants = require('../shared/constants')
const Bullet = require('./bullet')
const Platform = require('./platform')
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

  let sockets = {} //socketId: socket
  let bullets = []
  let players = {} //socketId: player
  //let platforms = [ new Platform(0, -300, 1000), new Platform(200, 0, 300), new Platform(-400, 300, 300) ] 
  let platforms = [ new Platform(0, -300, 1000)]
  // let walls = [ new Platform(0, -300, 1000) ] 

  let updateCounter = 0  
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
    toSendUpdate = true
    players[socket.id] = new Player(username)
  }

 
  const updateState = () => {
    let now = new Date()
    dt = (now - lastUpdate) / 1000
    lastUpdate = now

    //update player positions
    for (const id in players){
      players[id].update(dt, platforms)

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
    updateCounter += 1
  }




  const sendUpdates = () => {
    const serializedPlayers = []
    for (const id in players){
      serializedPlayers.push(players[id].serialize())
    }
    const serializedBullets = bullets.map(bullet => bullet.serialize())
    const serializedPlatforms = platforms.map(platform => platform.serialize())
    for (const id in sockets){
      if(id in players){ //if the socket has a player associated with it
        let me;
        const others = [];
        serializedPlayers.forEach((sPlayer) => {
          if (sPlayer.username === players[id].username){ 
            me = sPlayer
          }else{
            others.push(sPlayer)
          }
          
        })

        const toSend = {
          me: me,
          players: others,
          bullets: serializedBullets,
          platforms: serializedPlatforms
        }
        sockets[id].emit(constants.MSG_TYPES.GAME_UPDATE, toSend)
      }
    }
    
  }

  const printState = () => {
    console.log(`players: ${JSON.stringify(players, null, 2)}`)
  }

  const trackFPS = () => {
    console.log(`FPS: ${updateCounter}`)
    updateCounter = 0
  }

  setInterval(updateState, 1000/60)
  setInterval(sendUpdates, 1000/30)
  // setInterval(printState, 1000)
  setInterval(trackFPS, 1000)

  return {
    sockets,
    players,
    addSocket,
    removeSocket,
    addPlayer,
    printState
  }
}




module.exports = {
  createGame
}