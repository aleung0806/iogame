const { Idle, Attack, SpinAttack, SwingAttack } = require('./animation')
const assetMap = require('./assetMap.json')

const Animate = (player) => {
  let state =  {
    asset: 'look/neutral/10.png'
  }

  let count = 0
  let animation = new Idle(player.lookDirection)

  const attack = () => {
    console.log('animate: attack')
    count = 0
    if (player.lookDirection === 'neutral'){
      player.lookDirection = 'right'
    }
    animation = new Attack(player.lookDirection)
  }

  const spinAttack = () => {
    console.log('animate: spinAttack')
    count = 0

    animation = new SpinAttack()
  }

  const swingAttack = () => {
    console.log('animate: swingAttack')
    count = 0

    animation = new SwingAttack()
  }
  const look = () => {
    if (animation.type !== 'idle' || animation.direction !== player.lookDirection){
      console.log('animate: look')
      count = 0
      animation = new Idle(player.lookDirection)
    }
  }

  const update = () => {

    if(Math.floor(count) >= animation.frameMap.length - 1){
      count = 0
      animation = new Idle(player.lookDirection)
    }
    //console.log(count)
    state.asset = animation.frameMap[Math.floor(count)] 

    count += 1/8 * animation.frameMultiplier
  }

  const jump = () => {

  }


  return {
    // punchCharge,
    // punchRelease,
    jump,
    look,
    attack,
    spinAttack,
    swingAttack,
    // lookUp, 
    // lookRight,
    // lookLeft,
    // lookDown,


    update,
    state
  }

}
module.exports = Animate




