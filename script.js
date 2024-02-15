const firstItemsPool = [
    {
        name: 'camera',
        img: './img/camera.jpg'
    },
    {
        name: 'laptop',
        img: './img/laptop.jpg'
    },
    {
        name: 'scissors',
        img: './img/scissors.jpg'
    },
    {
        name: 'smartphone',
        img: './img/smartphone.jpg'
    },
    {
        name: 'lipstick',
        img: './img/lipstick.jpg'
    },
    {
        name: 'sharpener',
        img: './img/sharpener.jpg'
    }
];

const secondItemsPool = [
    {
        name: 'cherry',
        img: './img/cherry.jpg'
    },
    {
        name: 'sushi',
        img: './img/sushi.jpg'
    },
    {
        name: 'ruler',
        img: './img/ruler.jpg'
    },
    {
        name: 'kiss',
        img: './img/kiss.jpg'
    },
    {
        name: 'lamp',
        img: './img/lamp.jpg'
    },
    {
        name: 'notebook',
        img: './img/notebook.jpg'
    }
];

const message = document.querySelector(".message");
const gridContent = document.querySelector(".grid");
const restartButton = document.querySelector(".restart-button");
const slider = document.getElementById("difficultySlider");
const levels = document.querySelectorAll(".slider__levels span");
const rulesButton = document.querySelector(".menu__button--rules");
const startButton = document.querySelector(".menu__button--start");
const menuButtons = document.querySelectorAll(".menu__item");
const rules = document.querySelector(".rules");

let hardMode = false;
let totalCards = 0;

let timeToClose = 1000;

rulesButton.addEventListener("click", showRules);

function showRules() {
    menuButtons.forEach((button) => {
        button.style.display = 'none';
    });

    restartButton.innerText = 'Back';
    rules.style.display = 'flex';
}


function setMid() {
    timeToClose = 500;
}

let cards = document.querySelectorAll('.grid__card');

cards = document.querySelectorAll('.grid__card');


cards.forEach((card, index) => {
    card.setAttribute('data-index', index);
    card.addEventListener('click', openCard);
});


function setDif(){
    totalCards = hardMode ? 24 : 12;
    timeToClose = 1200;

    gridContent.style.gridTemplateColumns = "repeat(8, 1fr)";
    gridContent.style.gridTemplateRows = "repeat(3, auto)";

    for (let i = 0; i < 12; i++) {
        const gridCard = document.createElement('div');
        gridCard.classList.add('grid__card');
    
        const cardImg = document.createElement('div');
        cardImg.classList.add('card__img');
    
        gridCard.appendChild(cardImg);
    
        gridContent.appendChild(gridCard);
    
        gridCard.addEventListener('click', openCard);
    }
    
    cards = document.querySelectorAll('.grid__card');

    cards.forEach((card, index) => {
        card.setAttribute('data-index', index);
        card.addEventListener('click', openCard);
    });
    
    const cardImgs = document.querySelectorAll('.card__img');

    if (hardMode) {
        cardImgs.forEach((img) => {
            img.style.backgroundImage = `url('./img/bg-card--hard-mode.jpg')`;
          });
    }
}

let gameStart = false;

startButton.addEventListener("click", startGame);

let value = 1;

slider.addEventListener("input", function() {
    value = parseInt(this.value);
    console.log(value);
});

function startGame() {
    gameStart = true;
    message.style.display = 'none';
    gridContent.style.display = 'grid';

    if (value === 2) {
        setMid();
        hardMode = false;
    } else if (value === 3) {
        hardMode = true;
        setDif();
    } else {
        hardMode = false;
    }
 
    if (hardMode) {
        currentArray = [...shuffleArray(hardItemPool)];
    } else {
        currentArray = [...shuffleArray(ezItemsPool)];
    }
    
}

slider.addEventListener("input", function() {
  const value = parseInt(this.value);
  levels.forEach((level, index) => {
    level.style.fontWeight = index + 1 === value ? "bold" : "normal";
  });
});


const ezItemsPool = [...firstItemsPool, ...firstItemsPool];
const hardItemPool = [...firstItemsPool, ...firstItemsPool, ...secondItemsPool, ...secondItemsPool];

const textScore = document.querySelector('.tab__item');
let clickable = true;
let score = 0;
let cardCount = 0;
textScore.innerText = `SCORE: ${score}`;


let firstCardClicked = null;

let currentArray = [];

if (!gameStart) {
    if (hardMode) {
        currentArray = [...shuffleArray(hardItemPool)]
    } else {
        currentArray = [...shuffleArray(ezItemsPool)];
    }
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}



function openCard(event) {
    if (!gameStart) {
        gameStart = true;
    }

    if (!clickable) {
        return;
    }

    let clickedCard = event.currentTarget;

    const cardImg = clickedCard.querySelector('.card__img');

    const dataIndex = parseInt(clickedCard.getAttribute('data-index'));
    const imgLink = currentArray[dataIndex].img;
    const currentCardName = currentArray[dataIndex].name;

    cardImg.style.backgroundImage = `url(${imgLink})`;

    if (firstCardClicked === null) {
        firstCardClicked = {
            card: clickedCard,
            name: currentCardName
        };
        firstCardClicked.card.querySelector('.card__img').classList.add('wait');
        clickable = true;
    } else {
        firstCardClicked.card.querySelector('.card__img').classList.remove('wait');
        clickable = false; 

        if (clickedCard === firstCardClicked.card) {
            clickable = true; 
            return;
        }

        if (currentCardName !== firstCardClicked.name) {
            cardImg.classList.add('flip-animation');
            
            
            firstCardClicked.card.querySelector('.card__img').classList.add('flip-animation');
            setTimeout(function() {
                firstCardClicked.card.querySelector('.card__img').classList.remove('flipped');
                cardImg.classList.remove('flipped');
                if (hardMode) {   
                    firstCardClicked.card.querySelector('.card__img').style.backgroundImage = `url('./img/bg-card--hard-mode.jpg')`;
                } else {
                    firstCardClicked.card.querySelector('.card__img').style.backgroundImage = `url('./img/bg-card.jpg')`;
                }

                if (hardMode) {
                    cardImg.style.backgroundImage = `url('./img/bg-card--hard-mode.jpg')`;
                } else {
                    cardImg.style.backgroundImage = `url('./img/bg-card.jpg')`;
                }

                firstCardClicked = null;
                clickable = true;
                score--;

                if (score < 0) {
                    score = 0;
                }
                
                textScore.innerText = `SCORE: ${score}`;
            }, timeToClose);
        } else {

            score++;
            firstCardClicked = null;
            clickable = true;
            cardCount += 2;
            textScore.innerText = `SCORE: ${score}`;
            
        }
    }

    lastCardName = currentCardName;
    checkWin();

    setTimeout(function() {
        cardImg.classList.add('flipped');
    }, 50);
}


function checkWin() {
    let totalCards = hardMode ? 24 : 12;

    if (!hardMode && score >= 3 && cardCount === totalCards) {
        WinGame();
    } else if (hardMode && score >= 5 && cardCount === totalCards) {
        WinGame();
    } else if (score < 3 && cardCount === totalCards) {
        LoseGame();
    } 

    const messageScore = document.querySelector(".message__score");
    messageScore.innerText = `YOUR SCORE: ${score}/${totalCards / 2}`;
}


function WinGame() {
    gridContent.style.display = 'none';
    message.style.display = 'flex';
    menuButtons.forEach((button) => {
        button.style.display = 'none';
    });

    const winMessage = document.querySelector(".message__description--win");
    winMessage.style.display = 'block';
};

function LoseGame() {
    gridContent.style.display = 'none';
    message.style.display = 'flex';
    menuButtons.forEach((button) => {
        button.style.display = 'none';
    });

    const loseMessage = document.querySelector(".message__description--lose");
    loseMessage.style.display = 'block';
}

restartButton.addEventListener("click", restart);

function restart() {
    location.reload();
}

