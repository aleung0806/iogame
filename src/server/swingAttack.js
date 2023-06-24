const binds = require('./keybinds')
const assetMap = require('./assetMap.json')
const { hitboxes } = require('./state')
const { SwingBox } = require('./hitbox')

const animationMap = assetMap.swing

const SwingAttack = (player) => {

  let chargeAnimationSpeed = 1/16
  const releaseAnimationSpeed = 1/16
  let chargeDelay = 0

  let power = 1
  let direction = 'right'



  const chargeAnimationFrames = [
    0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1
  ]

  const releaseAnimationFrames = [
    0, 2, 3, 4, 4, 4, 5, 5
  ]

  let frame = 0

  const receiveInputs = () => {
    const keys = player.input.state.keys
    if (keys[binds['attack3']].state === 'press'){
      init()
    }else if (keys[binds['attack3']].state === 'release'){
      release()
    }
  }

  const init = () => {
    player.action = 'swingAttackCharge'
    direction = player.lastDirection
    chargeAnimationSpeed = 1/16
  }

  const release = () => {
    player.action = 'swingAttackRelease'
    direction = player.lastDirection
    frame = 0

  }


  const update = () => {
    receiveInputs()

    if(player.action === 'swingAttackRelease' && frame >= 8){
      frame = 0
      player.action = 'idle'
      power = 0
    }
    
    if (player.action === 'swingAttackCharge') {
      player.animate = animationMap[player.lastDirection]['charge'][chargeAnimationFrames[Math.min(Math.floor(frame), 12)]]
      power = Math.min(power + 1, 300)
      frame += 1 * chargeAnimationSpeed
      
      chargeAnimationSpeed = chargeAnimationSpeed * 1.005
    }else if (player.action === 'swingAttackRelease') {

      if (frame === 0 ){
        if (direction === 'right'){
          player.vx = 1000
        }else{
          player.vx = -1000

        }
      }

      if (frame === 2) {

        hitboxes.push(new SwingBox(
          player,
          1000 + (2000 * power / 300),
          direction
        ))
      }
      player.animate = animationMap[direction]['release'][releaseAnimationFrames[Math.floor(frame)]]
      frame += 1 * releaseAnimationSpeed * 4
    }
  }

  return {
    update
  }
}

module.exports = SwingAttack