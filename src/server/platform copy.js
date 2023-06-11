const Object = require('./object')
const constants = require('../shared/constants')

class Wall {
  constructor(x, y, length){
    this.x = x
    this.y = y
    this.length = length
  }

  serialize(){
    return {
      x: this.x, 
      y: this.y,
      length: this.length
    }
  }
}

module.exports = Wall