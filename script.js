const sketchpadContainer = document.querySelector(".sketchpad-container");

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
    e.target.style.backgroundColor = '#333';
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