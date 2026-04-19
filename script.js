let score = 0;
let level = 1;
let gameRunning = true;

let player = document.getElementById("player");
let gameArea = document.getElementById("gameArea");

let playerX = 140;
let bullets = [];
let enemies = [];

// 🌟 STARFIELD
function createStars() {
  for (let i = 0; i < 50; i++) {
    let star = document.createElement("div");
    star.classList.add("star");
    star.style.left = Math.random() * 320 + "px";
    star.style.top = Math.random() * 520 + "px";
    star.style.animationDuration = (Math.random() * 3 + 2) + "s";
    gameArea.appendChild(star);
  }
}
createStars();

// 🚀 MOVE PLAYER (TOUCH)
document.addEventListener("touchmove", (e) => {
  let x = e.touches[0].clientX;
  playerX = x - 30;
  player.style.left = playerX + "px";
});

// 🔫 SHOOT
function shoot() {
  if (!gameRunning) return;

  let bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = playerX + "px";
  bullet.style.bottom = "60px";

  gameArea.appendChild(bullet);
  bullets.push(bullet);
}

// 👾 SPAWN ENEMY
function spawnEnemy() {
  let enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.innerText = "☄️";
  enemy.style.left = Math.random() * 280 + "px";
  enemy.style.top = "-40px";

  gameArea.appendChild(enemy);
  enemies.push(enemy);
}

setInterval(spawnEnemy, 1200);

// 🔁 GAME LOOP
function gameLoop() {
  if (!gameRunning) return;

  // bullets move
  bullets.forEach((b, bi) => {
    let bottom = parseInt(b.style.bottom);
    b.style.bottom = bottom + 8 + "px";

    if (bottom > 520) {
      b.remove();
      bullets.splice(bi, 1);
    }
  });

  // enemies move
  enemies.forEach((e, ei) => {
    let top = parseInt(e.style.top);
    e.style.top = top + 4 + "px";

    // collision with player
    if (top > 450 && Math.abs(parseInt(e.style.left) - playerX) < 40) {
      endGame();
    }

    // bullet collision
    bullets.forEach((b, bi) => {
      let bBottom = parseInt(b.style.bottom);
      if (
        top > 400 &&
        Math.abs(parseInt(e.style.left) - parseInt(b.style.left)) < 30 &&
        bBottom > 400
      ) {
        e.remove();
        b.remove();
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score++;
        document.getElementById("score").innerText = score;

        if (score % 10 === 0) {
          level++;
          document.getElementById("level").innerText = level;
        }
      }
    });

    if (top > 520) {
      e.remove();
      enemies.splice(ei, 1);
    }
  });

  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameRunning = false;
  document.getElementById("gameOver").style.display = "block";
}

function restart() {
  location.reload();
}

gameLoop();
