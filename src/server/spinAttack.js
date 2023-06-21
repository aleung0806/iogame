const binds = require('./keybinds')
const assetMap = require('./assetMap.json')
const { hitboxes } = require('./state')
const { SpinBox } = require('./hitbox')

const animationMap = assetMap.spin

const SpinAttack = (player) => {

  let chargeAnimationSpeed = 1/16
  const releaseAnimationSpeed = 1/16
  let chargeDelay = 0

  let power = 1



  const chargeAnimationMap = [
    animationMap['charge'][0],
    animationMap['charge'][1],
    animationMap['charge'][2],
    animationMap['charge'][1],
    animationMap['charge'][2],
    animationMap['charge'][1],
    animationMap['charge'][2],
    animationMap['charge'][1],
    animationMap['charge'][2],
    animationMap['charge'][1],
    animationMap['charge'][2],
    animationMap['charge'][1],
    animationMap['charge'][2],

  ]

  const releaseAnimationMap = [
    animationMap['release'][0],
    animationMap['release'][1],
    animationMap['release'][2],
    animationMap['release'][3],
    animationMap['release'][4],
  ]

  let frame = 0
  let direction = 'right'

  const receiveInputs = () => {
    const keys = player.input.state.keys
    if (keys[binds['attack2']].state === 'press'){
      init()
    }else if (keys[binds['attack2']].state === 'release'){
      release()
    }
  }

  const init = () => {
    player.action = 'spinAttackCharge'
    direction = 'right'
    chargeAnimationSpeed = 1/16
  }

  const release = () => {
    player.action = 'spinAttackRelease'
    direction = 'right'
    frame = 0

  }


  const update = () => {
    receiveInputs()

    if(player.action === 'spinAttackRelease' && frame >= 5){
      frame = 0
      player.action = 'idle'
      power = 0
    }
    
    if (player.action === 'spinAttackCharge') {
      player.animate = chargeAnimationMap[Math.min(Math.floor(frame), 12)]
      console.log('frame', frame)
      power = Math.min(power + 1, 300)
      frame += 1 * chargeAnimationSpeed
      
      chargeAnimationSpeed = chargeAnimationSpeed * 1.005
    }else if (player.action === 'spinAttackRelease') {
      // if (frame < 1){
      //   player.vx += 150 + ( 150 * power / 300)
      // }
      if (frame > 2.5 && frame < 3.5) {
        hitboxes.push(new SpinBox(
          player,
          1000 + (2000 * power / 300),
          direction
        ))
      }
      player.animate = releaseAnimationMap[Math.floor(frame)]
      frame += 1 * releaseAnimationSpeed * (1 + 3 * (power / 300))
    }
  }

  return {
    update
  }
}

module.exports = SpinAttack