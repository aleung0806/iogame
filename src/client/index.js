import './css/main.css'
import { connectToServer } from './networking'
import { loadAssets } from './assets'
import { startRender } from './render'
import { startCapturingInput } from './input'
import { joinGame } from './menu'


const loadGame = () => {
  return Promise.all([
    connectToServer(),
    loadAssets(),
    joinGame()
  ])
}

loadGame().then(() => {
  console.log('loaded')
  startRender()
  startCapturingInput()
})

