const Respawn = (player) => {

  const update = () => {
    if(player.y < -1000){
      player.x = 0
      player.y = 300
      player.vx = 0
      player.vy = 0
    }
  }

  return {
    update
  }
}

module.exports = Respawn