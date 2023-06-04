const gameBoard = () => {
  board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  return { board };
};

const player = (icon, move) => {
  return { icon, move };
};
