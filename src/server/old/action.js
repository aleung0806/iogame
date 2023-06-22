const assetMap = require('./assetMap.json')
const { hitboxes, players } = require('./state')

const chargeAttack = (player) => {
  const keyCode = 'KeyL'
  const animationFrames = assetMap.slam[0]
  const frameCount = 0
  const animationSpeed = 1
  const knockback = 5000
  const hitboxRadius = 50

  let player = player


  let attackPower = 0
  let knockbackx = 0
  let knockbacky = 0


  const frames = {
      'down': {
        asset: () => {
          if (player.direction === 'right'){
            
          }
        }
      },
      'hold': [
        {
          asset: animationFrames[1],
          action: () => {
            attackPower += 1
          }
        }
      ],
      'release': {
        asset: animationFrames[3],
      },
      'up': [
        {
          asset: animationFrames[4],
        },
        {
          asset: animationFrames[5],
        },
        {
          asset: animationFrames[6],
          action: () => {
            hitboxes.push({
              x: player.x,
              y: player.y,
              radius: 50
            })
          }
        },
        {
          asset: animationFrames[7],
        },
        {
          asset: animationFrames[8],
        }
      ]
    }


  }