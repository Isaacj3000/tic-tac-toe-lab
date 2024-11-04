/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],// rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colums
    [0, 4, 8], [2, 4, 8] //diagonals
]

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
let squareIndex;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const boardContainer = document.querySelector('.board')

// create the reset button

const resetBtnEl = document.createElement('button');
resetBtnEl.id = "reset";
resetBtnEl.textContent = 'Reset Game';

document.body.appendChild(resetBtnEl);

/*-------------------------------- Functions --------------------------------*/


function init() {
board = Array(9).fill('');
// board = ['X', 'O',' ', 'X', 'O', ' ', 'X', 'O', 'X'];
turn = "X";  //current player
winner = false;
tie = false;
render()
// console.log ('reset button clicked')
}
init()
// its task to render Dom elements and see the status of the game
function render() {
    updateBoard();
    updateMessage();
    

}

function updateBoard() {
    board.forEach((mark, index) => {
        const square = squareEls[index];  
        square.textContent = mark      
    });

}
function updateMessage(){
    if (winner === true && tie === false) {
        messageEl.textContent = `Congratulation ${turn} Wins!`
    } else if (winner === false && tie === false) {
        messageEl.textContent = ` Current turn: ${turn}`
    } else if ( winner=== false && tie === false) {
        messageEl.textContent = `It's a tie!`
    } 


 }
 function handleClick(event) {

   squareIndex = parseInt(event.target.id)
   if (board[squareIndex] || winner === true) return;

   placePiece(squareIndex);
   checkForWinner();
   checkForTie();
   switchPlayerTurn();
   render();
 }

function placePiece(index) {
    board[index] = turn
    console.log(board)
}
function checkForWinner(){
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        winner = true
        console.log('winner; ' + winner);
        return;
    }
  }
}
function checkForTie () {
    if  (winner === true) return;
    tie = board.every(cell => cell !== "");
    console.log("Tie: " + tie); 
}


function switchPlayerTurn() {
    if (winner) return;
//  turnary operator
  turn = turn === "X" ? "O" : "X" 
  // variable if the condition is true ? pass this value : else this one
  console.log("current Turn: " + turn); 
}

/*----------------------------- Event Listeners -----------------------------*/
// boardContainer.addEventListener('click', handleClick)
squareEls.forEach(square => {
    square.addEventListener('click', handleClick)


})
resetBtnEl.addEventListener('click', init);