const gameBoard = (() => {
  let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  return { board };
})();

const player = (icon, move) => {
  return { icon, move };
};

const displayController = ((board) => {
  function gridDisplay(board) {
    // console.log(board);
    const grid = document.querySelector(".grid");
    // console.log(grid);
    for (let i = 0; i < 3; i++) {
      const gridRow = document.createElement("div");
      gridRow.className = "gridRow";
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerHTML = "-";
        gridRow.appendChild(cell);
      }
      grid.appendChild(gridRow);
    }
  }
  return { gridDisplay };
})();

function application() {
  //   console.log(gameBoard.board);
  displayController.gridDisplay(gameBoard.board);
}

document.addEventListener("DOMContentLoaded", application);
