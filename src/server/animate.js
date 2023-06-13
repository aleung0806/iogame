//regular, jump, left, right, punchChargeLeft, punchReleaseRight
const images = [
  'regular',
  'jump',
  'left',
  'right',
  'punchCharge',
  'punchRelease',
]

const Animate = (player) => {
  let state = 'normal'
  let punchReleaseCooldown = 0


  const punchCharge = () => {
    state = 'punchCharge'
  }

  const punchRelease = () => {
    state = 'punchRelease'
    punchReleaseCooldown = 15
  }

  const jump = () => {
    state = 'jump'
  }

  const moveLeft = () => {
    state = 'left'
  }

  const moveRight = () => {
    state = 'Right'
  }

  const update = () => {
    punchReleaseCooldown = Math.max(0, punchReleaseCooldown - 1)

    if (punchReleaseCooldown === 0){
      state = 'normal'
    }

    
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
modules.export = Animate
