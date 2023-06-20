const assetMap = require('./assetMap.json')

const Animate = (player) => {
  let state =  {
    asset: 'look/neutral/10.png'

  }

  let punchReleaseFrames = 0

  const punchCharge = () => {
    if(player.input.state.lastDirection === 'left'){
      state.id = 'punchChargeLeft'
    }else{
      state.id = 'punchChargeRight'
    }
  }

  const punchRelease = () => {
    if(player.input.state.lastDirection === 'left'){
      state.id = 'punchReleaseLeft'
    }else{
      state.id = 'punchReleaseRight'
    }
    punchReleaseFrames = 15
  }

  const jump = () => {
    //state.id = 'jump'
  }
  
  let frames = 0
  const update = () => {
    punchReleaseFrames = Math.max(0, punchReleaseFrames - 1)
    // if(player.username === 'p1'){
    //   console.log(state)
    // }

    // if (punchReleaseFrames === 0 ){
    //   state= 'normal'
    // }
    //leftFrame += 1
    state.asset = assetMap.look[player.lookDirection][Math.floor(frames) % 4]
    frames += 1/8
  }


  return {
    punchCharge,
    punchRelease,
    jump,

    // lookUp, 
    // lookRight,
    // lookLeft,
    // lookDown,


    update,
    state
  }

}
module.exports = Animate




