const constants = require('../shared/constants')
const { sendJoinGame } = require('./networking')

let menu = document.getElementById('start-menu')
let form = document.getElementById('username-form')
let input = document.getElementById('username-input')
let colorSelect = document.getElementById('color-select')

const canvas = document.getElementById('game-canvas')


const joinGamePromise = new Promise((resolve, reject) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
      sendJoinGame({
        username: input.value,
        color: colorSelect.value
      })

      input.value = ''
      menu.style = 'display: flex'
      resolve()
    }
  })
})

const autoJoinGamePromise = new Promise((resolve, reject) => {
  sendJoinGame({
    username: 'player one',
    color: '#eac4d5'
  })
  menu.style = 'display: none'
  canvas.style = 'display: flex'
  resolve()
})

export const joinGame = () => joinGamePromise
export const autoJoinGame = () => autoJoinGamePromise
