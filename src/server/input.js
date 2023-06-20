
const keyCodes = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyJ', 'Space']



const Input = (player) => {



  let state = {
    lastKey: '',
    sinceLastKey: 0, //in frames

    //left or right
    lastDirection: 'right',
    
    //up, down, left, or right
    lookDirection: '',
    keys: {}

    //press, down, release, up
    //press, release are the 1st frames where the key is down, up
  }
  
  keyCodes.forEach(code => {
    state.keys[code] = {
      down: false,
      duration: 0
    }
  })





  const update = () => {

    for (const keyCode in state.keys){

      //update lastDirection
      if (keyCode === 'KeyA' && state.keys[keyCode].down && state.keys[keyCode].duration === 0){
        state.lastDirection = 'left'
      }
      if (keyCode === 'KeyD' && state.keys[keyCode].down && state.keys[keyCode].duration === 0){
        state.lastDirection = 'right'
      }



      

      //update lastKey
      if (state.keys[keyCode].down){
        state.lastKey = keyCode
        state.sinceLastKey = 0
      }else{
        state.sinceLastKey += 1
      }

      //update duration
      if (state.keys[keyCode].down){
        state.keys[keyCode].duration += 1
      }
      if (!state.keys[keyCode].down){
        state.keys[keyCode].duration = 0
      }

    }
    
  }

  const pressKey = (keyCode) => {
    state.keys[keyCode].down = true
  }

  const releaseKey = (keyCode) => {
    state.keys[keyCode].down = false
  }

  return {
    pressKey,
    releaseKey,
    update, 
    state
  }
}

module.exports = Input
