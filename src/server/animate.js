//regular, jump, left, right, punchChargeLeft, punchReleaseRight


const states = {
  'normal': {
    asset: 'normal.png',
    xOffset: 0,
    yOffset: 0,
    xScale: 1,
    yScale: 1,
  },
  'moveLeft': {
    asset: 'moveL.png',
    xOffset: 0,
    yOffset: 0,
    xScale: 1,
    yScale: 1,
  },
  'moveRight': {
    asset: 'moveR.png',
    xOffset: 0,
    yOffset: 0,
    xScale: 1,
    yScale: 1,
  },
  'punchChargeLeft': {
    asset: 'punchCharge.png',
    xOffset: -25,
    yOffset: -5,
    xScale: 1.3,
    yScale: 1,
  },
  'punchChargeRight': {
    asset: 'punchCharge.png',
    xOffset: 25,
    yOffset: 5,
    xScale: 1.3,
    yScale: 1,
  },
  'punchReleaseRight': {
    asset: 'punchCharge.png',
    xOffset: 0,
    yOffset: 0,
    xScale: 1.5,
    yScale: 1,
  },
  'punchReleaseLeft': {
    asset: 'punchCharge.png',
    xOffset: 0,
    yOffset: 0,
    xScale: 1.5,
    yScale: 1,
  },

}

const Animate = (player) => {
  let id = 'normal'
  let punchReleaseFrames = 0


  const punchCharge = () => {
    if(player.input.state.keys.lastDirection === 'left'){
      id = 'punchChargeLeft'
    }else{
      id = 'punchChargeRight'
    }
  }

  const punchRelease = () => {
    if(player.input.state.keys.lastDirection === 'left'){
      id = 'punchReleaseLeft'
    }else{
      id = 'punchReleaseRight'
    }
    punchReleaseFrames = 15
  }

  const jump = () => {
    id = 'jump'
  }

  const moveLeft = () => {
    id = 'moveLeft'
  }

  const moveRight = () => {
    id = 'moveRight'
  }

  const update = () => {
    punchReleaseCooldown = Math.max(0, punchReleaseFrames - 1)

    if (punchReleaseCooldown === 0){
      id = 'normal'
    }
  }

  const state = () => {
    return states[id]
  }

  return {
    punchCharge,
    punchRelease,
    jump,
    moveLeft,
    moveRight,

    update,
    state
  }

}
module.exports = Animate
