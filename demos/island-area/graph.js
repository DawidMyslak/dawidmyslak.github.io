const delay = async function(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const renderResult = function(result) {
  document.getElementsByClassName('result')[0].innerHTML = 'Max area: ' + result;
}

const renderGrid = function(grid, x, y) {
  const gridWidth = grid.length;
  const gridHeight = grid[0].length;

  let html = '';
  
  for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        colors = {
          '0': 'blue',
          '1': 'orange',
          '2': 'yellow',
        };

        let styles = `
          top: ${i * 32}px;
          left: ${j * 32}px;
          background-color: ${colors[grid[i][j]]};
        `;

        let classes = 'cell';
        if (i === x && j === y) {
          classes += ' cell-active';
        }

        html += `
          <div class="${classes}" style="${styles}">
            ${grid[i][j]}
          </div>
        `;
      }   
  }

  document.getElementsByClassName('grid')[0].innerHTML = html;
};

const maxAreaOfIsland = async function(grid) {
  const gridWidth = grid.length;
  const gridHeight = grid[0].length;
  let maxArea = 0;
  renderResult(maxArea);
  
  const dfs = async (x, y) => {
      renderGrid(grid, x, y);
      await delay(50);

      if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight || grid[x][y] !== 1)
          return 0;
      
      grid[x][y] = 2; // visited
      
      return 1 +
          await dfs(x + 1, y) +
          await dfs(x, y + 1) +
          await dfs(x - 1, y) +
          await dfs(x, y - 1);
  };
  
  for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        if (grid[i][j] === 1) {
            const area = await dfs(i, j);
            maxArea = Math.max(maxArea, area);
            renderResult(maxArea);
        }
        else {
          renderGrid(grid, i, j);
          await delay(50);
        }
      }   
  }
  
  return maxArea;
};

const grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]];
maxAreaOfIsland(grid);
