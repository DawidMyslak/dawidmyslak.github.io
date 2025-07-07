const { createGame } = gameEngine;

const game = createGame({
  id: "game",
  width: 800,
  height: 600,
});

let playerSprite = null;
let appleSprite = null;

let playerPositionX = 0;
let playerPositionY = 0;

game.onLoad(async () => {
  playerSprite = await game.loadSprite("player.png");
  appleSprite = await game.loadSprite("apple.png");
});

game.onUpdate(() => {
  if (game.isKeyDown('ArrowRight')) {
    playerPositionX = playerPositionX + 1;
  }

  if (game.isKeyDown('ArrowLeft')) {
    playerPositionX = playerPositionX - 1;
  }

  if (game.isKeyDown('ArrowDown')) {
    playerPositionY = playerPositionY + 1;
  }

  if (game.isKeyDown('ArrowUp')) {
    playerPositionY = playerPositionY - 1;
  }


  // playerPositionX = playerPositionX + 1;
  // playerPositionY = playerPositionY + 1;
});

game.onDraw(() => {
  game.clearCanvas();
  game.drawSprite(playerSprite, { x: playerPositionX, y: playerPositionY });
  game.drawSprite(appleSprite, { x: 100, y: 100 });
  game.drawSprite(appleSprite, { x: 600, y: 500 });
});

game.start();
