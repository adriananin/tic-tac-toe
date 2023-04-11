const createPlayer = (playerName, playerMarker) => {
  const getName = function () {
    return playerName;
  };
  const getMarker = function () {
    return playerMarker;
  };

  return { getName, getMarker };
};

const gameboardModule = (function () {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  const getBoard = function () {
    return gameboard;
  };

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
  let player1;
  let player2;

  const player1NameInput = document.getElementById("player1-name");
  const player1MarkerInput = document.getElementById("player1-marker");
  const player2NameInput = document.getElementById("player2-name");
  const player2MarkerInput = document.getElementById("player2-marker");

  const switchPlayer = function () {
    if (!currentPlayer) {
      currentPlayer = player1;
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
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

  const render = function () {
    gameboard = gameboardModule.getBoard();
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((item, index) => {
      item.textContent = gameboard[index];
    });

    document.querySelector(".current-player").textContent =
      currentPlayer.getName();
  };
  const reset = function () {
    gameboardModule.resetBoard();
    currentPlayer = player1;
    resetInputs();
    render();
  };

  const resetInputs = function () {
    player1NameInput.value = "";
    player1MarkerInput.value = "";
    player2NameInput.value = "";
    player2MarkerInput.value = "";
  };

  const hideResult = function () {
    const resultDiv = document.querySelector(".result");
    resultDiv.style.display = "none";
  };

  const hideCurrentPlay = function () {
    const currentPlay = document.querySelector(".current-player");
    currentPlay.style.display = "none";
  };

  const start = function () {
    gameboardModule.resetBoard();

    currentPlayer = player1;
    player1 = createPlayer(player1NameInput.value, player1MarkerInput.value);
    player2 = createPlayer(player2NameInput.value, player2MarkerInput.value);
    if (
      !player1NameInput.value ||
      !player2NameInput.value ||
      !player1MarkerInput.value ||
      !player2MarkerInput.value
    ) {
      alert("Please fill in all player information!");
      return;
    }
    if (player1MarkerInput.value === player2MarkerInput.value) {
      alert("Player markers must be different!");
      return;
    }
    render();
    switchPlayer();
    document.getElementById("gameboard").addEventListener("click", handleClick);
  };

  return { start, hideResult, reset, hideCurrentPlay };
})();

gameModule.start();
const startBtn = document.querySelector("#start");
startBtn.addEventListener("click", gameModule.start);

const removeResult = document.querySelector(".gameboard");
removeResult.addEventListener("click", gameModule.hideResult);

const restartBtn = document.querySelector("#reset");
restartBtn.addEventListener("click", gameModule.reset);
restartBtn.addEventListener("click", gameModule.hideCurrentPlay);
