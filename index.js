// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollDoubleBtn = document.getElementById('rollDblBtn');
const resetBtn = document.getElementById("resetBtn");
let dicePic = document.getElementById('dicePic');
const parentDicePic = document.getElementById('parentDicePic');
const players = document.getElementsByClassName('players')[0];
let nuanCat = document.getElementById('nuanCat');

function gameOver() {
    
    const nuanCatClone = nuanCat.cloneNode();
    nuanCat.remove();
    nuanCat = nuanCatClone;
    nuanCat.style.display = 'block';
    players.appendChild(nuanCat);

    rollDblBtn.style.display = "none"
    resetBtn.style.display = "block"
}

function onClickBtnsRoll(doubleOrNothing = false){
    
    const dicePicClone = dicePic.cloneNode();
    dicePic.remove();
    dicePic = dicePicClone;
    dicePic.textContent = '🎲';
    parentDicePic.appendChild(dicePic);
    dicePic.addEventListener("click", onClickBtnRoll);

    let randomNumber = 0;
    let IsDouble = false;
    
    if(doubleOrNothing) {
        IsDouble = Math.random() > 0.5; 
        if (IsDouble) {
            randomNumber = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1; }
        else{
            randomNumber = 0;
        }      
    } else {
        randomNumber = Math.floor(Math.random() * 6) + 1
    }

    if (player1Turn) {
        if(doubleOrNothing && !IsDouble) {
            player1Score = 0;         
         } else {
            player1Score += randomNumber
         }
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        if(doubleOrNothing && !IsDouble) {
            player2Score = 0;         
         } else {
            player2Score += randomNumber
         }
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
    
    if (!player1Turn) {
        if (player1Score >= 20 && player2Score >= 20) {
            if (player1Score > player2Score) {
                message.textContent = "Player 1 Won 🥳"    
            }  else if (player2Score > player1Score){
                message.textContent = "Player 2 Won 🥳"     
            } else {
                message.textContent = 'Draw!'
            }
            gameOver();  
        }
        else if (player1Score >= 20) {
            message.textContent = "Player 1 Won 🥳"
            gameOver()
        }  else if (player2Score >= 20) {
            message.textContent = "Player 2 Won 🎉"
            gameOver();
        }
    } 
    
    player1Turn = !player1Turn
}

function onClickBtnDoubleOrNothing() {
    onClickBtnsRoll(true);
}

function onClickBtnRoll() {
    onClickBtnsRoll();  
}

dicePic.addEventListener("click", onClickBtnRoll)

rollDblBtn.addEventListener("click", onClickBtnDoubleOrNothing)
 
resetBtn.addEventListener("click", function(){
    reset()
})

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollDblBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    nuanCat.style.display = 'none';
}
