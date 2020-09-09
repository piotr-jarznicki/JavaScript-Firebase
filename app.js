const gameBoard = document.querySelector(".game-board");
const gameScore = document.querySelector(".game-score");

// console.log(gameScore);
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
    div.addEventListener("click", checkPair);
    div.addEventListener("click", showPair);

    div.classList.add("game-tile");
    div.innerHTML = `<img class ="hide"  src = '${sortedTilesImages[index]}'>`;
    gameBoard.append(div);
  });
};

function showPair(e) {
  // Mechanizm odkrywania karty
  console.log(e.target);
  e.target.classList.remove("hide");
  if (game.tilesChecked.length === 2) {
    return;
  }
}

function checkPair(e) {
  // Mechanizm sprawdzania czy karty są parą

  console.log(gameBoardArray);
  if (game.tilesChecked.includes(e.target.parentNode)) {
    return;
  } else {
    game.tilesChecked.push(e.target.parentNode);
  }
  // console.log(game.tilesChecked.length);
  if (game.tilesChecked.length === 2) {
    console.log("Mam dwa");
    // gameBoardArray.forEach((child) => {
    //   child.setAttribute("disabled", "disabled");
    // });
    checkWin();
    setTimeout(hide, 3000);

    // game.tilesChecked[0].classList.remove("hide");
    // game.tilesChecked[1].classList.remove("hide");
  }
}

function checkWin() {
  const img0 = [...game.tilesChecked[0].children];
  [img2] = img0;
  const img1 = [...game.tilesChecked[1].children];
  [img3] = img1;
  console.log(img2.src);
  console.log(img3.src);

  if (img2.src === img3.src) {
    console.log("Masz parę!");
  } else {
    game.moves += 1;
    gameScore.innerText = game.moves;
    console.log("Nie masz pary!");
  }
}

function hide() {
  const img0 = [...game.tilesChecked[0].children];
  [img2] = img0;
  const img1 = [...game.tilesChecked[1].children];
  [img3] = img1;
  console.log(gameBoard.children);

  img2.classList.add("hide");
  img3.classList.add("hide");
  game.tilesChecked.length = "";
}
window.onload = addTiles();
