const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')
const constants = require('../shared/constants')
const Animate = require('./animate')

const Actions = (player) => {

  let animate = player.animate

  let punchPower = 100
  let punchCooldown = 0



  const callActions = () => {
    let input = player.input

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

  }

  const moveLeft = () => {
    player.vx = Math.max(-constants.MOVE_MAX_V, player.vx - constants.MOVE_V)
  }

  const moveRight = () => {
    player.vx = Math.min(constants.MOVE_MAX_V, player.vx + constants.MOVE_V)

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