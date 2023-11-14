document.addEventListener("DOMContentLoaded", () => {
    const playerScoreEl = document.getElementById("player-score");
    const computerScoreEl = document.getElementById("computer-score");
    const triesLeftEl = document.getElementById("tries-left");
    const choiceButtons = document.querySelectorAll(".btn");
    
    let playerScore = 0;
    let computerScore = 0;
    let triesLeft = 5; 
    
    choiceButtons.forEach(button => {
        button.addEventListener("click", function() {
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
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreEl.textContent = computerScore;
        }
    
    }

    function displayResult(playerChoice, computerChoice, winner) {
        const resultArea = document.querySelector('.result-area');
        const resultMessage = winner === 'tie' ? 'It is a tie!' : winner === 'player' ? 'You win!' : 'Computer wins!';
        resultArea.innerHTML = `
            <p>Your choice: <strong>${playerChoice}</strong></p>
            <p>Computer's choice: <strong>${computerChoice}</strong></p>
            <p>${resultMessage}</p>
        `;
    }
    
    
    function endGame() {
        choiceButtons.forEach(button => button.disabled = true);
        const resultArea = document.querySelector('.result-area');
        resultArea.innerHTML += `<p>Game Over! Final Score - Player: ${playerScore}, Computer: ${computerScore}</p>`;
        // Optionally, add a button or link to restart the game
    }
    
});
