const { createGame } = gameEngine;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const PLAYER_SPEED = 2;

const game = createGame({
  id: "game",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

let player, apple1, apple2;

let isApple1Collected = false;
let isApple2Collected = false;

game.onLoad(async () => {
  const playerSprite = await game.loadSprite("player.png");
  const appleSprite = await game.loadSprite("apple.png");

  player = game.createObject(playerSprite, { x: 360, y: 220 });
  apple1 = game.createObject(appleSprite, { x: 100, y: 100 });
  apple2 = game.createObject(appleSprite, { x: 600, y: 500 });
});

game.onUpdate(() => {
  if (game.isKeyDown("ArrowRight")) {
    player.x = player.x + PLAYER_SPEED;
  }

  if (game.isKeyDown("ArrowLeft")) {
    player.x = player.x - PLAYER_SPEED;
  }

  if (game.isKeyDown("ArrowDown")) {
    player.y = player.y + PLAYER_SPEED;
  }

  if (game.isKeyDown("ArrowUp")) {
    player.y = player.y - PLAYER_SPEED;
  }

  if (game.areObjectsInCollision(player, apple1)) {
    isApple1Collected = true;
  }

  if (game.areObjectsInCollision(player, apple2)) {
    isApple2Collected = true;
  }

  if (player.x >= GAME_WIDTH) {
    player.x = -player.width;
  } else if (player.x <= -player.width) {
    player.x = GAME_WIDTH;
  }

  if (player.y >= GAME_HEIGHT) {
    player.y = -player.height;
  } else if (player.y <= -player.height) {
    player.y = GAME_HEIGHT;
  }
});

game.onDraw(() => {
  game.clearCanvas();
  game.drawSprite(player.sprite, { x: player.x, y: player.y });

  if (!isApple1Collected) {
    game.drawSprite(apple1.sprite, { x: apple1.x, y: apple1.y });
  } else {
    game.drawSprite(apple1.sprite, { x: player.x - 10, y: player.y + 75 });
  }

  if (!isApple2Collected) {
    game.drawSprite(apple2.sprite, { x: apple2.x, y: apple2.y });
  } else {
    game.drawSprite(apple1.sprite, { x: player.x + 60, y: player.y + 80 });
  }
});

game.start();
