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
        { name: 'card1', img: 'images/City-Center.PNG' },
        { name: 'card1', img: 'images/City-Center.PNG' },
        { name: 'card2', img: 'images/Edmonton.PNG' },
        { name: 'card2', img: 'images/Edmonton.PNG' },
        { name: 'card3', img: 'images/Kigali-CC.PNG' },
        { name: 'card3', img: 'images/Kigali-CC.PNG' },
        { name: 'card4', img: 'images/Kivu-Marina.PNG' },
        { name: 'card4', img: 'images/Kivu-Marina.PNG' },
        { name: 'card5', img: 'images/Kivu.PNG' },
        { name: 'card5', img: 'images/Kivu.PNG' },
        { name: 'card6', img: 'images/Landscaping.png' },
        { name: 'card6', img: 'images/Landscaping.png' },
        { name: 'card7', img: 'images/Project.PNG' },
        { name: 'card7', img: 'images/Project.PNG' },
        { name: 'card8', img: 'images/Rebero.PNG' },
        { name: 'card8', img: 'images/Rebero.PNG' },
        { name: 'card9', img: 'images/Rebero2.PNG' },
        { name: 'card9', img: 'images/Rebero2.PNG' },
        { name: 'card10', img: 'images/Rubavu.PNG' },
        { name: 'card10', img: 'images/Rubavu.PNG' },
        // ...add more pairs as needed
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
            score += 20; // Add 20 points for a match
        } else {
            score = Math.max(0, score - 10); // Reduce by 10 for a mismatch
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

    function resetGame() {
        createBoard(); // Reset the game board
    }
    
    function gameOver() {
        alert('Game Over! You reached the maximum number of mismatches.');
        resetGame(); // Reset the game after game over
        
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
    function cardMatch() {
        return cardsChosen[0] === cardsChosen[1];
    }
    
    startButton.addEventListener('click', createBoard);
});
