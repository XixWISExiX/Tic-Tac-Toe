import { body, grid, popUp, popUpText } from "./DOMref.js";

const gameBoard = (() => {
  let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  function validMove(move) {
    if (board[move] === "-") return true;
    return false;
  }
  function findWinner(icon) {
    // All rows are equal
    if (board[0] === icon && board[1] === icon && board[2] === icon)
      return true;
    if (board[3] === icon && board[4] === icon && board[5] === icon)
      return true;
    if (board[6] === icon && board[7] === icon && board[8] === icon)
      return true;
    // All columns are equal
    if (board[0] === icon && board[3] === icon && board[6] === icon)
      return true;
    if (board[1] === icon && board[4] === icon && board[7] === icon)
      return true;
    if (board[2] === icon && board[5] === icon && board[8] === icon)
      return true;
    // All diagonals are equal
    if (board[0] === icon && board[4] === icon && board[8] === icon)
      return true;
    if (board[2] === icon && board[4] === icon && board[6] === icon)
      return true;
    return false;
  }

  function findTie() {
    for (let cell of board) if (cell === "-") return false;
    return true;
  }
  return { board, validMove, findWinner, findTie };
})();

const player = (icon) => {
  function move(coordinate) {
    gameBoard.board[coordinate] = icon;
    displayController.gridMove(coordinate, icon);
  }
  return { icon, move };
};

const displayController = ((board) => {
  function gridConstruction(board) {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.className = "cell" + i;
      cell.innerHTML = "-";
      grid.appendChild(cell);
    }
  }
  function gridMove(coordinate, icon) {
    const cell = grid.querySelector(".cell" + coordinate);
    cell.innerHTML = icon;
  }
  return { gridConstruction, gridMove };
})();

function application() {
  let user, computer;
  const buttonsContainer = body.querySelector(".buttons-container");
  const buttons = buttonsContainer.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "x") {
        user = player("x");
        computer = player("o");
      } else {
        user = player("o");
        computer = player("x");
      }
      buttonsContainer.style.display = "none";
      grid.style.display = "grid";
    });
  });

  displayController.gridConstruction(gameBoard.board);
  // User Picks the cell to play
  // let userIsWinner = false;
  const cells = body.querySelectorAll(".grid div");
  cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      let userCellName = cell.className;
      let userCellNum = parseInt(userCellName[userCellName.length - 1]);
      if (!gameBoard.validMove(userCellNum)) return;
      user.move(userCellNum);
      if (gameBoard.findWinner(user.icon)) {
        endMatchDisplay(user);
        return;
      }
      if (gameBoard.findTie()) return;
      // console.log(gameBoard.findTie());
      // Computer Picks the cell to play
      let computerCellNum = Math.floor(Math.random() * 9);
      while (!gameBoard.validMove(computerCellNum)) {
        computerCellNum = Math.floor(Math.random() * 9);
      }
      computer.move(computerCellNum);
      if (gameBoard.findWinner(computer.icon)) {
        // computer.isWinner = true;
        endMatchDisplay(computer);
        return;
      }
      // console.log(gameBoard.findWinner(computer.icon));
    });
  });
  function endMatchDisplay(user) {
    popUp.style.display = "block";
    popUpText.innerHTML = "You win!";
  }
  // console.log(userIsWinner);
  // if (user.isWinner) {
  //   console.log("You Win!");
  // }
  // if (computer.isWinner) {
  //   console.log("You Lose!");
  // }
}

document.addEventListener("DOMContentLoaded", application);
