const { createGame, renderText } = gameEngine;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const PLAYER_SPEED = 2;

const game = createGame({
  id: "game",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
});

let player, apple1, apple2, apple3;

let isApple1Collected = false;
let isApple2Collected = false;
let isApple3Collected = false;

let collectedApples = 0;

game.onLoad(async () => {
  const playerSprite = await game.loadSprite("player.png");
  const appleSprite = await game.loadSprite("apple.png");

  player = game.createObject(playerSprite, { x: 360, y: 220 });
  apple1 = game.createObject(appleSprite, { x: 100, y: 100 });
  apple2 = game.createObject(appleSprite, { x: 600, y: 500 });
  apple3 = game.createObject(appleSprite, { x: 700, y: 100 });

  renderText("score", collectedApples);
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

  if (!isApple1Collected && game.areObjectsInCollision(player, apple1)) {
    isApple1Collected = true;
    collectedApples += 1;
    renderText("score", collectedApples);
  }

  if (!isApple2Collected && game.areObjectsInCollision(player, apple2)) {
    isApple2Collected = true;
    collectedApples += 1;
    renderText("score", collectedApples);
  }

  if (!isApple3Collected && game.areObjectsInCollision(player, apple3)) {
    isApple3Collected = true;
    collectedApples += 1;
    renderText("score", collectedApples);
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

  if (!isApple3Collected) {
    game.drawSprite(apple3.sprite, { x: apple3.x, y: apple3.y });
  } else {
    game.drawSprite(apple3.sprite, { x: player.x + 50, y: player.y + 70 });
  }
});

game.start();
