const game = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let turn = 1;

  const getBoard = () => board;

  const isWin = () => {
    let isVictory = false;

    let diagonal = [];

    for (let index = 0; index < 3; index++) {
      diagonal.push(board[index][index]);
    }

    if (diagonal.every((cell) => cell === "")) {
      return isVictory;
    }

    isVictory =
      diagonal[0] !== ""
        ? diagonal.every((cell) => cell === diagonal[0])
        : false;

    if (isVictory) {
      return isVictory;
    }

    let antiDiagonal = [];
    let indexOfColumn = 2;

    for (let indexOfRow = 0; indexOfRow < 3; indexOfRow++) {
      antiDiagonal.push(board[indexOfRow][indexOfColumn]);
      indexOfColumn--;
    }

    if (antiDiagonal.every((cell) => cell === "")) {
      return isVictory;
    }

    isVictory =
      antiDiagonal[0] !== ""
        ? antiDiagonal.every((cell) => cell === antiDiagonal[0])
        : false;

    if (isVictory) {
      return isVictory;
    }

    isVictory = board.some((row) =>
      row[0] !== "" ? row.every((cell) => cell === row[0]) : false,
    );

    if (isVictory) {
      return isVictory;
    }

    for (let indexOfColumn = 0; indexOfColumn < 3; indexOfColumn++) {
      let column = [];

      for (let indexOfRow = 0; indexOfRow < 3; indexOfRow++) {
        column.push(board[indexOfRow][indexOfColumn]);
      }

      isVictory =
        column[0] !== "" ? column.every((cell) => cell === column[0]) : false;

      if (isVictory) {
        return isVictory;
      }
    }

    return isVictory;
  };

  const placeMarker = (row, column) => {
    const marker = turn % 2 !== 0 ? "X" : "O";

    if (board[row][column] === "") {
      board[row][column] = marker;
      turn++;
    }
  };

  return { getBoard, placeMarker, isWin };
})();

// const player1 = {
//   name: "Alex",
//   marker: "X",
// };

// const player2 = {
//   name: "Rocky",
//   marker: "O",
// };

// game.placeMarker(1, 1, player1.marker);
// console.table(game.getBoard());
// game.placeMarker(0, 2, player2.marker);
// console.table(game.getBoard());
// game.placeMarker(0, 0, player1.marker);
// console.table(game.getBoard());
// game.placeMarker(2, 0, player2.marker);
// console.table(game.getBoard());
// game.placeMarker(2, 2, player1.marker);
// console.table(game.getBoard());
// game.placeMarker(1, 0, player2.marker);
// console.table(game.getBoard());
// game.placeMarker(2, 1, player1.marker);
// console.table(game.getBoard());
// game.placeMarker(0, 1, player2.marker);
// console.table(game.getBoard());
// game.placeMarker(2, 0, player2.marker);

// game.placeMarker(0, 2, "X");
// game.placeMarker(1, 2, "X");
// game.placeMarker(2, 2, "X");
// console.table(game.getBoard());
// console.log(game.isWin());

const gameContainer = document.querySelector("#game-container");

const displayGame = () => {
  const buttons = game
    .getBoard()
    .flatMap((row, indexOfRow) => {
      return row.map((cell, indexOfColumn) => {
        return `<button data-position="${indexOfRow + "-" + indexOfColumn}" class="border-2 cursor-pointer transition-all hover:bg-green-700 button">${cell}</button>`;
      });
    })
    .join("");

  gameContainer.innerHTML = buttons;
};

displayGame();

gameContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".button");

  if (!button) return;

  const [row, column] = button.dataset.position.split("-");

  game.placeMarker(row, column);
  displayGame();

  if (game.isWin()) {
    console.log("Win!");

    const buttons = game
      .getBoard()
      .flatMap((row, indexOfRow) => {
        return row.map((cell, indexOfColumn) => {
          return `<button disabled data-position="${indexOfRow + "-" + indexOfColumn}" class="border-2 cursor-pointer transition-all hover:bg-green-700 button">${cell}</button>`;
        });
      })
      .join("");

    gameContainer.innerHTML = buttons;
  }
});
