const Player = require('./player')
const constants = require('../shared/constants')
const { Platform }= require('./platform')
const Wall = require('./platform')

const uuid = require('uuid')

const {  
  sockets, 
  bullets, 
  players,
  hitboxes,
  platforms,
  walls,
  updateInfo,
} = require('./state')



const createGame = () => {

  let updateCounter = 0
  let lastUpdate = new Date()

  const initState = () => {
    players['test'] = new Player(-200, 300, 'test','#6e78ff')
    // players['test'].init()
    platforms.push(new Platform(0, -200, 1000))
    //platforms.push(new Platform(-200, 0, 300))
    // walls.push(new Wall(500, -150, 300))
    // walls.push(new Wall(-500, -150, 300))

  }
 
  const addSocket = (socket) => {
    sockets[socket.id] = socket
  }

  const removeSocket = (socket) => {
    delete sockets[socket.id]
    if (socket.id in players){
      delete players[socket.id]
    }
  }

  const addPlayer = (socket, player) => {
    const { username, color } = player
    toSendUpdate = true
    players[socket.id] = new Player(0, 300, username, color)
  }

 
  const updateState = () => {
    let now = new Date()
    updateInfo.dt = (now - lastUpdate) / 1000
    lastUpdate = now

    updateInfo.animationFrames += 1/8 //animation changes frames every 4 frames

    //update player positions
    for (const id in players){
      players[id].update()
    }

    for (const hitbox of hitboxes){
      hitbox.applyPlayerCollisions(players)
    }

    const expiredHitboxes = hitboxes.filter(hitbox => hitbox.duration < 0)
    for(const h of expiredHitboxes){
      const i = hitboxes.indexOf(h)
      hitboxes.splice(i, 1)
    }
    updateCounter += 1

  }




  const sendUpdates = () => {
    const serializedPlayers = []
    for (const id in players){
      serializedPlayers.push(players[id].serialize())
    }

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
          bullets: bullets.map(bullet => bullet.serialize()),
          platforms: platforms.map(platform => platform.serialize()),
          walls: walls.map(wall => wall.serialize()),
          hitboxes: hitboxes.map(hitbox => hitbox.serialize()),
        }
        //console.log('toSend', JSON.stringify(toSend, null, 2))
        sockets[id].emit(constants.MSG_TYPES.GAME_UPDATE, toSend)
      }
    }
  }

  const printState = () => {
    // console.log(`players: ${JSON.stringify(players, null, 2)}`)
  }

  const trackFPS = () => {
    console.log(`FPS: ${updateCounter}`)
    updateCounter = 0
  }

  setInterval(updateState, 1000/60)
  setInterval(sendUpdates, 1000/30)
  //setInterval(printState, 1000)
  //setInterval(trackFPS, 1000)

  return {
    initState,
    addSocket,
    removeSocket,
    addPlayer,
    printState
  }
}




module.exports = {
  createGame,

  sockets,
  players,
  hitboxes,
  platforms
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