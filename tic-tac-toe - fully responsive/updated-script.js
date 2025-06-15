const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 4, 6],
  [2, 5, 8], [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
  });
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations! Player ${winner} wins!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const valA = boxes[a].innerText;
    const valB = boxes[b].innerText;
    const valC = boxes[c].innerText;

    if (valA && valA === valB && valB === valC) {
      showWinner(valA);
      return;
    }
  }

  // Check for draw
  const allFilled = [...boxes].every(box => box.innerText !== "");
  if (allFilled) {
    msg.innerText = "It's a Draw! 😐 Click 'New Game' to try again.";
    msgContainer.classList.remove("hide");
  }
};

// Attach event listeners to boxes
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    box.innerText = turnO ? "O" : "X";
    box.disabled = true;
    turnO = !turnO;
    checkWinner();
  });
});

// Button listeners
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
