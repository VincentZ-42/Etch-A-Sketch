const container = document.getElementById("container");
const clearBtn = document.getElementById("clear");
const newGridBtn = document.getElementById('newgrid');

// Creates grid to play Etch-A-Sketch
const makeGrid = (rows, cols) => {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (let i = 0; i < (rows * cols); i++) {
    let cell = document.createElement("div");
    // cell.innerText = i + 1;
    cell.addEventListener("mouseover", (e) => {
      e.target.style.backgroundColor = '#505050'; // Dark Gray
    });
    container.appendChild(cell).className = "cell";
  }
};

// When Clear button is pressed
// Resets entire grid background to default background Color
clearBtn.addEventListener('click', () => {
  const grid = document.querySelectorAll("div");
  grid.forEach(block => block.style.backgroundColor = 'transparent');
})


function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
// When New Grid Size Button is pressed
// 
newGridBtn.addEventListener('click', () => {
  let size = parseInt(prompt('What Square Grid size would you like? Max = 100'));

  while (!Number.isInteger(size) || size > 100 || size <= 0) {
    size = parseInt(prompt('Please enter a valid Integer between 0 - 101'));
  }

  // Gets current width n height of grid and sets this into container style
  let width = container.offsetWidth;
  let height = container.offsetHeight;

  // Removes all cells in grid
  removeAllChildNodes(container);

  // Sets up new grid with input Number
  makeGrid(size, size);
  container.style.setProperty('max-width', width + "px");
  container.style.setProperty('max-height', height + "px");
})

// 1249 1071
makeGrid(16, 16);