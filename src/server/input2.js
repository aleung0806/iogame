
const keyCodes = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyJ', 'KeyK', 'KeyL', 'Space']



const Input = (player) => {

  let state = { 
    keys: {}
  }
  
  keyCodes.forEach(code => {
    state.keys[code] = {
      down: false,
      duration: 0,
      state: 'up' //press, hold, release, up
    }
  })

  const update = () => {
    for (const keyCode in state.keys){
      const key = state.keys[keyCode]

      if (key.down){
        if(key.duration === 0){
          key.state = 'press'
        }else{
          key.state = 'hold'
        }
      }else{
        if(key.duration > 0){
          key.state = 'release'
        }else{
          key.state = 'up'
        }
      }

      //update duration
      if (key.down){
        key.duration += 1
      }else{
        key.duration = 0
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
