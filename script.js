const player1Name = document.getElementById("player1");
const player2Name = document.getElementById("player2");
let player1Score = document.getElementById("player1-score");
let player2Score = document.getElementById("player2-score");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset-btn");


let currentPlayer;
let currentPlayerName;
let currentPlayerScore;
let otherPlayerScore;
let gameFinished;
let board;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

// Grid
// [0 1 2]
// [3 4 5]
// [6 7 8]


for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleCellClick);
}

resetButton.addEventListener("click", resetGame);

// Initialize the game
resetGame();

function resetGame() {
    // Clear the board
    board = ["", "", "", "", "", "", "", "", ""];

    // Set initial values
    currentPlayer = "X";
    currentPlayerName = player1Name.value || "Player 1";
    currentPlayerScore = player1Score;
    otherPlayerScore = player2Score;
    gameFinished = false;

    // Clear the cells
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });

    // Clear the message
    message.textContent = "";

    switchPlayers();
}

function handleCellClick() {
    if (gameFinished || this.textContent !== "") return;

    const cellIndex = Array.from(cells).indexOf(this);

    // Update the board and the cell
    board[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;

    if (checkWin()) {
        gameFinished = true;
        currentPlayerScore.textContent = Number(currentPlayerScore.textContent) + 1;
        highlightWinningCombos();
        message.textContent = `${currentPlayerName} wins!`;
    } else if (checkDraw()) {
        gameFinished = true;
        message.textContent = "It's a draw!";
    } else {
        switchPlayers();
    }
}

function checkWin() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== "");
}

function highlightWinningCombos() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].classList.remove("win");
    }
  
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
        cells[a].classList.add("win");
        cells[b].classList.add("win");
        cells[c].classList.add("win");
      }
    }
  }

function switchPlayers() {
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
  
    if (currentPlayerName === player1Name.value) {
      currentPlayerName = player2Name.value;
    } else {
      currentPlayerName = player1Name.value;
    }
  
    if (currentPlayerScore === player1Score) {
      currentPlayerScore = player2Score;
      otherPlayerScore = player1Score;
    } else {
      currentPlayerScore = player1Score;
      otherPlayerScore = player2Score;
    }
  
    message.textContent = `${currentPlayerName}'s turn`;
  }