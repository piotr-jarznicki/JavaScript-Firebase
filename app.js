const gameBoard = document.querySelector(".game-board");
const gameTiles = 20;
const game = {
  moves: 0,
  tilesChecked: [],
  tilesImages: [
    "img2/item_1.png ",
    "img2/item_2.png ",
    "img2/item_3.png ",
    "img2/item_4.png ",
    "img2/item_5.png ",
    "img2/item_6.png ",
    "img2/item_7.png ",
    "img2/item_8.png ",
    "img2/item_9.png ",
    "img2/item_10.png ",
    "img2/item_1.png ",
    "img2/item_2.png ",
    "img2/item_3.png ",
    "img2/item_4.png ",
    "img2/item_5.png ",
    "img2/item_6.png ",
    "img2/item_7.png ",
    "img2/item_8.png ",
    "img2/item_9.png ",
    "img2/item_10.png ",
  ],
};

// Pomysł z obiektem, wyciągałbym id z obiektu i wstawiał wszczepiał do diva po czym porównywał idiki przy e.target

const tiles = [
  { id: 1, src: "img2/item_1.png " },
  { id: 2, src: "img2/item_2.png " },
  { id: 3, src: "img2/item_3.png " },
  { id: 4, src: "img2/item_4.png " },
  { id: 5, src: "img2/item_5.png " },
  { id: 6, src: "img2/item_6.png " },
  { id: 7, src: "img2/item_7.png " },
  { id: 8, src: "img2/item_8.png " },
  { id: 9, src: "img2/item_9.png " },
  { id: 10, src: "img2/item_10.png " },
];

const arrIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Pomysł, żeby porównywać id i na ich podstawie sprawdzać czy mamy parę
// tilesImages.sort(function () {
//   return 0.5 - Math.random();
// });

arrIds.sort(function () {
  return 0.5 - Math.random();
});

function checkPair() {
  // Porównywanie src e.targetu i src previous.e.targetu(?)
}

const addTiles = () => {
  function sortTilesImages() {
    const sortedTilesImages = game.tilesImages.sort((arr) => {
      return 0.5 - Math.random();
    });
    return sortedTilesImages;
  }

  const sortedTilesImages = sortTilesImages();
  sortedTilesImages.forEach((el, index) => {
    const div = document.createElement("div");
    div.classList.add("game-tile");
    div.innerHTML = `<img src = '${sortedTilesImages[index]}'>`;
    div.id = `${arrIds[index]}`;
    gameBoard.append(div);
  });
};

function checkPair() {}

window.onload = addTiles();
