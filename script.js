import { body, grid } from "./DOMref.js";

const gameBoard = (() => {
  let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  return { board };
})();

const player = (icon) => {
  function move(coordinate) {
    gameBoard.board[coordinate] = icon;
    displayController.gridMove(coordinate, icon);
  }
  return { move };
};

const displayController = ((board) => {
  function gridConstruction(board) {
    // let cellNumber = 0;
    // for (let i = 0; i < 3; i++) {
    //   const gridRow = document.createElement("div");
    //   gridRow.className = "gridRow";
    //   for (let j = 0; j < 3; j++) {
    //     const cell = document.createElement("div");
    //     cell.className = "cell" + cellNumber;
    //     console.log(cell.className);
    //     cell.innerHTML = "-";
    //     gridRow.appendChild(cell);
    //     cellNumber++;
    //   }
    //   grid.appendChild(gridRow);
    // }
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.className = "cell" + i;
      console.log(cell.className);
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
      // grid.style.display = "flex";
      grid.style.display = "grid";
    });
  });

  displayController.gridConstruction(gameBoard.board);
  // user.move(2);
  //   computer.move(1);
  const cells = body.querySelectorAll(".grid div");
  cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      let cellName = cell.className;
      let cellNum = parseInt(cellName[cellName.length - 1]);
      // console.log(cellNum);
      user.move(cellNum);
    });
  });
}

document.addEventListener("DOMContentLoaded", application);
