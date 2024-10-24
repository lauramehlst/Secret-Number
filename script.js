'use strict';

// Function to generate a random number between 1 and 100
const getRandomNumber = function () {
  return Math.trunc(Math.random() * 100) + 1;
};

// Function to display messages to the user
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Function to reset the game
const resetGame = function () {
  score = 20; // Reset score
  secretNumber = getRandomNumber(); // Generate a new secret number
  console.log(secretNumber); // For debugging purposes
  displayMessage('Start guessing...'); // Display initial message
  updateUI(); // Update the UI with default values
};

// Function to update the UI elements
const updateUI = function () {
  document.querySelector('.score').textContent = score; // Update score display
  document.querySelector('.number').textContent = '?'; // Hide the number initially
  document.querySelector('.guess').value = ''; // Clear input field
  document.querySelector('body').style.backgroundColor = '#8896ce'; // Reset background color
  document.querySelector('.number').style.width = '15rem'; // Reset number width
};

// Initialize game variables
let secretNumber = getRandomNumber();
let score = 20; // Score initialized
let highscore = 0; // High score initialized

// Event listener for the check button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(typeof guess, guess, secretNumber); // Debugging line

  if (!guess) {
    displayMessage('🧐 No number!');
  } else {
    handleGuess(guess);
  }
});

// Function to handle the guessing logic
const handleGuess = function (guess) {
  if (guess === secretNumber) {
    displayWin();
  } else {
    if (score > 1) {
      displayMessage(
        guess > secretNumber ? '📈 Guess Too High!' : '📉 Guess Too Low!'
      );
      updateScore(--score); // Decrement score and update UI
    } else {
      displayGameOver();
    }
  }
};

// Function to display winning message and update UI
const displayWin = function () {
  displayMessage('🎉 Correct number!');
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('body').style.backgroundColor = '#91ce88';
  document.querySelector('.number').style.width = '30rem';

  // High score logic
  if (score > highscore) {
    highscore = score; // Update high score
    document.querySelector('.highscore').textContent = highscore; // Display new high score
  }
};

// Function to handle game over scenario
const displayGameOver = function () {
  displayMessage('🥺 Game Over!');
  updateScore(0); // Set score to 0 and update UI
};

// Function to update the score in the UI
const updateScore = function (newScore) {
  score = newScore;
  document.querySelector('.score').textContent = score;
};

// Again button to restore game beginning
document.querySelector('.again').addEventListener('click', resetGame);

// Initial call to start the game
resetGame();
