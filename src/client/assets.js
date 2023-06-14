const ASSET_NAMES = [
  //'sphere.svg', 
  'normal.png', 
  'moveL.png', 
  'punchChargeL.png',
  'punchReleaseL.png',

  'moveR.png', 
  'punchChargeR.png',
  'punchReleaseR.png',
]

const assets = {}

const loadAsset = (assetName) => new Promise((resolve, reject) => {
  const asset = new Image()
  asset.onload = () => {
    console.log(`${assetName} loaded`)
    assets[assetName] = asset
    resolve()
  }
  asset.src = `/assets/bolita/${assetName}`
})


export const loadAssets = () => {
  return Promise.all(ASSET_NAMES.map(loadAsset))
}

export const getAsset = assetName => assets[assetName]
