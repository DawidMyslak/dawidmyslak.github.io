const delay = async function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const renderResult = function(result) {
  document.getElementsByClassName('result')[0].innerHTML = 'Nearest exit steps: ' + result;
}

const renderMaze = function(maze, x, y) {
  const mazeWidth = maze.length;
  const mazeHeight = maze[0].length;

  let html = '';
  
  for (let i = 0; i < mazeWidth; i++) {
      for (let j = 0; j < mazeHeight; j++) {
        colors = {
          '+': 'orange',
          '.': 'white',
          'x': 'yellow',
        };

        let styles = `
          top: ${i * 32}px;
          left: ${j * 32}px;
          background-color: ${colors[maze[i][j]]};
        `;

        let classes = 'cell';
        if (i === x && j === y) {
          classes += ' cell-active';
        }

        html += `
          <div class="${classes}" style="${styles}">
            ${maze[i][j]}
          </div>
        `;
      }   
  }

  document.getElementsByClassName('maze')[0].innerHTML = html;
};

 const nearestExit = async function(maze, entrance) {
  const mazeWidth = maze.length;
  const mazeHeight = maze[0].length;
  let hasCheckedEntranceCell = false;
  let stepsCounter = 0;
  renderResult(stepsCounter);

  const queue = [{ x: entrance[0], y: entrance[1] }];
  
  while (queue.length > 0) {
      const l = queue.length;

      for (let i = 0; i < l ; i++) {
          const position = queue.shift();

          renderMaze(maze, position.x, position.y);
          await delay(50);
          
          if (maze[position.x][position.y] === '.') {
              maze[position.x][position.y] = 'x'; // visited

              if (hasCheckedEntranceCell && (
                  position.x === 0 ||
                  position.y === 0 ||
                  position.x === mazeWidth -1 ||
                  position.y === mazeHeight -1)) {
                renderResult(stepsCounter);
                return stepsCounter;
              }

              hasCheckedEntranceCell = true;

              if (position.x + 1 < mazeWidth) queue.push({ x: position.x + 1, y: position.y });
              if (position.y + 1 < mazeHeight) queue.push({ x: position.x, y: position.y + 1 });
              if (position.x - 1 >= 0) queue.push({ x: position.x - 1, y: position.y });
              if (position.y - 1 >= 0) queue.push({ x: position.x, y: position.y - 1 });
          }
      }
      
      stepsCounter++;
  }
  
  return -1;
};

const maze = [[".",".",".",".",".","+",".",".","."],[".","+",".",".",".",".",".",".","."],[".",".","+",".","+",".","+",".","+"],[".",".",".",".","+",".",".",".","."],[".",".",".",".","+","+",".",".","."],["+",".",".",".",".",".",".",".","."],[".",".",".","+",".",".",".",".","."],[".",".",".","+",".",".",".",".","+"],["+",".",".","+",".","+","+",".","."]];
const entrance = [8,4];
nearestExit(maze, entrance);
