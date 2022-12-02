var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var isStarted = false;
var level = 0; // default level = 0.
var userPattern = [];

// Start the game
// 1. wait for nextSequence
// 2. save the sequence to gamePattern
// 3. wait for user input
// 4. check user input if match the game gamePattern. gameOver() and restartGame() if not match.
// 5. clear userPattern add nextSequence() to gamePattern again.
// 6. loop


// start the game if a button is pressed.
$(document).keydown(function() {
  if (!isStarted) {
    nextSequence();
    isStarted = true;
  }
});

$('.btn').click(function() {
  var clickedColor = this.id;
  animateFlash(clickedColor);
  playSound(clickedColor);
  userPattern.push(clickedColor);
  checkAnswer((userPattern.length - 1));
});

// Check the recent answer everytime see if it matches the gamePattern.
function checkAnswer(index) {
  if (userPattern[index] === gamePattern[index]) {
    // Check if user corrects all gamePattern.
    if (userPattern.length === gamePattern.length) {
      setTimeout(nextSequence, '1000');
    }
  } else {
    gameOver();
    restartGame();
  }
}

function restartGame() {
  isStarted = false;
  gamePattern = [];
  level = 0;
}

function gameOver() {
  $('h1').text('Game Over, Press Any Key to Restart');
  playSound('wrong');
  $('body').addClass('game-over');
  setTimeout(function() {
    $('body').removeClass('game-over');
  }, '200');
}

function nextSequence() {
  level++;
  userPattern = [];
  $('h1').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animateFlash(randomChosenColor);
  playSound(randomChosenColor);
}

function playSound(name) {
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
}

function animateFlash(name) {
  $('#' + name).fadeOut(100).fadeIn(100);
}
