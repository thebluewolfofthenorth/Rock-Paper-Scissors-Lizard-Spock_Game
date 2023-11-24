document.addEventListener("DOMContentLoaded", () => {
    const startGameButton = document.getElementById("start-game");
    const frontPage = document.getElementById("front-page");
    const gameContent = document.querySelector("header");
    const playerScoreEl = document.getElementById("player-score");
    const computerScoreEl = document.getElementById("computer-score");
    const triesLeftEl = document.getElementById("tries-left");
    const choiceButtons = document.querySelectorAll(".btn");
    const restartButton = document.getElementById("restart-game");
    const playerChoiceDisplay = document.getElementById('player-choice-display');
    const computerChoiceDisplay = document.getElementById('computer-choice-display');
    const resultArea = document.querySelector('.result-area');

    let playerScore = 0;
    let computerScore = 0;
    let triesLeft = 5;

    choiceButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (triesLeft === 0) return;
            const playerChoice = this.getAttribute('data-type');
            const computerChoice = getComputerChoice();
            const winner = getWinner(playerChoice, computerChoice);
            updateScores(winner);
            displayResult(playerChoice, computerChoice, winner);
            triesLeft--;
            triesLeftEl.textContent = triesLeft;

            if (triesLeft === 0) {
                endGame();
            }
        });
    });

    startGameButton.addEventListener("click", function() {
        frontPage.style.display = "none";
        gameContent.style.display = "block";
    });

    restartButton.addEventListener("click", function () {
        restartGame();
    });

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function getWinner(playerChoice, computerChoice) {
        const winningCombinations = {
            rock: ['scissors', 'lizard'],
            paper: ['rock', 'spock'],
            scissors: ['paper', 'lizard'],
            lizard: ['spock', 'paper'],
            spock: ['scissors', 'rock']
        };

        if (playerChoice === computerChoice) {
            return 'tie';
        } else if (winningCombinations[playerChoice].includes(computerChoice)) {
            return 'player';
        } else {
            return 'computer';
        }
    }

    function updateScores(winner) {
        if (winner === 'player') {
            playerScore++;
            playerScoreEl.textContent = playerScore;
            document.getElementById("player-info").classList.add("changed");
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreEl.textContent = computerScore;
            document.getElementById("computer-info").classList.add("changed");
        }
        setTimeout(() => {
            document.getElementById("player-info").classList.remove("changed");
            document.getElementById("computer-info").classList.remove("changed");
        }, 500);
    }

    function displayResult(playerChoice, computerChoice, winner) {
        const basePath = 'assets/images/element/';

        playerChoiceDisplay.innerHTML = `
            <img src="${basePath + playerChoice + '.png'}" alt="${playerChoice}">
            <p>Your choice: <strong>${playerChoice}</strong></p>`;
        computerChoiceDisplay.innerHTML = `
            <img src="${basePath + computerChoice + '.png'}" alt="${computerChoice}">
            <p>Computer's choice: <strong>${computerChoice}</strong></p>`;

        const resultMessage = winner === 'tie' ? 'It is a tie!' : winner === 'player' ? 'You win!' : 'Computer wins!';
        resultArea.innerHTML = `<p>${resultMessage}</p>`;
    }

    function endGame() {
        choiceButtons.forEach(button => button.disabled = true);
        resultArea.innerHTML += `<p>Game Over! Final Score - Player: ${playerScore}, Computer: ${computerScore}</p>`;
        restartButton.style.display = 'block';
    }

    function restartGame() {
        playerScore = 0;
        computerScore = 0;
        triesLeft = 5;
        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;
        triesLeftEl.textContent = triesLeft;

        playerChoiceDisplay.innerHTML = '';
        computerChoiceDisplay.innerHTML = '';
        resultArea.innerHTML = '';
        restartButton.style.display = 'none';

        choiceButtons.forEach(button => button.disabled = false);
    }

});
