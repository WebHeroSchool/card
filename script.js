const body = document.body;
const getById = id => document.getElementById(id);
const startGameButton = getById('button');

const difficultyLabels = [
  getById('label-simple'),
  getById('label-average'),
  getById('label-difficult'),
];

const difficultyMap = {
  'Простой': {
    'class':'three-card-field',
    'cardCount': 3,
  },

  'Средний': {
    'class': 'six-card-field',
    'cardCount': 6,
  },

  'Сложный': {
    'class': 'ten-card-field',
    'cardCount': 10,
  },
};

let difficulty = getById('simple').value;
let cardWasClicked = false;

difficultyLabels.forEach(difficultyButton => {
  difficultyButton.onclick = function() {
    difficultyLabels.forEach(difficultyButton => difficultyButton.classList.remove('level_active'));
    this.classList.add('level_active');
    difficulty = this.children[0].value;
  };
});

const createCards = (number, field) => {
  let randomCard = Math.floor(Math.random() * number);
  for (let i = 0; i < number; i++) {
    const cardWrapper = document.createElement('div');
    const cardBackside = document.createElement('div');
    const winnerCard = document.createElement('div');
    const looserCard = document.createElement('div');
    if (i === randomCard) {
      cardWrapper.className = 'card-wrapper';
      cardWrapper.classList.add('card-wrapper_hover');
      field.append(cardWrapper);
      cardBackside.className ='card-backside';
      cardWrapper.append(cardBackside);
      winnerCard.className = 'winner-card';
      cardWrapper.append(winnerCard);
    } else {
      cardWrapper.className = 'card-wrapper';
      cardWrapper.classList.add('card-wrapper_hover');
      field.append(cardWrapper);
      cardBackside.className ='card-backside';
      cardWrapper.append(cardBackside);
      looserCard.className = 'looser-card';
      cardWrapper.append(looserCard);
    };
  };
};

startGameButton.addEventListener('click', () => {
  const levelMenu = getById('level-menu');
  const levelParams = difficultyMap[difficulty];
  const cardsField = document.createElement('div');
  cardsField.className = levelParams['class'];
  body.append(cardsField);

  createCards(levelParams['cardCount'], cardsField);

  levelMenu.style.display = 'none';

  document.querySelectorAll('.card-wrapper').forEach(card => {
    card.addEventListener('click', () => {
      if (cardWasClicked) {
        cardsField.style.display = 'none';
        levelMenu.style.display = '';
        cardWasClicked = false;
      } else {
        card.classList.add('card-click');
        card.classList.remove('card-wrapper_hover');
        cardWasClicked = true;
      };
    });
  });
}); 