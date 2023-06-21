const binds = require('./keybinds')
const assetMap = require('./assetMap.json')
const { hitboxes } = require('./state')
const { PunchBox } = require('./hitbox')

const animationMap = assetMap.spin

const SpinAttack = (player) => {

  const chargeAnimationSpeed = 1/16
  const releaseAnimationSpeed = 1/16

  let power = 1


  const chargeAnimationMap = [
    animationMap['charge'][0],
    animationMap['charge'][1]
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
    console.log('init')
    player.action = 'spinAttackCharge'
    direction = 'right'
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
      player.animate = chargeAnimationMap[Math.min(Math.floor(frame), 1)]
      power = Math.min(power + 1, 100)
      frame += 1 * chargeAnimationSpeed 
    }else if (player.action === 'spinAttackRelease') {
      if (frame < 1){
        player.vx += 800 * (power / 100)
      }
      player.animate = releaseAnimationMap[Math.floor(frame)]
      frame += 1 * releaseAnimationSpeed * (1 + 3 * (power / 100))
      
    }

  }

  return {
    update
  }
}

module.exports = SpinAttack