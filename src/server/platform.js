const Object = require('./object')
const constants = require('../shared/constants')

class Platform {
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


class Cloud extends Platform {
  constructor(x, y, id){
    super()
    this.id = id
    this.x = x
    this.y = y
    this.length = 100
  }

}
module.exports = {Platform, Cloud }