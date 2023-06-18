const Input = (player) => {

  let state = {
    lastKey: '',
    sinceLastKey: 0, //in frames

    lastDirection: 'right',

    keys: {
      KeyW: {
        pressed: false,
        duration: 0
      },
      KeyA: {
        pressed: false,
        duration: 0
      },
      KeyS: {
        pressed: false,
        duration: 0
      },
      KeyD: {
        pressed: false,
        duration: 0
      },
      Space: {
        pressed: false,
        duration: 0
      },
    }
  }

  const callActions = () => {
    if (state.keys.KeyW.pressed === true && state.keys.KeyW.duration === 0){
      player.actions.jump()
    }
    if (state.keys.KeyA.pressed === true){
      player.actions.moveLeft()
    }
    if (state.keys.KeyD.pressed === true){
      player.actions.moveRight()
    }
    if (state.keys.Space.pressed === true){
      player.actions.punchCharge()
    }
    if (state.keys.Space.pressed === false && state.keys.Space.duration > 0){
      player.actions.punchRelease()
    }
  }

  const update = () => {
    callActions()

    for (const keyCode in state.keys){
      //update input duration
      if(state.keys[keyCode].pressed){
        state.keys[keyCode].duration += 1
      }
      if (state.keys[keyCode].duration > 0 && !state.keys[keyCode].pressed){ //if stopped being pressed
        state.keys[keyCode].duration = 0
      }

      //update lastKey
      if (state.keys[keyCode].pressed){
        state.lastKey = keyCode
        state.sinceLastKey = 0
      }else{
        state.sinceLastKey += 1
      }

      //update lastDirection
      if (keyCode === 'KeyA' && state.keys[keyCode].pressed && state.keys[keyCode].duration === 1){
        state.lastDirection = 'left'
      }
      if (keyCode === 'KeyD' && state.keys[keyCode].pressed && state.keys[keyCode].duration === 1){
        state.lastDirection = 'right'
      }
    }

   
  }

  const pressKey = (keyCode) => {
    state.keys[keyCode].pressed = true
  }

  const unPressKey = (keyCode) => {
    state.keys[keyCode].pressed = false
  }

  return {
    pressKey,
    unPressKey,
    update, 
    state
  }
}

module.exports = Input
