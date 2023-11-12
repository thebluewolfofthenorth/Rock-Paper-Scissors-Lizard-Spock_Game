document.addEventListener("DOMContentLoaded", () => {
    const playerScoreEl = document.getElementById("player-score");
    const computerScoreEl = document.getElementById("computer-score");
    const triesLeftEl = document.getElementById("tries-left");
    const choiceButtons = document.querySelectorAll(".choice-button");
    
    let playerScore = 0;
    let computerScore = 0;
    let triesLeft = 5; // Starting number of tries
    
    choiceButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (triesLeft === 0) return; // No more tries left
            const playerChoice = this.id;
            const computerChoice = getComputerChoice();
            const winner = getWinner(playerChoice, computerChoice);
            updateScores(winner);
            displayResult(playerChoice, computerChoice, winner);
            triesLeft--; // Decrement the number of tries left
            triesLeftEl.textContent = triesLeft; // Update the display
            
            if (triesLeft === 0) {
                endGame(); // Handle the end of the game
            }
        });
    });

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function getWinner(playerChoice, computerChoice) {
        // Logic to determine the winner
        // Return 'player', 'computer', or 'tie'
    }

    function updateScores(winner) {
        if (winner === 'player') {
            playerScore++;
            playerScoreEl.textContent = playerScore;
        } else if (winner === 'computer') {
            computerScore++;
            computerScoreEl.textContent = computerScore;
        }
        // No score update needed for a tie
    }

    function displayResult(playerChoice, computerChoice, winner) {
        // Display the choices and the result of the round
    }
    
    function endGame() {
        // Disable all choice buttons to prevent further play
        choiceButtons.forEach(button => {
            button.disabled = true;
        });
        // Display end game message or call a function to handle end of the game
    }
});
