
var DEBUG = true;

(function() {
  /**
   *
   * Global use of console.log so it
   * can be easily turned off.
   *
   **/
  function log(content) {
    if (DEBUG) {
      console.log(content);
    }
  }

  /**
   *
   * Default initial state.
   *
   **/
  var defaultState = {
    startingPos: {
      x: 4,
      y: 3,
    },
    positions: [],
  };

  /**
   *
   * Testing matrix, this should come from a config file or be dynamically
   * generated or something.
   *
   **/
  var matrix = [
    ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
    ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1']
  ];

  // State Methods

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
  function getStartingPos() {
    log('getStartingPos');
    return defaultState.startingPos;
  }

  /**
   *
   * @name getCurrentPos
   * @description
   *
   * Returns current position from defaultState.
   *
   * @returns {Object} positions[last] - x and y positions
   *
   **/
  function getCurrentPos() {
    log('getCurrentPos');
    return defaultState.positions[defaultState.positions.length - 1];
  }

  /**
   *
   * @name setCurrentPos
   * @description
   *
   * Set new position on defaultState.
   *
   * @param {Object} newPos - Object with new x and y positions
   *
   **/
  function setCurrentPos(newPos) {
    log('setCurrentPos');
    defaultState.positions.push(newPos);
  }

  /**
   *
   * Map between matrix codes and class names.
   *
   **/
  var blockClass = {
    '0': 'free',
    '1': 'wall',
    'S': 'snake',
  }

  /**
   *
   * Map between keys and functions.
   *
   **/
  var keys = {
    38: moveUp,
    37: moveLeft,
    39: moveRight,
    40: moveDown,
  };

  // Movements
  function moveLeft() {
    log('moveLeft');

    return move(0, -1);
  }

  function moveRight() {
    log('moveRight');

    return move(0, 1);
  }

  function moveDown() {
    log('moveDown');

    return move(1, 0);
  }

  function moveUp() {
    log('moveUp');

    return move(-1, 0);
  }

  /**
   *
   * @name move
   * @description
   *
   * Returns an object with the current position and the
   * new position.
   *
   * @param {String} x - X position to move to.
   * @param {String} y - Y position to move to.
   *
   * @returns {Object} positions - An object with current position and next position.
   *
   **/
  function move(x, y) {
    var current = getCurrentPos();

    return {
      current: {
        x: current.x,
        y: current.y,
      },
      next: {
        x: current.x + x,
        y: current.y + y,
      }
    }
  }

  /**
   *
   * @name listener
   * @description
   *
   * Filters if key codes exist on the current key map and
   * detects if new position is valid.
   *
   * @param {Object} evnt - Event object.
   *
   **/
  function controller(evnt) {
    var key = evnt.keyCode;

    if (keys[key]) {
      var newState = keys[key]();

      if (hitDetection(newState.next)) {
        clean(newState.current);
        updatePosition(newState.next);
      } else {
        log('nope');
      }
    }
  };

  document.addEventListener('keydown', controller);

  /**
   *
   * @name hitDetection
   * @description
   *
   * Detects if next move is valid
   *
   * @param {Object} next - Object with new positions
   *
   * @returns {Boolean|Object}
   **/
  function hitDetection(next) {
    var nextSpace = matrix[next.x][next.y];

    if (nextSpace === '1') {
      return false;
    }

    return next;
  }

  /**
   *
   * @name clean
   * @description
   *
   * Cleans old position and DOM
   *
   **/
  function clean(pos) {
    log('clean');
    matrix[pos.x][pos.y] = '0';
    var app = document.getElementById('app');
    app.innerHTML = '';
  }

  /**
   *
   * @name render
   * @description
   *
   * Renders in DOM next frame. This can be improved to only
   * repaint what is needed. As it is only DOM elements it's not
   * as necessary yet.
   *
   * @param {Array} matrix - Current matrix of positions.
   *
   **/
  function render(matrix) {
    log('render');
    var app = document.getElementById('app');
    var cont = document.createElement('div');

    matrix.forEach(row => {
      var rowEl = document.createElement('div');
      rowEl.className = 'row';

      row.forEach(col => {
        var colEl = document.createElement('div');
        colEl.className = 'block ' + blockClass[col];
        rowEl.appendChild(colEl);
      });

      cont.appendChild(rowEl);
    });

    app.appendChild(cont);
  }

  /**
   *
   * @name updatePosition
   * @description
   *
   * Update position on state and matrix, and renders.
   *
   * @param {Object} pos - New position.
   *
   **/
  function updatePosition(pos) {
    log('updatePosition');
    setCurrentPos(pos);
    matrix[pos.x][pos.y] = 'S';
    render(matrix);
  }

  updatePosition(getStartingPos());
})();

