const gameBoard = document.querySelector(".game-board");
const gameScore = document.querySelector(".game-score");
const buttonPlay = document.querySelector(".game-start");
const buttonExit = document.querySelector(".win-overlay button");
const popUp = document.querySelector(".win-overlay");
const resultNumber = document.querySelector(".result-number");
buttonPlay.addEventListener("click", startGame);
buttonExit.addEventListener("click", exitPopUp);
console.log(buttonExit, popUp);
function exitPopUp() {
  popUp.style.display = "none";
}
const gameTiles = 20;
const winArr = [];
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
resultNumber.innerText = game.moves;
function startGame() {
  addTiles();
}

// return all;
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
    div.addEventListener("click", showTile);
    div.classList.add("game-tile");
    div.innerHTML = `<img class = "hide" src = '${sortedTilesImages[index]}'>`;
    gameBoard.append(div);
  });
};

function showTile(e) {
  // Mechanizm odkrywania karty i dodawania karty
  console.log(game.tilesChecked.length);
  console.log(e.target);
  if (game.tilesChecked.length < 2) {
    e.target.classList.remove("hide");
    addTileToArray(e);
  } else {
    return;
  }
  if (game.tilesChecked.length === 2) {
    checkPair(e);
  }
}
function addTileToArray(e) {
  // Jeśli dwa razy został kliknięty ten sam element i tablica jest już "zapełniona"
  if (
    game.tilesChecked.includes(e.target.parentNode) ||
    game.tilesChecked.length === 2
  ) {
    return;
  } else {
    game.tilesChecked.push(e.target.parentNode);
  }
}

function checkPair(e) {
  // Mechanizm sprawdzania czy karty są parą
  checkWin();
  check();
}
function check2(el) {
  return el.classList === "";
}

function check() {
  if (winArr.length === 20) {
    console.log("Wygrałeś");
    popUp.style.display = "flex";
  }
}

function checkWin() {
  const img0 = [...game.tilesChecked[0].children];
  [img2] = img0;
  const img1 = [...game.tilesChecked[1].children];
  [img3] = img1;

  if (img2.src === img3.src) {
    winArr.push(img2, img3);
    console.log(winArr);
    console.log("Masz parę!");
    game.tilesChecked.length = "";
  } else {
    game.moves += 1;
    gameScore.innerText = game.moves;
    setTimeout(hide, 1000);
    console.log("Nie masz pary!");
  }
}

function hide() {
  const img0 = [...game.tilesChecked[0].children];
  [img2] = img0;
  const img1 = [...game.tilesChecked[1].children];
  [img3] = img1;
  img2.classList.add("hide");
  img3.classList.add("hide");
  game.tilesChecked.length = "";
}
