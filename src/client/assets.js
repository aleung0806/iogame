const ASSET_NAMES = ['sphere.svg', 'bullet.svg', 'bolita.png', 'bolita_clear.png']

const assets = {}

const loadAsset = (assetName) => new Promise((resolve, reject) => {
  const asset = new Image()
  asset.onload = () => {
    console.log(`${assetName} loaded`)
    assets[assetName] = asset
    resolve()
  }
  asset.src = `/assets/${assetName}`
})


export const loadAssets = () => {
  return Promise.all(ASSET_NAMES.map(loadAsset))
}

export const getAsset = assetName => assets[assetName]
