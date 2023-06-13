let sockets = {} //socketId: socket
let bullets = []
let players = {} //socketId: player
let hitboxes = []
let platforms = []
let updateInfo = {
  dt: 0
}


//let platforms = [ new Platform(0, -300, 1000), new Platform(200, 0, 300), new Platform(-400, 300, 300) ] 
// let walls = [ new Platform(0, -300, 1000) ] 

module.exports = {
  sockets, 
  bullets, 
  players,
  hitboxes,
  platforms,
  updateInfo
}