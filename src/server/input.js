const Input = () => {
  let state = {
    lastPressed: '',
    sincePressedElapsed: 0, //in frames

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
    if (state.keys.KeyW.pressed === true && state.keys.KeyW.duration < 1){
      player.actions.doubleJump.jump()
    }
    if (state.keys.KeyA.pressed === true){
      player.moveLeft()
    }
    if (state.keys.KeyD.pressed === true){
      player.moveRight()
    }
    if (state.keys.Space.pressed === true){
      player.actions.punch.charge()
    }
    if (state.keys.Space.pressed === false && state.keys.Space.duration > 0){
      player.actions.punch.release()
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

      //update lastPressed
      if (state.keys[keyCode].pressed){
        state.lastPressed = keyCode
        state.sinceLastPressed = 0
      }else{
        state.sinceLastPressed += 1
      }

    }

  }

  return {
    update, state
  }
}

module.exports = {
  Input
}