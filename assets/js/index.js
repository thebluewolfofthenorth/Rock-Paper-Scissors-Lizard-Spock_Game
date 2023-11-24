document.addEventListener("DOMContentLoaded", () => {
    // Get references to various elements in the HTML
    const playerScoreEl = document.getElementById("player-score");
    const computerScoreEl = document.getElementById("computer-score");
    const triesLeftEl = document.getElementById("tries-left");
    const choiceButtons = document.querySelectorAll(".btn");
    const restartButton = document.getElementById("restart-game");
    const playerChoiceDisplay = document.getElementById('player-choice-display');
    const computerChoiceDisplay = document.getElementById('computer-choice-display');
    const resultArea = document.querySelector('.result-area');

    // Initialize player and computer scores, and remaining tries
    let playerScore = 0;
    let computerScore = 0;
    let triesLeft = 5;

    // Add click event listeners to the choice buttons
    choiceButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Check if there are no tries left, if so, return and do nothing
            if (triesLeft === 0) return;

            // Get the player's choice from the button's data attribute
            const playerChoice = this.getAttribute('data-type');

            // Get a random computer choice
            const computerChoice = getComputerChoice();

            // Determine the winner of the round
            const winner = getWinner(playerChoice, computerChoice);

            // Update scores and display the result
            updateScores(winner);
            displayResult(playerChoice, computerChoice, winner);

            // Decrement the remaining tries and update the display
            triesLeft--;
            triesLeftEl.textContent = triesLeft;

            // If there are no tries left, end the game
            if (triesLeft === 0) {
                endGame();
            }
        });
    });

    // Add click event listener to the restart button
    restartButton.addEventListener("click", function () {
        restartGame();
    });

    // Function to randomly select a computer choice
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // Function to determine the winner of a round
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

    // Function to update scores and apply visual changes
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
        
        // Remove the "changed" class after a delay for visual effect
        setTimeout(() => {
            document.getElementById("player-info").classList.remove("changed");
            document.getElementById("computer-info").classList.remove("changed");
        }, 500);
    }

    // Function to display the result of a round
    function displayResult(playerChoice, computerChoice, winner) {
        const basePath = 'assets/images/element/';

        // Display player and computer choices and the result message
        playerChoiceDisplay.innerHTML = `
            <img src="${basePath + playerChoice + '.png'}" alt="${playerChoice}">
            <p>Your choice: <strong>${playerChoice}</strong></p>`;
        computerChoiceDisplay.innerHTML = `
            <img src="${basePath + computerChoice + '.png'}" alt="${computerChoice}">
            <p>Computer's choice: <strong>${computerChoice}</strong></p>`;

        const resultMessage = winner === 'tie' ? 'It is a tie!' : winner === 'player' ? 'You win!' : 'Computer wins!';
        resultArea.innerHTML = `<p>${resultMessage}</p>`;
    }

    // Function to end the game
    function endGame() {
        // Disable choice buttons and display final score and restart button
        choiceButtons.forEach(button => button.disabled = true);
        resultArea.innerHTML += `<p>Game Over! Final Score - Player: ${playerScore}, Computer: ${computerScore}</p>`;
        restartButton.style.display = 'block';
    }

    // Function to restart the game
    function restartGame() {
        // Reset scores, tries, and clear displays
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
        
        // Re-enable choice buttons
        choiceButtons.forEach(button => button.disabled = false);
    }

});
