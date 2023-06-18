const Object = require('./object')
const constants = require('../shared/constants')

class Platform {
  constructor(x, y, length){
    this.x = x
    this.y = y
    this.length = length
  }

  applyCollisions(){

  }

  applyFriction(){
    
  }

  serialize(){
    return {
      x: this.x, 
      y: this.y,
      length: this.length
    }
  }
}

module.exports = Platform