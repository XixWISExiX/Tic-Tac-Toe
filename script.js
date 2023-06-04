import { body, grid } from "./DOMref.js";

const gameBoard = (() => {
  let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  return { board };
})();

const player = (icon) => {
  function move(coordinate) {
    gameBoard.board[2] = icon;
    displayController.gridMove(coordinate, icon);
  }
  return { move };
};

const displayController = ((board) => {
  function gridConstruction(board) {
    for (let i = 0; i < 3; i++) {
      const gridRow = document.createElement("div");
      gridRow.className = "gridRow";
      for (let j = 0; j < 3; j++) {
        let cellNumber = i * j;
        const cell = document.createElement("div");
        cell.className = "cell" + cellNumber;
        cell.innerHTML = "-";
        gridRow.appendChild(cell);
      }
      grid.appendChild(gridRow);
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
      grid.style.display = "flex";
    });
  });

  displayController.gridConstruction(gameBoard.board);
  //   user.move(2);
  //   computer.move(1);
}

document.addEventListener("DOMContentLoaded", application);
