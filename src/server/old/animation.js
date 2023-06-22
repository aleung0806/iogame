const assetMap = require('./assetMap.json')
const { updateInfo } = require('./state')

class Animation {
  constructor(){
    this.type
    this.direction
    this.asset
    this.frameMultiplier = 1
  }
}

class Idle extends Animation{
  constructor(direction){
    super()
    this.direction = direction
    this.type = 'idle'
    this.frameMap = [
      assetMap.look[direction][0],
      assetMap.look[direction][1],
      assetMap.look[direction][2],
      assetMap.look[direction][3],
    ]
  }
}


class Attack extends Animation{
  constructor(direction){
    super()
    this.type = 'attack'
    this.direction = direction
    this.frameMap = [
      assetMap.attack[direction][0],
      assetMap.attack[direction][1],
      assetMap.attack[direction][1],
      assetMap.attack[direction][1],
    ]
  }
}


class SpinAttack extends Animation{
  constructor(direction){
    super()
    this.type = 'spinAttack'
    this.direction = direction
    this.frameMultplier = 4
    this.frameMap = [
      assetMap.spin[0],
      assetMap.spin[1],
      assetMap.spin[1],
      assetMap.spin[1],
      assetMap.spin[1],
      assetMap.spin[2],
      assetMap.spin[3],
      assetMap.spin[4],
      assetMap.spin[5],
      assetMap.spin[6],
      assetMap.spin[2],
      assetMap.spin[3],
      assetMap.spin[4],
      assetMap.spin[5],
      assetMap.spin[6],

    ]
  }
}


// class SpinAttack extends Animation{
//   constructor(direction){
//     super()
//     this.type = 'spinAttack'
//     this.direction = direction
//     this.frameMultplier = 4
//     this.state = 'charge'
//     this.frameMap = {
//       'charge': [
//         assetMap.spin[0],
//         assetMap.spin[1],
//       ],
//       'release': [
//         assetMap.spin[2],
//         assetMap.spin[3],
//         assetMap.spin[4],
//         assetMap.spin[5],
//         assetMap.spin[6],
//         assetMap.spin[2],
//         assetMap.spin[3],
//         assetMap.spin[4],
//         assetMap.spin[5],
//         assetMap.spin[6],
//       ]
//     }
//   }
//   release()
// }



class SwingAttack extends Animation{
  constructor(direction){
    super()
    this.type = 'swingAttack'
    this.direction = direction
    this.frameMultplier = 8

    this.frameMap = [
      assetMap.slam[0],
      assetMap.slam[0],
      assetMap.slam[1],
      assetMap.slam[1],
      assetMap.slam[1],
      //assetMap.slam[3],
      assetMap.slam[4],
      assetMap.slam[5],
      assetMap.slam[7],
      assetMap.slam[8],
      assetMap.slam[8],
      assetMap.slam[8],




    ]
  }
}


module.exports = {
  Idle, Attack, SpinAttack, SwingAttack
}
