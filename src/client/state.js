import { gameUpdate } from "./networking"

const RENDER_DELAY = 100

let currentState = {
  me: {
    id: '000',
    username: 'player 1',
    x: 0,
    y: 0,
    direction: 0
  },
  players: [
    {
      id: '001',
      username: 'player 2',
      x: -100,
      y: 200,
      direction: 180
    },
    {
      id: '002',
      username: 'player 3',
      x: 250,
      y: 350,
      direction: 90
    }
  ],
}

export const processGameUpdate = (state) => {
  currentState = state
  console.log(`new state is ${JSON.stringify(currentState, 2, null)}`)

}

export const getCurrentState = () => {
  return currentState
}