import Log from './log';

export default class Game {
  constructor() {
    log('Game constructor');
    this.defaultState = {
      positions: [],
      snakeLength: 1,
      startingPos: {
        x: 4,
        y: 3,
      },
    }
  }

  /**
   *
   * @name getStartingPos
   * @description
   *
   * Returns starting position from defaultState.
   *
   * @returns {Object} startingPos - x and y positions
   *
   **/
  getStartingPos() {
    log('getStartingPos');
    return this.defaultState.startingPos;
  }


  /**
   *
   * @name init
   * @description
   *
   *
   **/
  init() {
    log('init Game');
    this.matrix = new Matrix();
  }
}
