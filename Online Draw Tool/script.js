const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let brushColor = 'black';
let brushSize = 5;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

let history = [];
let historyIndex = -1;

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = brushColor;
  context.lineWidth = brushSize;
  context.stroke();
}

function handleMouseDown(event) {
  isDrawing = true;
  lastX = event.clientX - canvas.offsetLeft;
  lastY = event.clientY - canvas.offsetTop;
}

function handleMouseUp() {
  if (isDrawing) {
    isDrawing = false;
    saveState();
  }
}

function handleMouseMove(event) {
  if (!isDrawing) return;
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;
  drawLine(lastX, lastY, x, y);
  lastX = x;
  lastY = y;
}

function handleColorChange(event) {
  brushColor = event.target.style.backgroundColor;
}

function handleSizeChange(event) {
  brushSize = event.target.value;
}

function handleUndo() {
  if (historyIndex > 0) {
    historyIndex--;
    redraw();
  }
}

function handleRedo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    redraw();
  }
}

function saveState() {
  if (history.length > historyIndex + 1) {
    history.splice(historyIndex + 1);
  }
  history.push(canvas.toDataURL());
  historyIndex++;
}

function redraw() {
  const image = new Image();
  image.src = history[historyIndex];
  image.onload = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
  };
}

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mousemove', handleMouseMove);
document.querySelectorAll('.color').forEach(color => {
  color.addEventListener('click', handleColorChange);
});
document.getElementById('brush-size').addEventListener('input', handleSizeChange);
document.getElementById('undo').addEventListener('click', handleUndo);
document.getElementById('redo').addEventListener('click', handleRedo);

