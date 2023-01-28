'use strict';

// both selects elements by id
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let scores = [0, 0];

// initialisation function
const init = function () {
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  // remove active player from current active player, then add it to player 0
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  // if active player isnt player 0, make current active player = player 0
  if (activePlayer !== 0) activePlayer = 0;
  player0EL.classList.add('player--active');

  // resetting the dice
  diceEL.classList.add('hidden');

  // resetting the current available holding scores to 0
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  // resetting the scores to 0
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  // resetting player name
  document.querySelector(`#name--0`).textContent = 'PLAYER 1';
  document.querySelector(`#name--1`).textContent = 'PLAYER 2';
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// calling initialisation function for initial stage
init();

// Function: Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // if dice is 1, switch player
    // if dice is not 1, add scores
    if (dice !== 1) {
      // adding the dice scores
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Function: Holding the score
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's total score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // checking for score if it hits 100
    if (scores[activePlayer] >= 10) {
      // player has won
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`#name--${activePlayer}`).textContent = 'WINNER';
      document.querySelector(
        `#name--${activePlayer === 0 ? activePlayer + 1 : activePlayer - 1}`
      ).textContent = 'LOSER';
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
