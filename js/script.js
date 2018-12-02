// Get random winning number
function get_random_num(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let min = 1,
    max = 10,
    winningNum = get_random_num(min, max),
    guessesLeft = 3;

const GAME = document.querySelector("#game"),
      GUESS_BTN = document.querySelector("#guess-btn"),
      GUESS_INPUT = document.querySelector("#guess-input"),
      MIN_NUM = document.querySelector(".min-num"),
      MAX_NUM = document.querySelector(".max-num"),
      MESSAGE = document.querySelector(".message");

MIN_NUM.textContent = min;
MAX_NUM.textContent = max;

// Listen for guesses
GUESS_BTN.addEventListener("click", function(){
  // Convert string to integer
  let guess = parseInt(GUESS_INPUT.value);

  // Validate user's input
  if(Number.isNaN(guess) || guess < min || guess > max){
    set_message(`Please enter a number between ${min} and ${max}`, "red");
  } else{
    // Check if user entered winning number
    if(guess === winningNum){
      // Game won
      game_over(true, `${winningNum} is correct!, YOU WIN`);
    } else{
      // Wrong number
      guessesLeft -= 1;
      // Game over
      if(guessesLeft === 0){
        // Out of attempts
        game_over(false, `Game Over. The correct number was ${winningNum}`);
      } else {
        // Wrong guess
        // Change border color
        GUESS_INPUT.style.borderColor = "red";
        // Clear input
        GUESS_INPUT.value = "";
        // Tell user it's the wrong number
        set_message(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
      }
    }
  }
});

// Set message
function set_message(msg, color){
  MESSAGE.style.color = color;
  MESSAGE.textContent = msg;
}

// Game over
function game_over(isWinner, msg){
  let color;
  isWinner === true ? color = "green" : color = "red";
  // Disable input
  GUESS_INPUT.disabled = true;
  // Change border color
  GUESS_INPUT.style.borderColor = color;
  // Set text color
  MESSAGE.style.color = color;
  // Set message
  set_message(msg, color);
  // Change button to display 'Play Again'
  GUESS_BTN.value = "Play Again";
  GUESS_BTN.classList.add("play-again");
}

// Play again event listener
GAME.addEventListener("mousedown", function(e){
  if(e.target.classList.contains("play-again")){
    window.location.reload();
  }
});
