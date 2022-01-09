// const canvasEl = document.querySelector("canvas");
// const canvasContext = canvasEl.getContext("2d");

// // game parameters
// const DELAY_AI = 0.5; // seconds for the AI to take its turn
// const GRID_CIRCLE = 0.7; // circle size as a fraction of the cell size
// const GRID_COLS = 7; // number of game columns
// const GRID_ROWS = 6; // number of game rows
// const MARGIN = 0.02; // margin as a fraction of the shortest screen dimension

// // colors
// const COLOR_BG = "#f9f9f9";
// const COLOR_FRAME = "#382039";
// const COLOR_FRAME_BOTTOM = "#200f21";
// const COLOR_AI = "lawngreen";
// const COLOR_AI_DARK = "darkgreen";
// const COLOR_RI = "orange";
// const COLOR_RI_DARK = " darkgoldenrod";

// const COLOR_TIE = "darkgrey";
// const COLOR_TIE_DARK = "black";
// const COLOR_WIN = "blue";

// // text
// const TEXT_AI = "Computer";
// const TEXT_RI = "Human";
// const TEXT_TIE = "Draw";
// const TEXT_WIN = "Won";

// // The Cell Class
// class Cell {
//   constructor(left, top, w, h, row, col) {
//     this.left = left;
//     this.right = left + w;
//     this.top = top;
//     this.bottom = top + h;
//     this.w = w;
//     this.h = h;
//     this.row = row;
//     this.col = col;
//     this.centerX = left + w / 2;
//     this.centerY = top + h / 2;
//     this.r = (w * GRID_CIRCLE) / 2;
//     this.highlight = null;
//     this.owner = null;
//     this.winner = false;
//   }

// // contains function
// contains(x, y) {
//   return x > this.left && x < this.right && y > this.top && y < this.bottom;
// }

//   // the draw circle function
//   draw(canvasContext) {
//     // owner color
//     let color =
//       this.owner == null ? COLOR_BG : this.owner ? COLOR_RI : COLOR_AI;

//     // drawing the circle
//     canvasContext.fillStyle = color;
//     canvasContext.beginPath();
//     canvasContext.arc(this.centerX, this.centerY, this.r, 0, Math.PI * 2);
//     canvasContext.fill();

//     // draw highlighting
//     if (this.winner || this.highlight != null) {
//       // color
//       color = this.winner ? COLOR_WIN : this.highlight ? COLOR_RI : COLOR_AI;

//       // draw a circle around the perimeter
//       canvasContext.lineWidth = this.r / 4;
//       canvasContext.strokeStyle = color;
//       canvasContext.beginPath();
//       canvasContext.arc(this.centerX, this.centerY, this.r, 0, Math.PI * 2);
//       canvasContext.stroke();
//     }
//   }
// }

// // game variables
// let gameOver,
//   gameTied,
//   grid = [],
//   playersTurn,
//   timeAI;

// // canvas Dimension
// let width, height, margin;
// setDimensions();

// // window resize event listener
// canvasEl.addEventListener("click", click);
// canvasEl.addEventListener("mousemove", highlightGrid);
// window.addEventListener("resize", setDimensions);

// // The Game Loop
// let timeDiff, timeLast;
// requestAnimationFrame(playGame);
// function playGame(timeNow) {
//   // initialize timeLast
//   if (!timeLast) {
//     timeLast = timeNow;
//   }

//   // calculate the time diff
//   timeDiff = (timeNow - timeLast) / 1000; // seconds
//   timeLast = timeNow;

//   // AI
//   AI(timeDiff);

//   // draw functions
//   drawBackground();
//   drawGrid();
//   drawText();

//   // calling the next frame
//   requestAnimationFrame(playGame);
// }

// // checkWin Function
// function checkWin(row, col) {
//   // getting all the cells from each direction
//   let diagonalLeft = [],
//     diagonalRight = [],
//     horizontal = [],
//     vertical = [];
//   for (let i = 0; i < GRID_ROWS; i++) {
//     for (let j = 0; j < GRID_COLS; j++) {
//       // horizontal cells
//       if (i == row) {
//         horizontal.push(grid[i][j]);
//       }
//       // vertical cells
//       if (j == col) {
//         vertical.push(grid[i][j]);
//       }
//       // diagonal left
//       if (i - j == row - col) {
//         diagonalLeft.push(grid[i][j]);
//       }
//       // diagonal right
//       if (i + j == row + col) {
//         diagonalRight.push(grid[i][j]);
//       }
//     }
//   }
//   // if any have four in a row, return a win
//   return (
//     connect4(diagonalLeft) ||
//     connect4(diagonalRight) ||
//     connect4(horizontal) ||
//     connect4(vertical)
//   );
// }

// // the connect4 Function
// function connect4(cells = []) {
//   let count = 0,
//     lastOwner = null;

//   let winningCells = [];
//   for (let i = 0; i < cells.length; i++) {
//     if (cells[i].owner == null) {
//       count = 0;
//       winningCells = [];
//     }
//     // same owner, add to the count
//     else if (cells[i].owner == lastOwner) {
//       count++;
//       winningCells.push(cells[i]);
//     }

//     // new owner, new count
//     else {
//       count = 1;
//       winningCells = [];
//       winningCells.push(cells[i]);
//     }

//     // set the lastOwner
//     lastOwner = cells[i].owner;

//     if (count == 4) {
//       for (let cell of winningCells) {
//         cell.winner = true;
//       }
//       return true;
//     }
//   }
//   return false;
// }

// // click Function
// function click() {
//   if (gameOver) {
//     newGame();
//     return;
//   }

//   // if it is the player's turn, the other player should not be able to click
//   if (!playersTurn) {
//     return;
//   }

//   selectCell();
// }

// // createGrid Function
// function createGrid() {
//   grid = [];

//   // set up cell size and margins
//   let cell, marginX, marginY;

//   // device portrait orientation
//   if (((width - margin * 2) * GRID_ROWS) / GRID_COLS < height - margin * 2) {
//     cell = (width - margin * 2) / GRID_COLS;
//     marginX = margin;
//     marginY = (height - cell * GRID_ROWS) / 2;
//   }
//   // device landscape orientation
//   else {
//     cell = (height - margin * 2) / GRID_ROWS;
//     marginY = margin;
//     marginX = (width - cell * GRID_COLS) / 2;
//   }

//   // populating the grid
//   for (let i = 0; i < GRID_ROWS; i++) {
//     grid[i] = [];

//     for (let j = 0; j < GRID_COLS; j++) {
//       let left = marginX + j * cell;
//       let top = marginY + i * cell;
//       grid[i][j] = new Cell(left, top, cell, cell, i, j);
//     }
//   }
// }

// // drawBackground Function
// function drawBackground() {
//   canvasContext.fillStyle = COLOR_BG;
//   canvasContext.fillRect(0, 0, width, height);
// }

// // drawGrid Function
// function drawGrid() {
//   // frame & bottom
//   let cell = grid[0][0];
//   let frameHeight = cell.h * GRID_ROWS;
//   let frameWidth = cell.w * GRID_COLS;
//   canvasContext.fillStyle = COLOR_FRAME;
//   canvasContext.fillRect(cell.left, cell.top, frameWidth, frameHeight);
//   canvasContext.fillStyle = COLOR_FRAME_BOTTOM;
//   canvasContext.fillRect(
//     cell.left - margin / 2,
//     cell.top + frameHeight - margin / 2,
//     frameWidth + margin,
//     margin
//   );

//   canvasContext.fill();

//   // cells
//   for (let row of grid) {
//     for (let cell of row) {
//       cell.draw(canvasContext);
//     }
//   }
// }

// // drawText Function
// function drawText() {
//   if (!gameOver) {
//     return;
//   }

//   // set up text parameters
//   let size = grid[0][0].h;
//   canvasContext.fillStyle = gameTied
//     ? COLOR_TIE
//     : playersTurn
//     ? COLOR_RI
//     : COLOR_AI;
//   canvasContext.font = size + "px sans-serif";
//   canvasContext.lineJoin = "round";
//   canvasContext.lineWidth = size / 10;
//   canvasContext.strokeStyle = gameTied
//     ? COLOR_TIE_DARK
//     : playersTurn
//     ? COLOR_RI_DARK
//     : COLOR_AI_DARK;
//   canvasContext.textAlign = "center";
//   canvasContext.textBaseline = "middle";

//   // drawing the text
//   let offset = size * 0.6;
//   let text = gameTied ? TEXT_TIE : playersTurn ? TEXT_RI : TEXT_AI;
//   if (gameTied) {
//     canvasContext.strokeText(text, width / 2, height / 2);
//     canvasContext.fillText(text, width / 2, height / 2);
//   } else {
//     canvasContext.strokeText(text, width / 2, height / 2 - offset);
//     canvasContext.fillText(text, width / 2, height / 2 - offset);
//     canvasContext.strokeText(TEXT_WIN, width / 2, height / 2 + offset);
//     canvasContext.fillText(TEXT_WIN, width / 2, height / 2 + offset);
//   }
// }

// // AI Function
// function AI(diff) {
//   if (playersTurn || gameOver) {
//     return;
//   }

//   // count down -> delay the AI until it makes its selection
//   if (timeAI > 0) {
//     timeAI -= diff;
//     if (timeAI <= 0) {
//       selectCell();
//     }
//     return;
//   }

// // *-*-*-*-*-*-*-*-*-Setting Up the AI Algorithm
// // creating the options array
// let options = [];
// options[0] = []; // AI wins
// options[1] = []; // blocks the RI
// options[2] = []; // not an important move
// options[3] = []; // lets the RI win

// // looping through each col
// let cell;
// for (let i = 0; i < GRID_COLS; i++) {
//   cell = highlightCell(grid[0][i].centerX, grid[0][i].centerY);

//   // column full, go to the next col
//   if (cell == null) {
//     continue;
//   }

//   // first priority, AI wins
//   cell.owner = playersTurn; // AI Turn
//   if (checkWin(cell.row, cell.col)) {
//     options[0].push(i);
//   } else {
//     // second priority, AI blocks the RI
//     cell.owner = !playersTurn; // RI
//     if (checkWin(cell.row, cell.col)) {
//       options[1].push(i);
//     } else {
//       cell.owner = playersTurn;

//       // check the cell above
//       if (cell.row > 0) {
//         grid[cell.row - 1][cell.col].owner = !playersTurn;

//         // forth priority, do not let the player win
//         if (checkWin(cell.row - 1, cell.col)) {
//           options[3].push(i);
//         }

//         // third priority, not an important move
//         else {
//           options[2].push(i);
//         }

//         // deselect the cell above
//         grid[cell.row - 1][cell.col].owner = null;
//       }

//       // no row above, third priority
//       else {
//         options[2].push(i);
//       }
//     }
//   }
//   // cancel the highlight and selection
//   cell.highlight = null;
//   cell.owner = null;
// }

// // clear the winning cells
// for (let row of grid) {
//   for (let cell of row) {
//     cell.winner = false;
//   }
// }

// // randomly select a column in a priority order
// let col;
// if (options[0].length > 0) {
//   col = options[0][Math.floor(Math.random() * options[0].length)];
// } else if (options[1].length > 0) {
//   col = options[1][Math.floor(Math.random() * options[1].length)];
// } else if (options[2].length > 0) {
//   col = options[2][Math.floor(Math.random() * options[2].length)];
// } else if (options[3].length > 0) {
//   col = options[3][Math.floor(Math.random() * options[3].length)];
// }

//   // highlight the selected cell
//   highlightCell(grid[0][col].centerX, grid[0][col].centerY);
//   timeAI = DELAY_AI;
// }

// // highlightCell Function
// function highlightCell(x, y) {
//   let col = null; // identify the chosen col
//   for (let row of grid) {
//     for (let cell of row) {
//       // clear the existing highlighting
//       cell.highlight = null;

//       // get col
//       if (cell.contains(x, y)) {
//         col = cell.col;
//       }
//     }
//   }

//   // if no col is still chosen
//   if (col == null) {
//     return;
//   }

//   // highlight the first unoccupied cell
//   for (let i = GRID_ROWS - 1; i >= 0; i--) {
//     if (grid[i][col].owner == null) {
//       grid[i][col].highlight = playersTurn;
//       return grid[i][col];
//     }
//   }

//   return null;
// }

// // highlightGrid Function
// function highlightGrid(e) {
//   if (!playersTurn || gameOver) {
//     return;
//   }

//   highlightCell(e.clientX, e.clientY);
// }

// // newGame Function
// function newGame() {
//   // coin toss
//   playersTurn = Math.random() < 0.5;
//   gameOver = false;
//   gameTied = false;
//   createGrid();
// }

// // selectCell Function
// function selectCell() {
//   let highlighting = false;
//   OUTER: for (let row of grid) {
//     for (let cell of row) {
//       if (cell.highlight != null) {
//         highlighting = true;
//         cell.highlight = null;
//         cell.owner = playersTurn;
//         if (checkWin(cell.row, cell.col)) {
//           gameOver = true;
//         }
//         break OUTER;
//       }
//     }
//   }

// // do not allow selection if there is no highlighting
// if (!highlighting) {
//   return;
// }

// // check for a tied game
// if (!gameOver) {
//   gameTied = true;
//   OUTER: for (let row of grid) {
//     for (let cell of row) {
//       if (cell.owner == null) {
//         gameTied = false;
//         break OUTER;
//       }
//     }
//   }
//   if (gameTied) {
//     gameOver = true;
//   }
// }

//   // switch the player if there is no game over
//   if (!gameOver) {
//     playersTurn = !playersTurn;
//   }
// }

// // setDimensions Function
// function setDimensions() {
//   width = window.innerWidth;
//   height = window.innerHeight;
//   canvasEl.width = width;
//   canvasEl.height = height;
//   margin = MARGIN * Math.min(height, width);

//   newGame();
// }

// live life and believe in yourself
// creativity is intelligence having fun
// do the next right thing

/*
my code below
*/

const canvasEl = document.querySelector("canvas");
const canvasCTX = canvasEl.getContext("2d");

// the game's paramaters (as a percentage of screen size to make it responsive)

const DELAY_AI = 0.5; // time in seconds between the RI's completed turn and the AI's selection
const GRID_CIRCLE = 0.7; // circle size as a percentage of the cell size
const GRID_COLS = 7; // number of game columns
const GRID_ROWS = 6; // number of game rows
const MARGIN = 0.02; // margin as a percentage of the shortest screen dimension

// colors

const COLOR_BG = "mintcream";
const COLOR_FRAME = "cornflowerblue";
const COLOR_FRAME_BOTTOM = "peachpuff";
const COLOR_AI = "fuchsia";
const COLOR_AI_DARK = "olive";
const COLOR_RI = "skyblue";
const COLOR_RI_DARK = "navy";

const COLOR_TIE = "darkgrey";
const COLOR_TIE_DARK = "black";
const COLOR_WIN = "lime";

//text
const TEXT_AI = "Old age";
const TEXT_RI = "You";
const TEXT_TIE = "Draw";
const TEXT_WIN = "killed Betty!";

// the cell class
class Cell {
  constructor(left, top, w, h, row, col) {
    this.left = left;
    this.right = left + w;
    this.top = top;
    this.bottom = top + h;
    this.w = w;
    this.h = h;
    this.row = row;
    this.col = col;
    this.centerX = left + w / 2;
    this.centerY = top + h / 2;
    this.r = (w * GRID_CIRCLE) / 2;
    this.highlight = null;
    this.owner = null;
    this.winner = false;
  }

  // contains function
  contains(x, y) {
    return x > this.left && x < this.right && y > this.top && y < this.bottom;
  }

  // the drawCircle function
  draw(canvasCTX) {
    // owner color
    let color =
      this.owner == null ? COLOR_BG : this.owner ? COLOR_RI : COLOR_AI;

    // drawing the circle
    canvasCTX.fillStyle = color;
    canvasCTX.beginPath();
    canvasCTX.arc(this.centerX, this.centerY, this.r, 0, Math.PI * 2);
    canvasCTX.fill();

    // draw highlight circle
    if (this.winner || this.highlight != null) {
      color = this.winner ? COLOR_WIN : this.highlight ? COLOR_RI : COLOR_AI;

      canvasCTX.lineWidth = this.r / 4;
      canvasCTX.strokeStyle = color;
      canvasCTX.beginPath();
      canvasCTX.arc(this.centerX, this.centerY, this.r, 0, Math.PI * 2);
      canvasCTX.stroke();
    }
  }
}

// game variables
let gameOver,
  gameTied,
  grid = [],
  playersTurn,
  timeAI;

// canvas dimensions

let width, height, margin;
setDimensions();

// the window resize event listener
canvasEl.addEventListener("click", click);
canvasEl.addEventListener("mousemove", highlightGrid);
window.addEventListener("resize", setDimensions);

// THE GAME LOOP -=-=-=--=--=--=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=

let timeDiff, timeLast;
requestAnimationFrame(playGame);
function playGame(timeNow) {
  // initialize the timeLast
  if (!timeLast) {
    timeLast = timeNow;
  }

  // calculating the time difference
  timeDiff = timeNow - timeLast / 1000; // this will calculate the time in seconds
  timeLast = timeNow;

  AI(timeDiff);

  // draw functions
  drawBackground();
  drawGrid();
  drawText();

  // calling the next frame
  requestAnimationFrame(playGame);
}

// checkWin function
function checkWin(row, col) {
  let diagonalLeft = [],
    diagonalRight = [],
    horizontal = [],
    vertical = [];
  for (let w = 0; w < GRID_ROWS; w++) {
    for (let b = 0; b < GRID_COLS; b++) {
      // horizontal cells
      if (w == row) {
        horizontal.push(grid[w][b]);
      }
      // vertical cells
      if (b == col) {
        vertical.push(grid[w][b]);
      }
      // diagonal left
      if (w - b == row - col) {
        diagonalLeft.push(grid[w][b]);
      }
      // diagonal right
      if (w + b == row + col) {
        diagonalRight.push(grid[w][b]);
      }
    }
  }
  // if any have FOUR IN A row
  return (
    connect4(diagonalLeft) ||
    connect4(diagonalRight) ||
    connect4(horizontal) ||
    connect4(vertical)
  );
}

// the CONNECT FOUR FUNCTION -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function connect4(cells = []) {
  let count = 0,
    lastOwner = null;

  let winningCells = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].owner == null) {
      count = 0;
      winningCells = [];
    }
    // same owner, add to the count
    else if (cells[i].owner == lastOwner) {
      count++;
      winningCells.push(cells[i]);
    }

    // new owner, new count
    else {
      count = 1;
      winningCells = [];
      winningCells.push(cells[i]);
    }

    // set the lastOwner
    lastOwner = cells[i].owner;

    if (count == 4) {
      for (let cell of winningCells) {
        cell.winner = true;
      }
      return true;
    }
  }
  return false;
}

// the click function

function click() {
  if (gameOver) {
    newGame();
    return;
  }

  // if it is the AI player's turn, the RI player (you) should not be able to click
  if (!playersTurn) {
    // return;
  }

  selectCell();
}

// the highlightCell function
function highlightCell(x, y) {
  let col = null;
  for (let row of grid) {
    for (let cell of row) {
      cell.highlight = null;

      if (cell.contains(x, y)) {
        col = cell.col;
      }
    }
  }

  // if no col is chosen
  if (col == null) {
    return;
  }

  // highlighting the first unoccupied cell
  for (let w = GRID_ROWS - 1; w >= 0; w--) {
    if (grid[w][col].owner == null) {
      grid[w][col].highlight = playersTurn;
      return grid[w][col];
    }
  }
  return null;
}

// the highlight grid function
function highlightGrid(e) {
  if (!playersTurn || gameOver) {
    return;
  }

  highlightCell(e.clientX, e.clientY);
}

// newGame function
function newGame() {
  // coin flip
  playersTurn = Math.random() < 0.5;
  gameOver = false;
  gameOver = false;
  createGrid();
}

// the createGrid function
function createGrid() {
  grid = [];

  // set up the cell size and margins
  let cell, marginX, marginY;

  // device portrait orientation
  if (((width - margin * 2) * GRID_ROWS) / GRID_COLS < height - margin * 2) {
    cell = (width * margin * 2) / GRID_COLS;
    marginX = margin;
    marginY = (height - cell * GRID_ROWS) / 2;
  } else {
    // device landscape orientation
    cell = (height - margin * 2) / GRID_ROWS;
    marginY = margin;
    marginX = (width - cell * GRID_COLS) / 2;
  }

  // populating the grid
  for (let w = 0; w < GRID_ROWS; w++) {
    grid[w] = [];

    for (let b = 0; b < GRID_COLS; b++) {
      let left = marginX + b * cell;
      let top = marginY + w * cell;
      grid[w][b] = new Cell(left, top, cell, cell, w, b);
    }
  }
}

// drawBackground function

function drawBackground() {
  canvasCTX.fillStyle = COLOR_BG;
  canvasCTX.fillRect(0, 0, width, height);
}

// draw grid function

function drawGrid() {
  let cell = grid[0][0];
  let frameHeight = cell.h * GRID_ROWS;
  let frameWidth = cell.w * GRID_COLS;
  canvasCTX.fillStyle = COLOR_FRAME;
  canvasCTX.fillRect(cell.left, cell.top, frameWidth, frameHeight);
  canvasCTX.fillStyle = COLOR_FRAME_BOTTOM;
  canvasCTX.fillRect(
    cell.left - margin / 2,
    cell.top + frameHeight - margin / 2,
    frameWidth + margin,
    margin
  );

  canvasCTX.fill();

  // cells

  for (let row of grid) {
    for (let cell of row) {
      cell.draw(canvasCTX);
    }
  }
}

// the drawText function

function drawText() {
  if (!gameOver) {
    return;
  }

  // set up text parameters
  let size = grid[0][0].h;
  canvasCTX.fillStyle = gameTied
    ? COLOR_TIE
    : playersTurn
    ? COLOR_RI
    : COLOR_AI;
  canvasCTX.font = size + "px sans-serif";
  canvasCTX.lineJoin = "round";
  canvasCTX.lineWidth = size / 10;
  canvasCTX.strokeStyle = gameTied
    ? COLOR_TIE_DARK
    : playersTurn
    ? COLOR_RI_DARK
    : COLOR_AI_DARK;
  canvasCTX.textAlign = "center";
  canvasCTX.textBaseline = "middle";

  // actually drawing the text
  let offset = size * 0.6;
  let text = gameTied ? TEXT_TIE : playersTurn ? TEXT_RI : TEXT_AI;
  if (gameTied) {
    canvasCTX.strokeText(text, width / 2, height / 2);
    canvasCTX.fillText(text, width / 2, height / 2);
  } else {
    canvasCTX.strokeText(text, width / 2, height / 2 - offset);
    canvasCTX.fillText(text, width / 2, height / 2 - offset);
    canvasCTX.strokeText(TEXT_WIN, width / 2, height / 2 + offset);
    canvasCTX.fillText(TEXT_WIN, width / 2, height / 2 + offset);
  }
}

// -=-=-=--=-=-==-=-=- AI -=-=-=-=-=-=-=-=-=-= //

function AI(diff) {
  if (playersTurn || gameOver) {
    return;
  }

  // delay the AI's selection so it appears to have thought about it and the game appears more natural
  if (timeAI > 0) {
    timeAI -= diff;
    if (timeAI <= 0) {
      selectCell();
    }
    return;
  }

  // |---------- the AI algorithm ----------|
  // the array of options
  let options = [];
  options[0] = []; // where the AI makes a winning selection
  options[1] = []; // in which the RI decides to block the RI
  options[2] = []; // making a strategic move, but one that does not result in a block, a win, or loss to RI
  options[3] = []; // a move that results in an RI win

  // loop through each column and check for a win
  let cell;
  for (let w = 0; w < GRID_COLS; w++) {
    cell = highlightCell(grid[0][w].centerX, grid[0][w].centerY);

    // if the column is full, go to the next column
    if (cell == null) {
      continue;
    }

    // if the AI wins - FIRST option
    cell.owner = playersTurn; // in this case, the AI's turn
    if (checkWin(cell.row, cell.col)) {
      options[0].push(w);
    } else {
      // SECOND option, AI blocks the RI
      cell.owner = !playersTurn; // in this case, the RI's turn
      if (checkWin(cell.row, cell.col)) {
        options[1].push(w);
      } else {
        cell.owner = playersTurn;

        //check the cell above
        if (cell.row > 0) {
          grid[cell.row - 1][cell.col].owner = !playersTurn;

          // the FOURTH option, do not let the player win
          if (checkWin(cell.row - 1, cell.col)) {
            options[3].push(w);
          }

          // the THIRD option, the normal move
          else {
            options[2].push(w);
          }

          // deselect the cell above
          grid[cell.row - 1][cell.col].owner = null;
        }

        // if there is no available row above, THIRD option
        else {
          options[2].push(w);
        }
      }
    }
    // cancel the highlight and selection
    cell.highlight = null;
    cell.owner = null;
  }

  // clear the winning cells
  for (let row of grid) {
    for (let cell of row) {
      cell.winner = false;
    }
  }

  // select a random column in an order of priority
  let col;
  if (options[0].length > 0) {
    col = options[0][Math.floor(Math.random() * options[0].length)];
  } else if (options[1].length > 0) {
    col = options[1][Math.floor(Math.random() * options[1].length)];
  } else if (options[2].length > 0) {
    col = options[2][Math.floor(Math.random() * options[2].length)];
  } else if (options[3].length > 0) {
    col = options[3][Math.floor(Math.random() * options[3].length)];
  }

  // highlighting the selected cell
  highlightCell(grid[0][col].centerX, grid[0][col].centerY);

  timeAI = DELAY_AI;
}

// the selectCell function
function selectCell() {
  let highlighting = false;
  OUTER: for (let row of grid) {
    for (let cell of row) {
      if (cell.highlight != null) {
        highlighting = true;
        cell.highlight = null;
        cell.owner = playersTurn;
        if (checkWin(cell.row, cell.col)) {
          gameOver = true;
        }
        break OUTER;
      }
    }
  }

  // do not allow selection if there is no highlighting
  if (!highlighting) {
    return;
  }

  // check for a tied game
  if (!gameOver) {
    gameTied = true;
    OUTER: for (let row of grid) {
      for (let cell of row) {
        if (cell.owner == null) {
          gameTied = false;
          break OUTER;
        }
      }
    }
    if (gameTied) {
      gameOver = true;
    }
  }

  // switch the playa if the game is not yet over
  if (!gameOver) {
    playersTurn = !playersTurn;
  }
}

// setDimensions function

function setDimensions() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvasEl.width = width;
  canvasEl.height = height;
  margin = MARGIN * Math.min(height, width);

  newGame();
}
