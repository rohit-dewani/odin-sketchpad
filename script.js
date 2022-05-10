const sketchpadContainer = document.querySelector(".sketchpad-container");

const colorPicker = document.querySelector('#color-picker')
let currentColor = colorPicker.value;

colorPicker.oninput = function() {
  currentColor = this.value;
}

const chosenColor = document.getElementById('chosen-color');
const randomColor = document.getElementById('random-color');
const eraser = document.getElementById('eraser');

let currentMode = 'chosen';

chosenColor.onclick = function() {
  chosenColor.classList.add('active');
  randomColor.classList.remove('active');
  eraser.classList.remove('active');
  currentMode = 'chosen';
}

randomColor.onclick = function() {
  randomColor.classList.add('active');
  chosenColor.classList.remove('active');
  eraser.classList.remove('active');
  currentMode = 'random';
}

eraser.onclick = function() {
  eraser.classList.add('active');
  chosenColor.classList.remove('active');
  randomColor.classList.remove('active');
  currentMode = 'eraser';
}

//create grid
function createGrid(numberOfSquares){
  sketchpadContainer.style.cssText = 'grid-template: repeat('+ numberOfSquares +',1fr) /repeat('+ numberOfSquares +',1fr)';
  while (sketchpadContainer.lastChild) {
    sketchpadContainer.removeChild(sketchpadContainer.lastChild)
  }

  for(let i = 0; i < numberOfSquares * numberOfSquares; i++){
    const sketchpadElement = document.createElement('div');
    sketchpadElement.classList.add('sketchpad-element');
    sketchpadElement.addEventListener('mousedown', changeColor);
    sketchpadElement.addEventListener('mouseover', changeColor);
    sketchpadContainer.appendChild(sketchpadElement);
   }
}

//know if mouse is clicked on the sketchpad or not
let mouseDown = 0;
sketchpadContainer.onmousedown = function() { 
  ++mouseDown;
}
sketchpadContainer.onmouseup = function() {
  --mouseDown;
}

//change color of grid elements
function changeColor(e) {
    if(e.type == 'mouseover' && !mouseDown) return;
    if(currentMode == 'chosen') e.target.style.backgroundColor = currentColor;
    if(currentMode == 'random'){
      const HUE = Math.floor(Math.random() * 361);
      const SAT = Math.floor(Math.random() * 101);
      const LIGHT = Math.floor(Math.random() * 101);
      let color = `hsl(${HUE}, ${SAT}%, ${LIGHT}%)`;
      e.target.style.backgroundColor = color;
    }
    if(currentMode == 'eraser') e.target.style.backgroundColor = "#fff";
}

//clear grid
function clearGrid() {
  const sketchpadElements = document.querySelectorAll('.sketchpad-element');
  for( let i = 0; i < sketchpadElements.length; i++){
   sketchpadElements[i].style.backgroundColor = '#fff';
  }
}

//clear grid button
const clearGridBtn = document.getElementById('clear-grid-btn');
clearGridBtn.onclick = clearGrid;

//get value of slider for grid size
const slider = document.getElementById('slider');
let sliderVal = slider.value;
//print slider value on screen
let sliderOutput = document.getElementById('slider-output');
sliderOutput.innerHTML = sliderVal + ' X ' + sliderVal;

createGrid(sliderVal);

slider.oninput = function() {
    sliderVal = this.value;
    sliderOutput.innerHTML = sliderVal + ' X ' + sliderVal;
    createGrid(sliderVal);
}