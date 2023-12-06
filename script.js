document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

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
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/Blank.PNG');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
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