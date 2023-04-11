# Tic Tac Toe Game

This is a simple implementation of the Tic Tac Toe game using JavaScript, HTML, and CSS. It allows two players to take turns marking spaces on a 3x3 grid, and the first player to get three in a row (horizontally, vertically, or diagonally) wins the game.

## How to Play

- To start the game, enter the names and markers of the two players and click the "Start" button. Each player must choose a unique marker, either "X" or "O".

- Once the game has started, the current player's name is displayed at the top of the game board. To make a move, simply click on an empty square on the grid.

- If a player gets three of their markers in a row, they win the game. If all spaces on the grid are filled and no player has won, the game ends in a tie.

- To restart the game at any time, click the "Restart" button.

## Code Overview

- The game is implemented using three modules: createPlayer, gameboardModule, and gameModule.

- The createPlayer module is a factory function that creates a player object with a name and a marker. The gameboardModule module manages the game board state and provides methods for placing markers on the board and resetting the board. The gameModule module coordinates the game logic, such as checking for wins or ties and switching between players.

- The game is started by clicking the "Start" button, which calls the start method on the gameModule object. This method creates two player objects using the createPlayer function and sets up the game board. It then adds a click event listener to the game board and calls the handleClick function whenever a space on the board is clicked.

- The handleClick function checks if the clicked space is valid, places the current player's marker on the board if it is, and then checks for a win or a tie. If a win or tie is detected, the game ends and the board is reset.

- The gameModule also provides a reset function that resets the game board and sets the current player back to the first player.

## Future Development

- I plan to create an AI so that a player can play against the computer.
- I plan to make the page fully responsive for mobile.

## Conclusion

This Tic Tac Toe game is a simple yet fun way to pass the time. The code provides a good example of how to use factory functions and modules to build a web application. Feel free to modify the code and experiment with different features to create your own version of the game.
