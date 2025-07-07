const gameEngine = {
  createGame: function (options) {
    // Create canvas and context
    const canvas = document.getElementById(options.id);
    const ctx = canvas.getContext("2d");

    canvas.width = options.width;
    canvas.height = options.height;

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Load and cache sprite images
    const loadedSprites = {};

    async function loadSprite(src) {
      if (!loadedSprites[src]) {
        loadedSprites[src] = new Promise((resolve, reject) => {
          const sprite = new Image();
          sprite.src = src;
          sprite.onload = () => resolve(sprite);
          sprite.onerror = reject;
        });
      }
      return loadedSprites[src];
    }

    function drawSprite(sprite, position) {
      ctx.drawImage(sprite, position.x, position.y);
    }

    // Keyboard state
    let keys = {};

    window.addEventListener("keydown", (e) => {
      keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      keys[e.key] = false;
    });

    // Callbacks
    let onLoadCallback, onUpdateCallback, onDrawCallback;

    // Game loop
    function gameLoop() {
      if (onUpdateCallback) onUpdateCallback();
      if (onDrawCallback) onDrawCallback();
      requestAnimationFrame(gameLoop);
    }

    // Start game
    async function start() {
      if (onLoadCallback) await onLoadCallback();
      gameLoop();
    }

    return {
      clearCanvas,
      loadSprite,
      drawSprite,
      start,
      isKeyDown: (keyCode) => !!keys[keyCode],
      onLoad: (callback) => {
        onLoadCallback = callback;
      },
      onUpdate: (callback) => {
        onUpdateCallback = callback;
      },
      onDraw: (callback) => {
        onDrawCallback = callback;
      },
    };
  },
};
