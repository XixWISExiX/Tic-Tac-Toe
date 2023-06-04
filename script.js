const gameBoard = (() => {
  let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  return { board };
})();

const player = (icon) => {
  function move(coordinate) {
    gameBoard.board[2] = icon;
    displayController.gridMove(coordinate, icon);
  }
  return { icon, move };
};

const displayController = ((board) => {
  const grid = document.querySelector(".grid");
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
  displayController.gridConstruction(gameBoard.board);
  const user = player("x");
  const computer = player("o");
  user.move(2);
  computer.move(1);
}

document.addEventListener("DOMContentLoaded", application);
