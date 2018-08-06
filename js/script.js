// Get random winning number
function get_random_num(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let min = 1,
    max = 10,
    winningNum = get_random_num(min, max),
    guessesLeft = 3;

const game = document.querySelector("#game"),
      minNum = document.querySelector(".min-num"),
      maxNum = document.querySelector(".max-num"),
      guessBtn = document.querySelector("#guess-btn"),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

// Listen for guesses
guessBtn.addEventListener("click", function(){
  // Convert string to integer
  let guess = parseInt(guessInput.value);
  console.log(guess);

  // Validate user's input
  if(isNaN(guess) || guess < min || guess > max){
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
        game_over(false, `Game Over. The correct number was ${winningNum}`);
      } else {
        // Game continues - wrong answer
        // Change border color
        guessInput.style.borderColor = "red";
        // Clear input
        guessInput.value = "";
        // Tell user it's the wrong number
        set_message(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
      }
    }
  }
});

// Set message
function set_message(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

// Game over
function game_over(won, msg){
  let color;
  won === true ? color = "green" : color = "red";

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  set_message(msg, color);
  // Change button to display 'Play Again'
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Play again event listener
game.addEventListener("mousedown", function(e){
  if(e.target.className === "play-again"){
    window.location.reload();
  }
});