const constants = require('../shared/constants')
const { sendJoinGame } = require('./networking')

let menu = document.getElementById('start-menu')
let form = document.getElementById('username-form')
let input = document.getElementById('username-input')

const joinGamePromise = new Promise((resolve, reject) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
      console.log(`menu: player ${input.value} joined the game`)

      sendJoinGame(input.value, window.innerWidth, window.innerHeight)
      input.value = ''

      menu.style = 'display: none'
      resolve()
    }
  })
})

export const joinGame = () => joinGamePromise
