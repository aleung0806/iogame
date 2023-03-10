import { gameUpdate } from "./networking"

const RENDER_DELAY = 100

let currentState = {}

export const processGameUpdate = (state) => {
  currentState = state
}

export const getCurrentState = () => {
  return currentState
}