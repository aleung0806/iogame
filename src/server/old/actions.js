const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')
const constants = require('../shared/constants')
const Animate = require('./animate')

const Actions = (player) => {

  let animate = player.animate

  let punchPower = 100
  let punchCooldown = 0
  let jumpChain = 0


  const callActions = () => {
    let input = player.input

    if (input.state.keys.KeyW.down){
      player.lookDirection = 'up'
    } else if (input.state.keys.KeyS.down){
      player.lookDirection = 'down'

    } else if (input.state.keys.KeyA.down){
      player.lookDirection = 'left'

    } else if (input.state.keys.KeyD.down){
      player.lookDirection = 'right'
    }

    if (input.state.keys.KeyA.down){
      moveLeft()

    } else if (input.state.keys.KeyD.down){
      moveRight()
    }


    if (input.state.keys.Space.down && input.state.keys.Space.duration === 0){
      jump()
    }

    if (input.state.keys.KeyJ.down && input.state.keys.KeyJ.duration === 0){
      attack()
    }

    if (input.state.keys.KeyK.down && input.state.keys.KeyK.duration === 0){
      spinAttack()
    }else if (!input.state.keys.KeyK.down && input.state.keys.KeyK.duration > 0){
      //spinAttackRelease()
    }

    if (input.state.keys.KeyL.down && input.state.keys.KeyL.duration === 0){
      swingAttack()
    }
    // if (input.state.keys.Space.down){
    //   punchCharge()
    // }
    
    // if (!input.state.keys.Space.down && input.state.keys.Space.duration > 0){
    //   punchRelease()
    // }
    // if (input.state.keys.KeyJ.down && input.state.keys.KeyJ.duration === 0){
    //   console.log('quickpunch')
    //   punchRelease()
    // }
  }

  const punchCharge = () => {
    if (punchCooldown === 0){
      punchPower += 1
      animate.punchCharge()
    }
  }

  const punchRelease = () => {
    let punchDirection
    if (player.input.state.keys.KeyW.down){
      punchDirection = 'up'
    }else if (player.input.state.keys.KeyS.down){
      punchDirection = 'down'
    }else {
      punchDirection = player.input.state.lastDirection
    }
    console.log(punchDirection, player.input.state)
    hitboxes.push(new PunchBox(player, punchPower, punchDirection))
    punchCooldown = 10
    punchPower = 1000
    animate.punchRelease()
  }


  const jump = () => {
    if (player.onPlatform){
      player.vy = constants.JUMP_V
      jumpChain = 1 
      animate.jump()
    } else if (jumpChain === 1){ //doublejump
      player.vy = constants.JUMP_V
      jumpChain += 1
      animate.jump()
    }
  }



  const attack = () => {
    animate.attack()
  }

  const spinAttack = () => {
    animate.spinAttack()
  }

  const swingAttack = () => {
    animate.swingAttack()
  }

  const update = () => {
    callActions()
    //update punch cooldown
    punchCooldown = Math.max(0, punchCooldown - 1)

    //reset jump number if landed after jumping
    if (jumpChain >= 1 && player.onPlatform && player.vy <= 0){
      jumpChain = 0
    }

    //tweaking gravity during jumps
    if(jumpChain > 0 && player.vy < 0){ //'better jump' falling
      player.gravity = constants.GRAVITY_V * 2
    }
    if(jumpChain > 0 && !player.input.state.keys.KeyW.down && player.vy > 0){ //
      player.gravity = constants.GRAVITY_V * 2
    }
    if (jumpChain === 0){
      player.gravity = constants.GRAVITY_V
    }


  }



 return {
    update,
    jump,
    punchRelease,
    punchCharge,
    moveLeft,
    moveRight
  }

}

module.exports = Actions