const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 800;

const sqW = 1200 / 10; // Scale idea // tiles
const sqH = 800 / 10; // Scale idea // tiles
const player = {
  posX: 100,
  posY: 100,
  width: 32,
  height: 48,
  frameX: 0,
  frameY: 0,
  speed: 6,
  moving: false,
};

const keys = [];

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}
const playerImg = new Image();
playerImg.src = "./images/dragoon_m.png";
function drawPlayer() {
  drawSprite(
    playerImg,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.posX,
    player.posY,
    player.width,
    player.height
  );
}

// const tile = {
//   w: canvas.width / 10,
//   h: canvas.height / 10,
//   id: od 1 do 96
// };
function drawGameBoardBackground() {
  const image = document.createElement("img");
  image.src = "./images/Sprites/Blocks/BackgroundTile.png";
  let pattern = ctx.createPattern(image, "repeat");
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateGameBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGameBoardBackground();
  playerMove();
  playerFrameHandler();
  drawPlayer();
}

window.addEventListener("keydown", function (e) {
  const key = e.keyCode;
  keys[key] = true;
  player.moving = true;
});

window.addEventListener("keyup", function (e) {
  const key = e.keyCode;
  delete keys[key];
  player.moving = false;
});

function playerMove() {
  //góra
  if (keys[87] && player.posY > 100) {
    player.posY -= player.speed;
    player.frameY = 3;
  }
  // lewo
  if (keys[65] && player.posX > 0) {
    player.posX -= player.speed;
    player.frameY = 1;
  }

  // dół
  if (keys[83] && player.posY < canvas.height - player.height) {
    player.posY += player.speed;
    player.frameY = 0;
  }

  // prawo
  if (keys[68] && player.posX < canvas.width - player.width) {
    player.posX += player.speed;
    player.frameY = 2;
  }
}

function playerFrameHandler() {
  if (player.frameX < 3 && player.moving) {
    player.frameX++;
  } else {
    player.frameX = 0;
  }
}

setInterval(updateGameBoard, 30);
