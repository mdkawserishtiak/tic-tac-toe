const game = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getBoard = () => board;

  function Player(name, marker) {
    if (!new.target) {
      console.log(
        "ERROR! In order to create a player you have to use new keyword.",
      );
    }

    return { name, marker };
  }

  const player1 = new Player("Player 1", "X");
  const player2 = new Player("Player 2", "O");
  const player = [player1, player2];

  let turn = 0;

  const placeMarker = (row, column) => {
    const marker = turn % 2 === 0 ? player[0].marker : player[1].marker;

    if (board[row][column] === "") {
      board[row][column] = marker;

      turn++;
    }
  };

  const setPlayerName = (number, name) => {
    if (name !== "") {
      player[number].name = name;
    }
  };

  const getWinnerName = () => {
    let name = "";
    let isVictory = false;

    let diagonal = [];

    for (let index = 0; index < 3; index++) {
      diagonal.push(board[index][index]);
    }

    if (diagonal.every((cell) => cell === "")) {
      return name;
    }

    isVictory =
      diagonal[0] !== ""
        ? diagonal.every((cell) => cell === diagonal[0])
        : false;

    if (isVictory) {
      name = diagonal[0] === player[0].marker ? player[0].name : player[1].name;

      return name;
    }

    let antiDiagonal = [];
    let indexOfColumn = 2;

    for (let indexOfRow = 0; indexOfRow < 3; indexOfRow++) {
      antiDiagonal.push(board[indexOfRow][indexOfColumn]);
      indexOfColumn--;
    }

    if (antiDiagonal.every((cell) => cell === "")) {
      return name;
    }

    isVictory =
      antiDiagonal[0] !== ""
        ? antiDiagonal.every((cell) => cell === antiDiagonal[0])
        : false;

    if (isVictory) {
      name =
        antiDiagonal[0] === player[0].marker ? player[0].name : player[1].name;

      return name;
    }

    const indexOfMatchedRow = board.findIndex((row) =>
      row[0] !== "" ? row.every((cell) => cell === row[0]) : false,
    );

    isVictory = indexOfMatchedRow === -1 ? false : true;

    if (isVictory) {
      name =
        board[indexOfMatchedRow][0] === player[0].marker
          ? player[0].name
          : player[1].name;

      return name;
    }

    for (let indexOfColumn = 0; indexOfColumn < 3; indexOfColumn++) {
      let column = [];

      for (let indexOfRow = 0; indexOfRow < 3; indexOfRow++) {
        column.push(board[indexOfRow][indexOfColumn]);
      }

      isVictory =
        column[0] !== "" ? column.every((cell) => cell === column[0]) : false;

      if (isVictory) {
        name = column[0] === player[0].marker ? player[0].name : player[1].name;

        return name;
      }
    }

    return name;
  };

  const isTie = () => turn === 9;

  const reset = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    turn = 0;

    setPlayerName(0, "Player 1");
    setPlayerName(1, "Player 2");
  };

  return { getBoard, placeMarker, setPlayerName, getWinnerName, isTie, reset };
})();

const gameContainer = document.querySelector("#game-container");

const displayGame = () => {
  const buttons = game
    .getBoard()
    .flatMap((row, indexOfRow) => {
      return row.map((cell, indexOfColumn) => {
        return `<button data-position="${indexOfRow + "-" + indexOfColumn}" class="border-2 text-3xl font-black cursor-pointer transition-all hover:border-purple-800 hover:bg-purple-200 button">${cell}</button>`;
      });
    })
    .join("");

  gameContainer.innerHTML = buttons;
};

const result = document.querySelector("#result");

gameContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".button");

  if (!button) return;

  const [row, column] = button.dataset.position.split("-");

  game.placeMarker(row, column);
  displayGame();

  const displayResult = (name) => {
    result.classList.add("border-2");

    if (name !== "") {
      result.classList.add("text-green-600");
    } else {
      result.classList.add("text-yellow-600");
    }

    result.textContent =
      name !== ""
        ? `Congratulations! ${name} won the game.`
        : "Tie! Play again using the restart button.";
  };

  const winner = game.getWinnerName();

  if (winner !== "") {
    document
      .querySelectorAll(".button")
      .forEach((button) => (button.disabled = true));

    displayResult(winner);
  } else if (game.isTie()) {
    displayResult("");
  }
});

const startButton = document.querySelector("#start");

startButton.addEventListener("click", (event) => {
  event.preventDefault();

  game.reset();

  const player1Name = document.querySelector("#player1").value;
  const player2Name = document.querySelector("#player2").value;

  game.setPlayerName(0, player1Name);
  game.setPlayerName(1, player2Name);

  gameContainer.classList.add("border-2");
  result.classList.remove("border-2");
  result.classList.remove("text-green-600");
  result.classList.remove("text-yellow-600");
  result.textContent = "";

  displayGame();

  startButton.textContent = "Restart";
});
