const creatPlayer = (playerName, playerMarker) => {
  return { playerName, playerMarker };
};

const adrian = creatPlayer("adrian", "x");
const patrick = creatPlayer("patrick", "o");

const gameboardModule = (function () {
  let gameboard = ["x", "O", "X", "O", "X", "O", "X", "O", "X"];
  return { gameboard };
})();

const displayControllerModule = (function () {
  let test = () => console.log("You are a JS god!");

  return { test };
})();

const renderGameboardModule = (function () {
  const boxes = document.querySelectorAll(".box");
  const { gameboard } = gameboardModule;

  boxes.forEach((item, index) => {
    item.textContent = gameboard[index];
  });
})();
