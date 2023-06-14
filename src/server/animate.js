//regular, jump, left, right, punchChargeLeft, punchReleaseRight




const Animate = (player) => {
  console.log('animate called')
  let state =  {
    id: 'normal'
  }
  let punchReleaseFrames = 0

  const punchCharge = () => {
    if(player.input.state.keys.lastDirection === 'left'){
      state.id = 'punchChargeLeft'
    }else{
      state.id = 'punchChargeRight'
    }
  }

  const punchRelease = () => {
    if(player.input.state.keys.lastDirection === 'left'){
      state.id = 'punchReleaseLeft'
    }else{
      state.id = 'punchReleaseRight'
    }
    punchReleaseFrames = 15
  }

  const jump = () => {
    state.id = 'jump'
  }

  const moveLeft = () => {
    state.id = 'moveLeft'
  }

  const moveRight = () => {
    state.id = 'moveRight'
  }

  const update = () => {
    punchReleaseFrames = Math.max(0, punchReleaseFrames - 1)
    // if(player.username === 'p1'){
    //   console.log(state)
    // }

    // if (punchReleaseFrames === 0 ){
    //   state= 'normal'
    // }
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
