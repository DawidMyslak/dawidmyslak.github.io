const gameEngine = {
  createGame: function (options) {
    // ========================================
    // Create canvas and context
    // ========================================

    const canvas = document.getElementById(options.id);
    const ctx = canvas.getContext("2d");

    canvas.width = options.width;
    canvas.height = options.height;

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // ========================================
    // Load and cache sprite images
    // ========================================

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

    // ========================================
    // Objects helpers
    // ========================================

    let nextObjectId = 0;

    function createObject(sprite, position) {
      nextObjectId += 1;

      return {
        id: nextObjectId,
        sprite,
        x: position.x,
        y: position.y,
        width: sprite.width,
        height: sprite.height,
      };
    }

    function areObjectsInCollision(object1, object2) {
      return (
        object1.x < object2.x + object2.width &&
        object1.x + object1.width > object2.x &&
        object1.y < object2.y + object2.height &&
        object1.y + object1.height > object2.y
      );
    }

    function drawObject(object) {
      ctx.drawImage(object.sprite, object.x, object.y);
    }

    // ========================================
    // Keyboard state
    // ========================================

    let keys = {};

    window.addEventListener("keydown", (e) => {
      keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      keys[e.key] = false;
    });

    // ========================================
    // Callbacks references
    // ========================================

    let onLoadCallback, onUpdateCallback, onDrawCallback;

    // ========================================
    // Game loop
    // ========================================

    function runGameLoop() {
      if (onUpdateCallback) onUpdateCallback();
      if (onDrawCallback) onDrawCallback();
      requestAnimationFrame(runGameLoop);
    }

    async function start() {
      if (onLoadCallback) await onLoadCallback();
      runGameLoop();
    }

    // ========================================
    // Public API interface
    // ========================================

    return {
      clearCanvas,
      loadSprite,
      drawSprite,
      createObject,
      drawObject,
      areObjectsInCollision,
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
