const createPlayer = (playerName, playerMarker) => {
  const getName = () => playerName;
  const getMarker = function () {
    // if (playerMarker !== "X" && playerMarker !== "O") {
    //   alert("Invalid marker. Marker Must be 'X' or 'O'");
    // }
    return playerMarker;
  };

  return { getName, getMarker };
};

const gameboardModule = (function () {
  let gameboard = ["", "", "", "", "", "", "", "", "X"];
  const getBoard = () => gameboard;

  const placeMark = function (index, marker) {
    if (gameboard[index] === "") {
      gameboard[index] = marker;
      return true;
    } else {
      return false;
    }
  };

  const resetBoard = function () {
    return (gameboard = ["", "", "", "", "", "", "", "", ""]);
  };

  return {
    getBoard,
    placeMark,
    resetBoard,
  };
})();

const gameModule = (function () {
  let gameboard = gameboardModule.getBoard();
  let currentPlayer = null;

  const player1NameInput = document.getElementById("player1-name");
  const player1MarkerInput = document.getElementById("player1-marker");
  const player2NameInput = document.getElementById("player2-name");
  const player2MarkerInput = document.getElementById("player2-marker");

  const player1 = createPlayer(
    player1NameInput.value,
    player1MarkerInput.value.toUpperCase()
  );
  const player2 = createPlayer(
    player2NameInput.value,
    player2MarkerInput.value.toUpperCase()
  );

  const switchPlayer = function () {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const handleClick = function (event) {
    const index = parseInt(event.target.dataset.index);
    if (isNaN(index)) {
      return;
    }

    if (gameboardModule.placeMark(index, currentPlayer.getMarker())) {
      render();
      if (checkWin()) {
        const resultDiv = document.querySelector(".result");
        resultDiv.textContent = `${currentPlayer.getName()} wins!`;
        resultDiv.style.display = "block";
        reset();
      } else if (checkTie()) {
        const resultDiv = document.querySelector(".result");
        resultDiv.textContent = "It's a tie!";
        resultDiv.style.display = "block";
        reset();
      } else {
        switchPlayer();
      }
    }
  };

  const checkWin = function () {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        gameboard[a] !== "" &&
        gameboard[a] === gameboard[b] &&
        gameboard[b] === gameboard[c]
      ) {
        return true;
      }
    }

    return false;
  };

  const checkTie = function () {
    const emptySpaces = gameboard.filter((mark) => mark === "");
    return emptySpaces.length === 0;
  };

  const reset = function () {
    gameboardModule.resetBoard();
    currentPlayer = player1;
    render();
  };

  const render = function () {
    gameboard = gameboardModule.getBoard();
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((item, index) => {
      item.textContent = gameboard[index];
    });

    document.querySelector(".current-player").textContent =
      currentPlayer.getName();
  };

  const start = function () {
    gameboardModule.resetBoard();
    currentPlayer = player1;
    render();
    document.getElementById("gameboard").addEventListener("click", handleClick);
  };

  return {
    start,
  };
})();

const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", gameModule.start);
