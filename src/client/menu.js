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
      menu.style = 'visibility: hidden'
      canvas.style = 'visibility: visible'
      resolve()
    }
  })
})

const autoJoinGamePromise = new Promise((resolve, reject) => {
  sendJoinGame({
    username: 'P1',
    color: '#eac4d5'
  })
  menu.style = 'visibility: hidden'
  canvas.style = 'visibility: visible'
  resolve()
})

export const joinGame = () => joinGamePromise
export const autoJoinGame = () => autoJoinGamePromise
