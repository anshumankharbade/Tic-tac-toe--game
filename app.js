let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let resetScoresBtn = document.querySelector("#reset-scores-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.getElementById("turn-indicator");
let playerOInput = document.getElementById("playerO");
let playerXInput = document.getElementById("playerX");
let scoreOSpan = document.getElementById("scoreO");
let scoreXSpan = document.getElementById("scoreX");

let turnO = true;          // true = O's turn, false = X's turn
let count = 0;
let scoreO = 0;
let scoreX = 0;

const winPat = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

// Update turn indicator with current player name
function updateTurnIndicator() {
  let playerName = turnO ? playerOInput.value || "O" : playerXInput.value || "X";
  turnIndicator.innerText = `${playerName}'s turn (${turnO ? "O" : "X"})`;
}

// Update score display
function updateScores() {
  scoreOSpan.innerText = `${playerOInput.value || "O"}: ${scoreO}`;
  scoreXSpan.innerText = `${playerXInput.value || "X"}: ${scoreX}`;
}

// Reset board only (keep scores)
const resetBoard = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  updateTurnIndicator();
};

// Reset scores
const resetScores = () => {
  scoreO = 0;
  scoreX = 0;
  updateScores();
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winning-box");
  });
};

const showWinner = (winner, winningPattern) => {
  // winner is either "O" or "X"
  let playerName = winner === "O" ? playerOInput.value || "O" : playerXInput.value || "X";
  
  // Increment score
  if (winner === "O") {
    scoreO++;
  } else {
    scoreX++;
  }
  updateScores();

  // Highlight winning boxes
  winningPattern.forEach(index => {
    boxes[index].classList.add("winning-box");
  });

  msg.innerText = `🏆 ${playerName} wins! 🏆`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = "It's a draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPat) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1, pattern);
        return true;
      }
    }
  }
  return false;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Mark box
    if (turnO) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }
    box.disabled = true;
    count++;

    let winnerFound = checkWinner();

    if (!winnerFound) {
      // Switch turns only if game didn't end
      turnO = !turnO;
      updateTurnIndicator();

      if (count === 9) {
        gameDraw();
      }
    }
  });
});

// Event listeners for name inputs (update turn indicator and scores)
playerOInput.addEventListener("input", () => {
  updateTurnIndicator();
  updateScores();
});
playerXInput.addEventListener("input", () => {
  updateTurnIndicator();
  updateScores();
});

// Reset board button
resetBtn.addEventListener("click", resetBoard);

// Reset scores button
resetScoresBtn.addEventListener("click", resetScores);

// New game button from overlay
newGameBtn.addEventListener("click", () => {
  resetBoard();   // board reset, scores unchanged
});

// Initialize
updateTurnIndicator();
updateScores();