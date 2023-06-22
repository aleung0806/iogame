module.exports = Object.freeze({
  PLAYER_RADIUS: 40,
  PLAYER_MAX_HP: 100,
  PLAYER_SPEED: 500,
  PLAYER_FIRE_COOLDOWN: .1,

  BULLET_RADIUS: 3,
  BULLET_SPEED: 2000,
  BULLET_DAMAGE: 10,

  SCORE_BULLET_HIT: 20,
  SCORE_PER_SECOND: 1,

  MAP_SIZE: 1000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
  },

  GRAVITY_V: 2000,
  JUMP_V: 800,
  JUMP_MAX_V: 10000,

  MOVE_V: 300,
  MOVE_MAX_V: 750,
  FRICTION_V: 50,

  MAX_PLAYER_SPEED: 2000,
});
