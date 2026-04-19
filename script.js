let score = 0;
let gameRunning = false;

let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");
let stars = document.getElementById("stars");

let playerPos = 140;
let obstaclePos = -40;

// ⭐ CREATE STARS (IMPORTANT FIX)
function createStars() {
  for (let i = 0; i < 40; i++) {
    let star = document.createElement("div");
    star.classList.add("star");
    star.style.left = Math.random() * 320 + "px";
    star.style.top = Math.random() * 520 + "px";
    star.style.animationDuration = (Math.random() * 3 + 2) + "s";
    stars.appendChild(star);
  }
}

createStars();

// 🎮 CONTROL
document.addEventListener("keydown", move);

function move(e) {
  if (!gameRunning) return;

  if (e.key === "ArrowLeft" && playerPos > 0) playerPos -= 20;
  if (e.key === "ArrowRight" && playerPos < 280) playerPos += 20;

  player.style.left = playerPos + "px";
}

// 📱 TOUCH SUPPORT
document.addEventListener("touchstart", (e) => {
  if (!gameRunning) return;

  let x = e.touches[0].clientX;

  if (x < window.innerWidth / 2 && playerPos > 0) {
    playerPos -= 25;
  } else {
    playerPos += 25;
  }

  player.style.left = playerPos + "px";
});

// 🚀 START GAME
function startGame() {
  score = 0;
  gameRunning = true;

  obstaclePos = -40;
  obstacle.style.top = obstaclePos + "px";

  gameLoop();
}

// 🔁 GAME LOOP
function gameLoop() {
  if (!gameRunning) return;

  obstaclePos += 6;
  obstacle.style.top = obstaclePos + "px";

  // reset obstacle
  if (obstaclePos > 520) {
    obstaclePos = -40;
    obstacle.style.left = Math.random() * 280 + "px";
    score++;
    document.getElementById("score").innerText = score;
  }

  // collision
  let obsX = parseInt(obstacle.style.left);

  if (
    obstaclePos > 450 &&
    Math.abs(playerPos - obsX) < 40
  ) {
    alert("💥 GAME OVER! Score: " + score);
    gameRunning = false;
    return;
  }

  requestAnimationFrame(gameLoop);
}
