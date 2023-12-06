document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let score = 0;
    let mismatches = 0;
    const MAX_MISMATCHES = 5;

    const cardArray = [
        // ... (the card objects remain the same)
    ];

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
      
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
                updateScoreAndCheckGameOver(); // Moved the score update logic here
            }
        }
    }

    function updateScoreAndCheckGameOver() {
        // Assume cardMatch() function checks if the two flipped cards match
        if (cardMatch()) {
            score += 6; // Add 6 points for a match
        } else {
            score = Math.max(0, score - 1); // Reduce by 1 for a mismatch
            mismatches++;
            if (mismatches >= MAX_MISMATCHES) {
                gameOver(); // Game over after 5 mismatches
            }
        }
        updateScoreUI(); // Update the score UI after each move
    }

    function updateScoreUI() {
        // Update the UI to display the current score
        const scoreDisplay = document.getElementById('score');
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function gameOver() {
        // Handle game over logic here
        alert('Game Over! You reached the maximum number of mismatches.');
        // You can add further logic for restarting the game or any other action
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];
        score = 0;
        mismatches = 0;
        updateScoreUI(); // Reset score UI when creating a new board

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/Blank.PNG');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/Blank.PNG');
            cards[secondCardId].setAttribute('src', 'images/Blank.PNG');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});
