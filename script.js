const DEFAULT_COLOR = '#d8d8d8';  // Light Gray - Regular unaffected grid cell
const ETCH_COLOR = '#505050';     // Dary Gray - Etched grid cell color
const MAX_WIDTH = 879;            // Max width of grid to keep consistent spacing

const container = document.getElementById("grid-container");
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const clearBtn = document.getElementById("clear");
const classicBtn = document.getElementById('classic');
const eraserBtn = document.getElementById('eraser');

classicBtn.onclick = (e) => setMode(e.target.value);
eraserBtn.onclick = (e) => setMode(e.target.value);
// clearBtn uses Event listener instead
sizeSlider.oninput = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => newGridSize(e.target.value);

// For future reference, it is best practice to list functions first before using them
// However, keeping this organizing simples layout, providing ease of viewing code

function setMode(mode) {
  const grid = container.querySelectorAll('div');

  switch (mode) {
    case 'classic':
      grid.forEach(cell => cell.addEventListener("mouseover", (e) => {
          e.target.style.backgroundColor = ETCH_COLOR;
        }));
        grid.forEach(cell => cell.addEventListener("touchmove", (e) => {
          e.target.style.backgroundColor = ETCH_COLOR;
        }));
      return;
    case 'eraser':
      grid.forEach(cell => cell.addEventListener("mouseover", (e) => {
        e.target.style.backgroundColor = DEFAULT_COLOR;
      }));
      grid.forEach(cell => cell.addEventListener("touchmove", (e) => {
        e.target.style.backgroundColor = DEFAULT_COLOR;
      }));
      return;
  }
}

clearBtn.addEventListener('click', () => {
  const grid = container.querySelectorAll("div");
  grid.forEach(cell => cell.style.backgroundColor = DEFAULT_COLOR);
})

function updateSizeValue(value) {
  sizeValue.innerHTML = `${value} x ${value}`;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const makeGrid = (size) => {
  container.style.setProperty('--grid-rows', size);
  container.style.setProperty('--grid-cols', size);
  for (let i = 0; i < (size * size); i++) {
    let cell = document.createElement("div");
    cell.style.width = MAX_WIDTH / size + "px";
    cell.style.height = MAX_WIDTH / size + "px";
    container.appendChild(cell).className = "cell";
  }
  setMode('classic');
};

function newGridSize(size) {
  removeAllChildNodes(container);
  makeGrid(size);
}

window.onload = () => {
  makeGrid(16);
}