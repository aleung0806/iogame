const Object = require('./object')

class Player extends Object{
  constructor(username, socketId, x, y, windowX, windowY) {
    super()
    this.username = username,
    this.socketId = socketId,
    this.windowX = windowX
    this.windowY = windowY
  }

  setWindowSize(x, y){
    this.windowX = x
    this.windowY = y
  }
  
  serializedPlayer(){
    return {
      username: this.username,
      socketId: this.socketId,
      x: this.x,
      y: this.y,
      direction: this.direction
    }
  }
}

module.exports = Player