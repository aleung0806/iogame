const Object = require('./object')
const constants = require('../shared/constants')

class Platform {
  constructor(x, y, length){
    this.type = 'large'
    this.x = x
    this.y = y
    this.length = length
    this.animate = null
  }


  serialize(){
    return {
      type: this.type,
      x: this.x, 
      y: this.y,
      length: this.length,
      animate: this.animate.asset
    }
  }
}


class Cloud extends Platform {
  constructor(x, y, id){
    super()
    this.type = 'cloud'
    this.id = id
    this.x = x
    this.y = y
    this.length = 100
    this.animate = {
      asset: 'cloud/1.png'
    }
  }



}
module.exports = {Platform, Cloud }