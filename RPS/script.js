let userScore = 0;
let computerScore = 0;

function makeChoice(userChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById('computer-choice').innerText = '?';
  document.getElementById('result').innerText = 'Loading...';

  setTimeout(() => {
    document.getElementById('computer-choice').innerText = computerChoice.toUpperCase();

    const result = getResult(userChoice, computerChoice);
    updateScore(result);
    displayResult(result, userChoice);
  }, 2000);
}

function hoverChoice(choice) {
  document.getElementById(choice).style.transform = 'scale(1.2)';
}

function unhoverChoice(choice) {
  document.getElementById(choice).style.transform = 'scale(1)';
}

function getResult(user, computer) {
  if (user === computer) return 'draw';
  if ((user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')) {
    return 'win';
  }
  return 'lose';
}

function updateScore(result) {
  const userScoreElement = document.getElementById('user-score');
  const computerScoreElement = document.getElementById('computer-score');

  if (result === 'win') {
    userScore++;
  } else if (result === 'lose') {
    computerScore++;
  }

  userScoreElement.innerText = `You: ${userScore}`;
  computerScoreElement.innerText = `Computer: ${computerScore}`;
}

function displayResult(result, userChoice) {
  const resultElement = document.getElementById('result');
  const computerChoiceElement = document.getElementById('computer-choice');

  if (result === 'draw') {
    resultElement.innerText = 'It\'s a draw!';
  } else {
    resultElement.innerText = `You ${result}!`;
  }

  // Remove the frame from the previously selected choice
  const choices = ['rock', 'paper', 'scissors'];
  choices.forEach(choice => {
    document.getElementById(choice).classList.remove('selected');
  });

  // Add a frame to the user's selected choice
  document.getElementById(userChoice).classList.add('selected');
}