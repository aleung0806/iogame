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
  let direction = 'right'



  const chargeAnimationFrames = [
    0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2
  ]

  const releaseAnimationFrames = [
    0, 1, 2, 3, 4
  ]

  let frame = 0

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
    direction = player.lastDirection
    chargeAnimationSpeed = 1/16
  }

  const release = () => {
    player.action = 'spinAttackRelease'
    direction = player.lastDirection
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
      player.animate = animationMap[player.lastDirection]['charge'][chargeAnimationFrames[Math.min(Math.floor(frame), 12)]]
      power = Math.min(power + 1, 300)
      frame += 1 * chargeAnimationSpeed
      
      chargeAnimationSpeed = chargeAnimationSpeed * 1.005
    }else if (player.action === 'spinAttackRelease') {
      // if (frame < 1){
      //   player.vx += 150 + ( 150 * power / 300)
      // }
      if (frame === 1){
        player.vy = 600
      }
      if (frame === 2){
        player.vy = 800
      }
      if (frame === 3) {
        player.vy = 1000
        hitboxes.push(new SpinBox(
          player,
          1000 + (2000 * power / 300),
          direction
        ))
      }
      player.animate = animationMap[direction]['release'][releaseAnimationFrames[Math.floor(frame)]]
      frame += 1 * releaseAnimationSpeed * 2
    }
  }

  return {
    update
  }
}

module.exports = SpinAttack