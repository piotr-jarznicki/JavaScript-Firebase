const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const birdImage = document.getElementById("source");
let call = false;
canvas.width = 600;
canvas.height = 600;

const bird = {
  posX: canvas.width - 550,
  posY: 300,
};

const flyBird = () => {
  call = true;
  if (call) {
    updateBird();
  }
  call = false;
};

const updateBird = () => {
  bird.posY -= 20;
  bird.posX += 0.5;
};

// const birdFall = () => {
//   bird.posY += 30;
//   bird.posX += 0.5;
// };
const createBird = () => {
  const image = document.createElement("img");
  image.src = "assets/sprites/yellowbird-midflap.png";
  canvas.addEventListener("click", flyBird);
  return image;
};

const drawBird = () => {
  ctx.drawImage(createBird(), bird.posX, bird.posY);
};

const updateScreen = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (call) {
    updateBird();
  }
  drawBird();
};

setInterval(updateScreen, 60);
// setInterval(updateBird, 60);
