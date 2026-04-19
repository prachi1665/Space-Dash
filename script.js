let score = 0;
let gameRunning = false;

let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");

let playerPos = 130;
let obstaclePos = -50;

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
  if (!gameRunning) return;

  if (e.key === "ArrowLeft" && playerPos > 0) {
    playerPos -= 20;
  }

  if (e.key === "ArrowRight" && playerPos < 260) {
    playerPos += 20;
  }

  player.style.left = playerPos + "px";
}

function startGame() {
  score = 0;
  gameRunning = true;
  obstaclePos = -50;
  obstacle.style.top = obstaclePos + "px";

  gameLoop();
}

function gameLoop() {
  if (!gameRunning) return;

  obstaclePos += 8;
  obstacle.style.top = obstaclePos + "px";

  // collision
  if (
    obstaclePos > 420 &&
    Math.abs(playerPos - parseInt(obstacle.style.left)) < 40
  ) {
    alert("💥 Game Over! Score: " + score);
    gameRunning = false;
    return;
  }

  if (obstaclePos > 500) {
    obstaclePos = -50;
    obstacle.style.left = Math.floor(Math.random() * 260) + "px";
    score++;
    document.getElementById("score").innerText = score;
  }

  requestAnimationFrame(gameLoop);
}
