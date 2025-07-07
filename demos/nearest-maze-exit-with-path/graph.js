let id = 0;

const delay = async function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const renderResult = function (result) {
  document.getElementsByClassName("result")[0].innerHTML =
    "Nearest exit steps: " + result;
};

const fillExitPath = function (stepsTracker, lastId) {
  let step = stepsTracker[lastId];

  while (step) {
    maze[step.x][step.y] = 3; // exit path
    step = stepsTracker[step.previousId];
  }
};

const renderMaze = function (maze, x, y) {
  const mazeWidth = maze.length;
  const mazeHeight = maze[0].length;

  let html = "";

  for (let i = 0; i < mazeWidth; i++) {
    for (let j = 0; j < mazeHeight; j++) {
      colors = {
        0: "#fff",
        1: "#4d4d4d",
        2: "#8cdcda",
        3: "#fdb137",
      };

      let styles = `
          top: ${i * 32}px;
          left: ${j * 32}px;
          background-color: ${colors[maze[i][j]]};
        `;

      let classes = "cell";
      if (i === x && j === y) {
        classes += " cell-active";
      }

      html += `
          <div class="${classes}" style="${styles}"></div>
        `;
    }
  }

  document.getElementsByClassName("maze")[0].innerHTML = html;
};

const nearestExit = async function (maze, entrance) {
  const mazeWidth = maze.length;
  const mazeHeight = maze[0].length;
  let hasCheckedEntranceCell = false;
  let stepsCounter = 0;
  renderResult(stepsCounter);

  const queue = [{ x: entrance[0], y: entrance[1], previousId: null }];
  const stepsTracker = {};

  while (queue.length > 0) {
    const l = queue.length;

    for (let i = 0; i < l; i++) {
      const cell = queue.shift();

      if (maze[cell.x][cell.y] === 0) {
        renderMaze(maze, cell.x, cell.y);
        await delay(50);

        maze[cell.x][cell.y] = 2; // visited

        id++;
        stepsTracker[id] = {
          x: cell.x,
          y: cell.y,
          previousId: cell.previousId,
        };

        if (
          hasCheckedEntranceCell &&
          (cell.x === 0 ||
            cell.y === 0 ||
            cell.x === mazeWidth - 1 ||
            cell.y === mazeHeight - 1)
        ) {
          fillExitPath(stepsTracker, id);
          renderMaze(maze);
          renderResult(stepsCounter);
          return stepsCounter;
        }

        hasCheckedEntranceCell = true;

        if (cell.x + 1 < mazeWidth)
          queue.push({ x: cell.x + 1, y: cell.y, previousId: id });
        if (cell.y + 1 < mazeHeight)
          queue.push({ x: cell.x, y: cell.y + 1, previousId: id });
        if (cell.x - 1 >= 0)
          queue.push({ x: cell.x - 1, y: cell.y, previousId: id });
        if (cell.y - 1 >= 0)
          queue.push({ x: cell.x, y: cell.y - 1, previousId: id });
      }
    }

    stepsCounter++;
  }

  return -1;
};

const maze = [
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

const entrance = [0, 3];
nearestExit(maze, entrance);
