const ASSET_NAMES = ['ship.svg', 'bullet.svg']

const assets = {}

const loadAsset = (assetName) => {
  return new Promise((resolve, reject) => {
    const asset = new Image()
    asset.onload = () => {
      console.log(`${assetName} loaded`)
      assets[assetName] = asset
      resolve()
    }
    asset.src = `/assets/${assetName}`
  })
}


export const loadAssets = () => {
  return Promise.all(ASSET_NAMES.map(loadAsset))
}

export const getAsset = assetName => assets[assetName]
