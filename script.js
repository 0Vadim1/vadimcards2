const cards = [
    { name: '6', value: 6, image: 'images/images6.png' },
    { name: '7', value: 7, image: 'images/images7.png' },
    { name: '8', value: 8, image: 'images/images8.png' },
    { name: '9', value: 9, image: 'images/images9.png' },
    { name: '10', value: 10, image: 'images/images10.png' },
    { name: 'Валет', value: 2, image: 'images/imagesvalet.png' },
    { name: 'Дама', value: 3, image: 'images/imagesdama.png' },
    { name: 'Король', value: 4, image: 'images/imageskorol.png' },
    { name: 'Туз', value: 11, image: 'images/imagestuz.png' }
];

let playerName = '';
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
const maxRounds = 3;

document.getElementById('startGameBtn').addEventListener('click', startGame);
document.getElementById('nextRoundBtn').addEventListener('click', startNextRound);
document.getElementById('restartGameBtn').addEventListener('click', restartGame);

function startGame() {
    const playerNameInput = document.getElementById('playerName').value.trim();

    if (!playerNameInput) {
        alert('Будь ласка, введіть своє ім\'я!');
        return;
    } else if (playerNameInput.length > 8) {
        alert('Ім\'я не може перевищувати 8 символів!');
        return;
    }

    playerName = playerNameInput;

    document.getElementById('registrationModal').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';

    startNewRound();
}

function startNewRound() {
    document.getElementById('roundNumber').textContent = currentRound;
    document.getElementById('winnerMessage').textContent = '';
    document.getElementById('nextRoundBtn').style.display = 'none';

    playerCards = [];
    computerCards = [];
    document.getElementById('playerCards').innerHTML = '';
    document.getElementById('computerCards').innerHTML = '';

    for (let i = 0; i < 3; i++) {
        playerCards.push(getRandomCard());
        computerCards.push(getRandomCard());
    }

    setTimeout(() => {
        updateCards('player', playerCards);
        updateCards('computer', computerCards);

        const playerTotal = calculateTotal(playerCards);
        const computerTotal = calculateTotal(computerCards);

        document.getElementById('playerTotal').textContent = playerTotal;
        document.getElementById('computerTotal').textContent = computerTotal;

        determineWinner(playerTotal, computerTotal);
    }, 500);
}

function getRandomCard() {
    return cards[Math.floor(Math.random() * cards.length)];
}

function updateCards(player, cards) {
    const container = document.getElementById(`${player}Cards`);
    cards.forEach(card => {
        const cardElement = document.createElement('img');
        cardElement.src = card.image;
        cardElement.alt = card.name;
        cardElement.classList.add('card');
        container.appendChild(cardElement);
    });
}

function calculateTotal(cards) {
    return cards.reduce((total, card) => total + card.value, 0);
}


function determineWinner(playerTotal, computerTotal) {
    let message;
    
    if (playerTotal > 21 && computerTotal > 21) {
        message = 'Ніхто не виграв, обидва перевищили 21!';
    } else if (playerTotal > 21) {
        computerScore++;
        message = 'Комп\'ютер виграв, ви перевищили 21!';
    } else if (computerTotal > 21) {
        playerScore++;
        message = `${playerName} виграв, комп\'ютер перевищив 21!`;
    } else if (playerTotal === 21 && computerTotal === 21) {
        message = 'Нічия, у обох 21!';
    } else if (playerTotal === 21) {
        playerScore++;
        message = `${playerName} виграв з 21!`;
    } else if (computerTotal === 21) {
        computerScore++;
        message = 'Комп\'ютер виграв з 21!';
    } else if (playerTotal > computerTotal) {
        playerScore++;
        message = `${playerName} виграв раунд!`;
    } else if (playerTotal < computerTotal) {
        computerScore++;
        message = 'Комп\'ютер виграв раунд!';
    } else {
        message = 'Нічия!';
    }

    document.getElementById('winnerMessage').textContent = message;


    if (currentRound < maxRounds) {
        document.getElementById('nextRoundBtn').style.display = 'block';
    } else {
        declareFinalWinner();
    }
}

function startNextRound() {
    currentRound++;
    startNewRound();
}

function declareFinalWinner() {
    let finalMessage;
    if (playerScore > computerScore) {
        finalMessage = `${playerName} виграв гру з рахунком ${playerScore} - ${computerScore}!`;
    } else if (playerScore < computerScore) {
        finalMessage = `Комп'ютер виграв гру з рахунком ${computerScore} - ${playerScore}!`;
    } else {
        finalMessage = 'Гра закінчилася в нічию!';
    }
    document.getElementById('winnerMessage').textContent = finalMessage;

    // Показуємо кнопку для перезапуску гри
    document.getElementById('restartGameBtn').style.display = 'block';
}

function restartGame() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;

    document.getElementById('playerTotal').textContent = '0';
    document.getElementById('computerTotal').textContent = '0';
    document.getElementById('roundNumber').textContent = '1';
    document.getElementById('winnerMessage').textContent = '';

    document.getElementById('playerCards').innerHTML = '';
    document.getElementById('computerCards').innerHTML = '';

    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('registrationModal').style.display = 'none';
    document.getElementById('restartGameBtn').style.display = 'none';
    document.getElementById('nextRoundBtn').style.display = 'none';

    startNewRound();
}

// Відкриття і закриття модального вікна з правилами
const openRulesBtn = document.getElementById('openRulesBtn');
const closeRulesBtn = document.getElementById('closeRulesBtn');
const rulesModal = document.getElementById('rulesModal');

openRulesBtn.addEventListener('click', function() {
    rulesModal.style.display = 'flex';
});

closeRulesBtn.addEventListener('click', function() {
    rulesModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === rulesModal) {
        rulesModal.style.display = 'none';
    }
});
