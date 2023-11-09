// VARIABLES
/*
In this part we have the initial values of the grid and the variables that control the size of the grid, the color (of the squares of the grid) and the mode (eraser, color, clean)
*/
const INITIAL_GRID = 17;
const INITIAL_COLOR = "black";
const INITIAL_MODE = "color";
let actual_grid = INITIAL_GRID;
let actual_color = INITIAL_COLOR;
let actual_mode = INITIAL_MODE;

//  SELECTORS

const container = document.querySelector(".container");
const colorPicker = document.querySelector("#colorPicker");
const allButtons = document.querySelectorAll("button");
const elRange = document.querySelector(".rangeValue");
const elInput = document.querySelector("#range");

// EVENT LISTENERS

elInput.addEventListener("input", changeValue);
elInput.addEventListener("input", grid);
allButtons.forEach((buttton) => buttton.addEventListener("click", modeClick));
colorPicker.addEventListener("change", colorPic);

// FUNCTIONS

grid(actual_grid);

//This is the main function of the program, it creates the grid and its called outside one time so when the page is loaded a first grid is made
function grid(n) {
  clearGrid();
  n = actual_grid;
  const row = document.createElement("div");
  //The first for create the n numbers of squares that are going to be inside the row element adding to them the item class
  for (let i = 0; i < n; i++) {
    const item = document.createElement("div");
    item.classList.add("item");
    row.appendChild(item);
  }
  //The second for is used to create the n number of rows, after the first one we have a row with n squares, after this we have a n rows of n squares, or what is the same, the nxn grid
  for (let i = 0; i < n; i++) {
    const newRow = row.cloneNode(true);
    newRow.classList.add("row", "row-" + i);
    container.appendChild(newRow);
  }
  //Finally, for the new grid (whose elements are child of the container element of the HTML) we do a forEach and add the event of changing the background
  const allDivs = container.querySelectorAll("div");
  allDivs.forEach((allDivs) =>
    allDivs.addEventListener("mouseover", changeBackground)
  );
  return;
}

//This function change the mode of the sketch, cleanning it, changing the mode to eraser (white color) or to color
function modeClick(e) {
  allButtons.forEach((buttton) => buttton.classList.remove("picked"));
  e.target.classList.add("picked");
  if (e.target.value == "clean") {
    cleanAll();
    actual_color = "";
  } else if (e.target.value == "eraser") {
    actual_color = "white";
    actual_mode = "eraser";
  } else if (e.target.value == "color") {
    actual_color = INITIAL_COLOR;
    actual_mode = "color";
  }
}

//This function just take the color selected in the input and change the actual color variable, so the color in the sketch change as well
function colorPic(e) {
  if (actual_mode != "eraser") {
    actual_color = e.target.value;
  }
}

//This is the function used in the clean mode before, just reload the grid (and that remove the background color of every element)
function cleanAll() {
  grid(actual_grid);
}

//This function change the background color of the elements of the grid
function changeBackground(e) {
  e.target.style.backgroundColor = actual_color;
}

//This sets the text over the slider
elRange.innerHTML = INITIAL_GRID + " x " + INITIAL_GRID;

//This change the slider and the grid value (so its reload the grid nxn space)
function changeValue() {
  elRange.innerHTML = elInput.value + " x " + elInput.value;
  actual_grid = elInput.value;
  console.log(actual_grid);
}

//This is what remove all the grid element when the grid is reloaded
function clearGrid() {
  container.innerHTML = "";
}
