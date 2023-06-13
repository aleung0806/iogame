const { PunchBox } = require('./hitbox')
const { hitboxes } = require('./state')

const Punch = (player) => {

  let punchCharge = 0
  
  const charge = () => {
    punchCharge += 1
  }

  const release = () => {
    if (player.cooldowns.punch === 0){
      player.cooldowns.punch = 10
      player.cooldowns.punchReleaseAnimation = 5
      hitboxes.push(new PunchBox(player, punchCharge))
    }
    punchCharge = 0
  }

  return {
    charge, 
    release
  }
}


module.exports ={
  Punch
}